import 'dart:convert';
import 'package:faaapu/data/base_repository.dart';
import 'package:faaapu/model/cache/cached_plant_repository.dart';
import 'package:faaapu/supabase/db.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../model/plant.dart';

class PlantRepository extends BaseRepository {
  late CachedPlantRepository cachedPlantRepository;

  PlantRepository({required super.nbDaysCache}) : super(key: 'plant') {
    _getCachedData();
  }

  Future<void> _getCachedData() async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final cachedData = sharedPreferences.getString(key);
    if (cachedData != null) {
      cachedPlantRepository = CachedPlantRepository.fromJson(
          jsonDecode(cachedData) as Map<String, dynamic>);
    } else {
      // Handle the case when there is no cached data.
      cachedPlantRepository = CachedPlantRepository(
        plants: [],
        expirationDate:  DateTime.now()
      );
    }
  }

  Future<void> _cacheRepository(
      CachedPlantRepository cachedPlantRepository) async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final jsonEncodedData = cachedPlantRepository.toJson();
    await sharedPreferences.setString(key, jsonEncode(jsonEncodedData));
  }

  Future<List<Plant>> getPlants() async {
    // Check for internet connection
    final isConnected = await super.isConnected();

    // always fetch the data if we can
    if (isConnected) {
      List<Plant> plants = await _fetchPlants();
      // cache it
      await _cacheRepository(CachedPlantRepository(plants: plants,
          expirationDate:  DateTime.now().add(Duration(days: nbDaysCache))));
      return plants;
    }

    // no network
    // return cache
    return cachedPlantRepository.plants;
  }

  Future<Plant?> getPlant(int id) async {
    // Check for internet connection
    final isConnected = await super.isConnected();

    // always fetch the data if we can
    if (isConnected) {
      return await _fetchPlant(id);
    }

    // no network
    // return cache
    return cachedPlantRepository.plants
        .where((plant) => plant.id == id)
        .firstOrNull;
  }

  Future<void> consolidatePlant(Plant plant) async {
    final imageUrl = supabase.storage
        .from('plants')
        .getPublicUrl('images/${plant.imageUrl}');
    plant.imageUrl = imageUrl;
    if (plant.contentUrl != null) {
      final contentRawFile = await supabase.storage
          .from('plants')
          .download('contents/${plant.contentUrl}');
      final String markdownContent = utf8.decode(contentRawFile);
      plant.content = markdownContent;
    }
  }

  Future<Plant> _fetchPlant(int id) async {
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

    await consolidatePlant(plant);

    return plant;
  }

  Future<List<Plant>> _fetchPlants() async {
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
        ''').withConverter((plantsResults) => plantsResults.map((data) => Plant.fromJson(data)).toList());

    for (var plant in plants) {
      await consolidatePlant(plant);
    }
    return plants;
  }
}
