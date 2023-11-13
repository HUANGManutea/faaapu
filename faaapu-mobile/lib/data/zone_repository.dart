import 'dart:convert';
import 'dart:developer';

import 'package:faaapu/data/base_repository.dart';
import 'package:faaapu/model/zone.dart';
import 'package:faaapu/supabase/db.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ZoneRepository extends BaseRepository {

  ZoneRepository() : super(key: 'zone');

  Future<List<Zone>> getZones() async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final cachedData = sharedPreferences.getString(key);

    // Check for internet connection
    final isConnected = await super.isConnected();

    // always fetch the data if we can
    if (isConnected) {
      return await _fetchZones();
    }

    // no network
    // if data is cached, return it
    if (cachedData != null) {
      return (jsonDecode(cachedData) as List<dynamic>).map((e) => Zone.fromJson(e)).toList();
    }

    // no network, no cache, return empty
    return [];
  }

  Future<Zone?> insertZone(String name) async {
    var user = supabase.auth.currentUser;
    if (user == null) {
      log('cannot create zone, user is null');
      return null;
    } else {
      var result = await supabase.from('zone').insert({'name': name, 'profile_id': user.id}).select().single();
      return Zone.fromJson(result);
    }
  }

  Future<void> deleteZone(int id) async {
    await supabase.from('zone').delete().eq('id', id);
  }

  Future<void> deletePlantFromZone(int zoneId, int plantId) async {
    await supabase
        .from('zone_plant')
        .delete()
        .eq("zone_id", zoneId)
        .eq("plant_id", plantId);
  }

  Future<void> addPlantToZone(int zoneId, int plantId) async {
    await supabase
        .from('zone_plant')
        .insert({"zone_id": zoneId, "plant_id": plantId});
  }

  Future<void> _cacheZones(List<Zone> zones) async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final jsonEncodedData = jsonEncode(zones.map((zone) => zone.toJson()).toList());
    await sharedPreferences.setString(key, jsonEncodedData);
  }

  Future<List<Zone>> _fetchZones() async {
    var zones = await supabase.from('zone').select<List<Map<String, dynamic>>>(
        '''id, name, plants:plant!zone_plant(
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
    )''').withConverter((zones) => zones.map((zone) => Zone.fromJson(zone)).toList());

    // get the plant image
    for (var zone in zones) {
      for (var plant in zone.plants) {
        final imageUrl =
        supabase.storage.from('plants').getPublicUrl('images/${plant.imageUrl}');
        plant.imageUrl = imageUrl;
      }
    }

    // Cache the fresh data
    await _cacheZones(zones);

    return zones;
  }
}