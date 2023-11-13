import 'package:equatable/equatable.dart';
import 'package:faaapu/model/plant_search.dart';

import '../../model/plant_search_filters.dart';

enum PlantSearchStatus { initial, loading, success, failure }

class PlantSearchState extends Equatable {
  final List<PlantSearch> plantSearches;
  final PlantSearchFilters filters;
  final PlantSearchStatus status;

  const PlantSearchState(
      {this.plantSearches = const [],
      this.filters = const PlantSearchFilters(),
      this.status = PlantSearchStatus.initial});

  Iterable<PlantSearch> get filteredPlantSearches =>
      filters.applyAll(plantSearches);

  PlantSearchState copyWith(
      {List<PlantSearch> Function()? plantSearches,
      PlantSearchFilters Function()? filters,
      PlantSearchStatus Function()? status}) {
    return PlantSearchState(
        plantSearches:
            plantSearches != null ? plantSearches() : this.plantSearches,
        filters: filters != null ? filters() : this.filters,
        status: status != null ? status() : this.status);
  }

  @override
  List<Object?> get props => [plantSearches, filters, status];
}
