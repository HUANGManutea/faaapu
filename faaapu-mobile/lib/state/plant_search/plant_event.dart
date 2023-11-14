import 'package:equatable/equatable.dart';
import 'package:faaapu/model/plant_search_filters.dart';

sealed class PlantEvent extends Equatable {
  const PlantEvent();
  @override
  List<Object?> get props => [];
}

class PlantsLoaded extends PlantEvent {}

class PlantFilterChanged extends PlantEvent {
  final PlantFilters filter;

  const PlantFilterChanged(this.filter);

  @override
  List<Object> get props => [filter];
}

class PlantChanged extends PlantEvent {
  final int plantId;
  const PlantChanged(this.plantId);

  @override
  List<Object> get props => [plantId];
}