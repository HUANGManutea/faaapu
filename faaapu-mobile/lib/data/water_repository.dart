import 'dart:convert';

import 'package:faaapu/data/base_repository.dart';
import 'package:faaapu/model/plant-properties/water_property.dart';
import 'package:faaapu/supabase/db.dart';
import 'package:shared_preferences/shared_preferences.dart';

class WaterRepository extends BaseRepository {

  WaterRepository() : super(key: 'water');

  Future<List<WaterProperty>> getWaters() async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final cachedData = sharedPreferences.getString(key);

    // Check for internet connection
    final isConnected = await super.isConnected();

    // always fetch the data if we can
    if (isConnected) {
      return await _fetchWaters();
    }

    // no network
    // if data is cached, return it
    if (cachedData != null) {
      return (jsonDecode(cachedData) as List<dynamic>).map((e) => WaterProperty.fromJson(e)).toList();
    }

    // no network, no cache, return empty
    return [];
  }

  Future<void> _cacheWaters(List<WaterProperty> waters) async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final jsonEncodedData = jsonEncode(waters.map((waters) => waters.toJson()).toList());
    await sharedPreferences.setString(key, jsonEncodedData);
  }

  Future<List<WaterProperty>> _fetchWaters() async {
    final waterFilters = await supabase
        .from('water')
        .select<List<Map<String, dynamic>>>('id, name, description')
        .withConverter((waters) =>
        waters.map((data) => WaterProperty.fromJson(data)).toList());

    // Cache the fresh data
    await _cacheWaters(waterFilters);

    return waterFilters;
  }
}
