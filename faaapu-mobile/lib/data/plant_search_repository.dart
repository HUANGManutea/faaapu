import 'dart:convert';

import 'package:faaapu/data/base_repository.dart';
import 'package:faaapu/model/plant_search.dart';
import 'package:faaapu/supabase/Db.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

class PlantSearchRepository extends BaseRepository {

  PlantSearchRepository() : super(key: 'plant_searches');

  Future<List<PlantSearch>> getPlantSearches() async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final cachedData = sharedPreferences.getString(key);

    // Check for internet connection
    final isConnected = await super.isConnected();

    // always fetch the data if we can
    if (isConnected) {
      return await _fetchPlantSearchesFromSupabase();
    }

    // no network
    // if data is cached, return it
    if (cachedData != null) {
      return (jsonDecode(cachedData) as List<dynamic>).map((e) => PlantSearch.fromJson(e)).toList();
    }

    // no network, no cache, return empty
    return [];
  }

  Future<void> _cachePlants(List<PlantSearch> plants) async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final jsonEncodedData = jsonEncode(plants.map((plant) => plant.toJson()).toList());
    await sharedPreferences.setString(key, jsonEncodedData);
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
      supabase.storage.from('plants').getPublicUrl(plant.imageUrl);
      plant.imageUrl = imageUrl;
    }

    // Cache the fresh data
    await _cachePlants(plants);

    return plants;
  }
}
