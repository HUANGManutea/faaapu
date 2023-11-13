import 'dart:convert';

import 'package:equatable/equatable.dart';
import 'package:faaapu/model/plant_search.dart';

import '../../model/plant.dart';
import '../../model/plant_search_filters.dart';

enum PlantSearchStatus { initial, loading, success, failure }

class PlantSearchState extends Equatable {
  final List<PlantSearch> plantSearches;
  final PlantSearchFilters filters;
  final PlantSearchStatus status;
  final Plant? plant;

  const PlantSearchState(
      {this.plantSearches = const [],
      this.filters = const PlantSearchFilters(),
      this.status = PlantSearchStatus.initial,
      this.plant});

  Iterable<PlantSearch> get filteredPlantSearches =>
      filters.applyAll(plantSearches);

  PlantSearchState copyWith(
      {List<PlantSearch> Function()? plantSearches,
      PlantSearchFilters Function()? filters,
      PlantSearchStatus Function()? status,
      Plant? Function()? plant}) {
    return PlantSearchState(
        plantSearches:
            plantSearches != null ? plantSearches() : this.plantSearches,
        filters: filters != null ? filters() : this.filters,
        status: status != null ? status() : this.status,
        plant: plant != null ? plant() : this.plant);
  }

  Map<String, dynamic> toJson() {
    return {
      'plantSearches': plantSearches.map((plantSearch) => plantSearch.toJson()).toList(),
      'filters': filters.toJson(),
      'status': status.toString(), // Convert enum to string
      'plant': plant?.toJson(), // Assuming Plant has a toJson method
    };
  }

  factory PlantSearchState.fromJson(Map<String, dynamic> json) {
    return PlantSearchState(
      plantSearches: (json['plantSearches'] as List<dynamic>)
          .map((item) => PlantSearch.fromJson(item as Map<String, dynamic>))
          .toList(),
      filters: PlantSearchFilters.fromJson(json['filters'] as Map<String, dynamic>),
      status: _parseStatus(json['status']),
      plant: Plant.fromJson(json['plant'] as Map<String, dynamic>),
    );
  }

  static PlantSearchStatus _parseStatus(String status) {
    switch (status) {
      case 'PlantSearchStatus.initial':
        return PlantSearchStatus.initial;
      case 'PlantSearchStatus.loading':
        return PlantSearchStatus.loading;
      case 'PlantSearchStatus.success':
        return PlantSearchStatus.success;
      case 'PlantSearchStatus.failure':
        return PlantSearchStatus.failure;
      default:
        return PlantSearchStatus.initial; // Default value if status is unknown
    }
  }

  @override
  List<Object?> get props => [plantSearches, filters, status, plant];

  @override
  String toString() => 'PlantSearchState { ${jsonEncode(toJson())} }';
}
