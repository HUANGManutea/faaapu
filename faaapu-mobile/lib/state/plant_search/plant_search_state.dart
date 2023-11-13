import 'dart:convert';

import 'package:equatable/equatable.dart';
import 'package:faaapu/model/plant_search.dart';

import '../../model/plant.dart';
import '../../model/plant_search_filters.dart';
import '../state-status.dart';

class PlantSearchState extends Equatable {
  final List<PlantSearch> plantSearches;
  final PlantSearchFilters filters;
  final StateStatus status;
  final Plant? plant;

  const PlantSearchState(
      {this.plantSearches = const [],
      this.filters = const PlantSearchFilters(),
      this.status = StateStatus.initial,
      this.plant});

  Iterable<PlantSearch> get filteredPlantSearches =>
      filters.applyAll(plantSearches);

  PlantSearchState copyWith(
      {List<PlantSearch> Function()? plantSearches,
      PlantSearchFilters Function()? filters,
      StateStatus Function()? status,
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
      'status': status.toJsonString(), // Convert enum to string
      'plant': plant?.toJson(),
    };
  }

  factory PlantSearchState.fromJson(Map<String, dynamic> json) {
    return PlantSearchState(
      plantSearches: (json['plantSearches'] as List<dynamic>)
          .map((item) => PlantSearch.fromJson(item as Map<String, dynamic>))
          .toList(),
      filters: PlantSearchFilters.fromJson(json['filters'] as Map<String, dynamic>),
      status: StateStatusX.fromJsonString(json['status']),
      plant: Plant.fromJson(json['plant'] as Map<String, dynamic>),
    );
  }


  @override
  List<Object?> get props => [plantSearches, filters, status, plant];

  @override
  String toString() => 'PlantSearchState { ${jsonEncode(toJson())} }';
}
