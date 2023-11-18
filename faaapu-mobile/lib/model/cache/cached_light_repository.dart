import 'package:faaapu/model/cache/base_cache_data.dart';

import '../plant-properties/light_property.dart';

class CachedLightRepository extends BaseCacheData {
  List<LightProperty> lights;

  CachedLightRepository({required this.lights, required super.expirationDate});


  factory CachedLightRepository.fromJson(Map<String, dynamic> json) {
    final List<LightProperty> lights = (json['lights'] as List<dynamic>)
        .map((item) => LightProperty.fromJson(item as Map<String, dynamic>))
        .toList();

    return CachedLightRepository(
        lights: lights, expirationDate: json['expirationDate']);
  }

  @override
  Map<String, dynamic> toJson() =>
      {"lights": lights.map((e) => e.toJson()).toList(), ...super.toJson()};

}