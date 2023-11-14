import 'dart:convert';

import 'package:equatable/equatable.dart';

import '../../model/plant.dart';
import '../../model/plant_search_filters.dart';
import '../state_status.dart';

class PlantState extends Equatable {
  final List<Plant> plants;
  final PlantFilters filters;
  final StateStatus status;
  final Plant? plant;

  const PlantState(
      {this.plants = const [],
      this.filters = const PlantFilters(),
      this.status = StateStatus.initial,
      this.plant});

  Iterable<Plant> get filteredPlants =>
      filters.applyAll(plants);

  PlantState copyWith(
      {List<Plant> Function()? plants,
      PlantFilters Function()? filters,
      StateStatus Function()? status,
      Plant? Function()? plant}) {
    return PlantState(
        plants:
            plants != null ? plants() : this.plants,
        filters: filters != null ? filters() : this.filters,
        status: status != null ? status() : this.status,
        plant: plant != null ? plant() : this.plant);
  }

  Map<String, dynamic> toJson() {
    return {
      'plants': plants.map((plant) => plant.toJson()).toList(),
      'filters': filters.toJson(),
      'status': status.toJsonString(), // Convert enum to string
      'plant': plant?.toJson(),
    };
  }

  factory PlantState.fromJson(Map<String, dynamic> json) {
    return PlantState(
      plants: (json['plants'] as List<dynamic>)
          .map((item) => Plant.fromJson(item as Map<String, dynamic>))
          .toList(),
      filters: PlantFilters.fromJson(json['filters'] as Map<String, dynamic>),
      status: StateStatusX.fromJsonString(json['status']),
      plant: Plant.fromJson(json['plant'] as Map<String, dynamic>),
    );
  }


  @override
  List<Object?> get props => [plants, filters, status, plant];

  @override
  String toString() => 'PlantState { ${jsonEncode(toJson())} }';
}
