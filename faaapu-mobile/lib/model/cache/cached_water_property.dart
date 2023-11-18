import 'package:faaapu/model/plant-properties/water_property.dart';
import 'base_cache_data.dart';

class CachedWaterRepository extends BaseCacheData {
  List<WaterProperty> waters;

  CachedWaterRepository({required this.waters, required super.expirationDate});


  factory CachedWaterRepository.fromJson(Map<String, dynamic> json) {
    final List<WaterProperty> waters = (json['waters'] as List<dynamic>)
        .map((item) => WaterProperty.fromJson(item as Map<String, dynamic>))
        .toList();

    return CachedWaterRepository(
        waters: waters, expirationDate: json['expirationDate']);
  }

  @override
  Map<String, dynamic> toJson() =>
      {"waters": waters.map((e) => e.toJson()).toList(), ...super.toJson()};

}