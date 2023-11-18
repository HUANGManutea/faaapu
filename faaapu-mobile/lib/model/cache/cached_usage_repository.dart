import 'package:faaapu/model/cache/base_cache_data.dart';
import 'package:faaapu/model/plant-properties/usage_property.dart';

class CachedUsageRepository extends BaseCacheData {
  List<UsageProperty> usages;

  CachedUsageRepository({required this.usages, required super.expirationDate});


  factory CachedUsageRepository.fromJson(Map<String, dynamic> json) {
    final List<UsageProperty> usages = (json['usages'] as List<dynamic>)
        .map((item) => UsageProperty.fromJson(item as Map<String, dynamic>))
        .toList();

    return CachedUsageRepository(
        usages: usages, expirationDate: json['expirationDate']);
  }

  @override
  Map<String, dynamic> toJson() =>
      {"usages": usages.map((e) => e.toJson()).toList(), ...super.toJson()};

}