import 'dart:convert';

import 'package:faaapu/data/base_repository.dart';
import 'package:faaapu/model/plant-properties/light_property.dart';
import 'package:faaapu/model/plant-properties/usage_property.dart';
import 'package:faaapu/model/plant-properties/water_property.dart';
import 'package:faaapu/model/plant_search.dart';
import 'package:faaapu/supabase/db.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

class UsageRepository extends BaseRepository {

  UsageRepository() : super(key: 'usage');

  Future<List<UsageProperty>> getUsages() async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final cachedData = sharedPreferences.getString(key);

    // Check for internet connection
    final isConnected = await super.isConnected();

    // always fetch the data if we can
    if (isConnected) {
      return await _fetchUsages();
    }

    // no network
    // if data is cached, return it
    if (cachedData != null) {
      return (jsonDecode(cachedData) as List<dynamic>).map((e) => UsageProperty.fromJson(e)).toList();
    }

    // no network, no cache, return empty
    return [];
  }

  Future<void> _cacheUsages(List<UsageProperty> usages) async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final jsonEncodedData = jsonEncode(usages.map((usages) => usages.toJson()).toList());
    await sharedPreferences.setString(key, jsonEncodedData);
  }

  Future<List<UsageProperty>> _fetchUsages() async {
    final usageFilters = await supabase
        .from('usage')
        .select<List<Map<String, dynamic>>>('id, name, description')
        .withConverter((usages) =>
        usages.map((data) => UsageProperty.fromJson(data)).toList());

    // Cache the fresh data
    await _cacheUsages(usageFilters);

    return usageFilters;
  }
}
