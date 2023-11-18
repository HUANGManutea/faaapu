import 'package:faaapu/model/plant-properties/water_property.dart';
import '../zone.dart';
import 'base_cache_data.dart';

class CachedZoneRepository extends BaseCacheData {
  List<Zone> zones;

  CachedZoneRepository({required this.zones, required super.expirationDate});


  factory CachedZoneRepository.fromJson(Map<String, dynamic> json) {
    final List<Zone> zones = (json['zones'] as List<dynamic>)
        .map((item) => Zone.fromJson(item as Map<String, dynamic>))
        .toList();

    return CachedZoneRepository(
        zones: zones, expirationDate: json['expirationDate']);
  }

  @override
  Map<String, dynamic> toJson() =>
      {"zones": zones.map((e) => e.toJson()).toList(), ...super.toJson()};

}