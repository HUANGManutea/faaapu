import 'package:equatable/equatable.dart';
import 'package:faaapu/model/plant_search_filters.dart';

import '../../model/plant.dart';

sealed class PlantSearchEvent extends Equatable {
  const PlantSearchEvent();
  @override
  List<Object?> get props => [];
}

class PlantSearchLoaded extends PlantSearchEvent {}

class PlantSearchFilterChanged extends PlantSearchEvent {
  final PlantSearchFilters filter;

  const PlantSearchFilterChanged(this.filter);

  @override
  List<Object> get props => [filter];
}

class PlantChanged extends PlantSearchEvent {
  final int plantId;
  const PlantChanged(this.plantId);

  @override
  List<Object> get props => [plantId];
}