import 'package:bloc/bloc.dart';
import 'package:faaapu/data/plant_repository.dart';
import 'package:faaapu/state/plant_search/plant_event.dart';
import 'package:faaapu/state/plant_search/plant_state.dart';

import '../state_status.dart';

class PlantBloc extends Bloc<PlantEvent, PlantState> {
  final PlantRepository _plantRepository;

  PlantBloc({required PlantRepository plantRepository}): _plantRepository = plantRepository, super(const PlantState()) {
    on<PlantsLoaded>(_onPlantsLoaded);
    on<PlantFilterChanged>(_onPlantFilterChanged);
    on<PlantChanged>(_onPlantChanged);
  }

  Future<void> _onPlantsLoaded(PlantsLoaded event, Emitter<PlantState> emit) async {
    emit(state.copyWith(status: () => StateStatus.loading));
    var plants = await _plantRepository.getPlants();
    emit(state.copyWith(status: () => StateStatus.success, plants: () => plants));
  }

  void _onPlantFilterChanged(PlantFilterChanged event, Emitter<PlantState> emit) {
    emit(state.copyWith(filters: () => event.filter));
  }

  Future<void> _onPlantChanged(PlantChanged event, Emitter<PlantState> emit) async {
    emit(state.copyWith(status: () => StateStatus.loading));
    var plant = await _plantRepository.getPlant(event.plantId);
    emit(state.copyWith(status: () => StateStatus.success, plant: () => plant));
  }
}