import 'dart:convert';
import 'dart:developer';

import 'package:faaapu/data/base_repository.dart';
import 'package:faaapu/model/cache/cached-plant-repository.dart';
import 'package:faaapu/model/plant_search.dart';
import 'package:faaapu/supabase/db.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../model/plant.dart';

class PlantRepository extends BaseRepository {
  late CachedPlantRepository cachedPlantRepository;

  PlantRepository() : super(key: 'plant') {
    _getCachedData();
  }

  Future<void> _getCachedData() async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final cachedData = sharedPreferences.getString(key);
    if (cachedData != null) {
      log('cachedData, $cachedData');
      cachedPlantRepository =
          CachedPlantRepository.fromJson(jsonDecode(cachedData) as Map<String, dynamic>);
    } else {
      // Handle the case when there is no cached data.
      cachedPlantRepository = const CachedPlantRepository(
        plantSearches: [], // Provide appropriate default values
        plants: {}, // Provide appropriate default values
      );
    }
  }

  Future<void> _cacheRepository(CachedPlantRepository cachedPlantRepository) async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final jsonEncodedData = cachedPlantRepository.toJson();
    await sharedPreferences.setString(key, jsonEncode(jsonEncodedData));
  }

  Future<List<PlantSearch>> getPlantSearches() async {
    // Check for internet connection
    final isConnected = await super.isConnected();

    // always fetch the data if we can
    if (isConnected) {
      List<PlantSearch> plantSearches = await _fetchPlantSearchesFromSupabase();
      // cache it
      await _cacheRepository(CachedPlantRepository(plantSearches: plantSearches, plants: cachedPlantRepository.plants));
      return plantSearches;
    }

    // no network
    // return cache
    return cachedPlantRepository.plantSearches;
  }

  Future<Plant?> getPlant(int id) async {
    // Check for internet connection
    final isConnected = await super.isConnected();

    // always fetch the data if we can
    if (isConnected) {
      Plant plant = await _fetchPlantFromSupabase(id);
      Map<int, Plant> newPlants = {...cachedPlantRepository.plants, plant.id: plant};
      // cache it
      await _cacheRepository(CachedPlantRepository(plantSearches: cachedPlantRepository.plantSearches, plants: newPlants));
      return plant;
    }

    // no network
    // return cache
    if (cachedPlantRepository.plants.containsKey(id)) {
      return cachedPlantRepository.plants[id];
    } else {
      return null;
    }
  }

  Future<Plant> _fetchPlantFromSupabase(int id) async {
    var plant = await supabase
        .from('plant')
        .select<Map<String, dynamic>>('''
        id,
        name,
        image_url,
        low_height,
        high_height,
        low_width,
        high_width,
        scientific_name,
        family(name),
        growth(name),
        foliage(name),
        shape(name),
        water(name),
        lifespan(name),
        difficulty(name),
        type(name),
        usage(name),
        light(name),
        bloomSeasons:season!plant_bloom_season(start_month,end_month),
        harvestSeasons:season!plant_harvest_season(start_month,end_month),
        pruneSeasons:season!plant_prune_season(start_month,end_month),
        plantingMethods:planting_method!plant_planting_method(name),
        plantingSeasons:season!plant_planting_season(start_month,end_month),
        soilHumidities:soil_humidity!plant_soil_humidity(name),
        soilPhs:soil_ph!plant_soil_ph(name),
        soilTypes:soil_type!plant_soil_type(name),
        content_url
        ''')
        .eq('id', id)
        .single()
        .withConverter((plantResult) => Plant.fromJson(plantResult));

    final imageUrl =
    supabase.storage.from('plants').getPublicUrl('images/${plant.imageUrl}');
    plant.imageUrl = imageUrl;


    if (plant.contentUrl != null) {
      final contentRawFile = await supabase.storage.from('plants').download('contents/${plant.contentUrl}');
      final String markdownContent = String.fromCharCodes(contentRawFile);
      plant.content = markdownContent;
    }

    return plant;
  }

  Future<List<PlantSearch>> _fetchPlantSearchesFromSupabase() async {
    var plants =
    await supabase.from('plant').select<List<Map<String, dynamic>>>('''
        id,
        name,
        image_url,
        low_height,
        high_height,
        low_width,
        high_width,
        scientific_name,
        family(name),
        growth(name),
        foliage(name),
        shape(name),
        water(name),
        lifespan(name),
        difficulty(name),
        type(name),
        usage(name),
        light(name)
        ''').withConverter((plantSearchResults) => plantSearchResults.map((data) => PlantSearch.fromJson(data)).toList());

    // get the plant image
    for (var plant in plants) {
      final imageUrl =
      supabase.storage.from('plants').getPublicUrl('images/${plant.imageUrl}');
      plant.imageUrl = imageUrl;
    }

    return plants;
  }
}
