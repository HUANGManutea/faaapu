import 'dart:convert';

import 'package:faaapu/data/base_repository.dart';
import 'package:faaapu/model/plant-properties/light_property.dart';
import 'package:faaapu/supabase/db.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LightRepository extends BaseRepository {

  LightRepository({required super.nbDaysCache}) : super(key: 'light');

  Future<List<LightProperty>> getLights() async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final cachedData = sharedPreferences.getString(key);

    // Check for internet connection
    final isConnected = await super.isConnected();

    // always fetch the data if we can
    if (isConnected) {
      return await _fetchLights();
    }

    // no network
    // if data is cached, return it
    if (cachedData != null) {
      return (jsonDecode(cachedData) as List<dynamic>).map((e) => LightProperty.fromJson(e)).toList();
    }

    // no network, no cache, return empty
    return [];
  }

  Future<void> _cacheLights(List<LightProperty> lights) async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final jsonEncodedData = jsonEncode(lights.map((light) => light.toJson()).toList());
    await sharedPreferences.setString(key, jsonEncodedData);
  }

  Future<List<LightProperty>> _fetchLights() async {
    final lightFilters = await supabase
        .from('light')
        .select<List<Map<String, dynamic>>>('id, name, description')
        .withConverter((lights) =>
        lights.map((data) => LightProperty.fromJson(data)).toList());

    // Cache the fresh data
    await _cacheLights(lightFilters);

    return lightFilters;
  }
}
