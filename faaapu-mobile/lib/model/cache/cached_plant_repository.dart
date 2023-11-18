import 'package:faaapu/model/cache/base_cache_data.dart';

import '../plant.dart';

class CachedPlantRepository extends BaseCacheData {
  final List<Plant> plants;

  const CachedPlantRepository(
      {required this.plants, required super.expirationDate});

  factory CachedPlantRepository.fromJson(Map<String, dynamic> json) {
    final List<Plant> plants = (json['plants'] as List<dynamic>)
        .map((item) => Plant.fromJson(item as Map<String, dynamic>))
        .toList();

    return CachedPlantRepository(
        plants: plants, expirationDate: json['expirationDate']);
  }

  @override
  Map<String, dynamic> toJson() =>
      {"plants": plants.map((e) => e.toJson()).toList(), ...super.toJson()};
}
