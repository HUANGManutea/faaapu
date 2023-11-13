import 'package:bloc/bloc.dart';
import 'package:faaapu/data/plant_repository.dart';
import 'package:faaapu/state/plant_search/plant_search_event.dart';
import 'package:faaapu/state/plant_search/plant_search_state.dart';

import '../state_status.dart';

class PlantSearchBloc extends Bloc<PlantSearchEvent, PlantSearchState> {
  final PlantRepository _plantSearchRepository;

  PlantSearchBloc({required PlantRepository plantSearchRepository}): _plantSearchRepository = plantSearchRepository, super(const PlantSearchState()) {
    on<PlantSearchLoaded>(_onPlantSearchLoaded);
    on<PlantSearchFilterChanged>(_onPlantSearchFilterChanged);
    on<PlantChanged>(_onPlantChanged);
  }

  Future<void> _onPlantSearchLoaded(PlantSearchLoaded event, Emitter<PlantSearchState> emit) async {
    emit(state.copyWith(status: () => StateStatus.loading));
    var plantSearches = await _plantSearchRepository.getPlantSearches();
    emit(state.copyWith(status: () => StateStatus.success, plantSearches: () => plantSearches));
  }

  void _onPlantSearchFilterChanged(PlantSearchFilterChanged event, Emitter<PlantSearchState> emit) {
    emit(state.copyWith(filters: () => event.filter));
  }

  Future<void> _onPlantChanged(PlantChanged event, Emitter<PlantSearchState> emit) async {
    emit(state.copyWith(status: () => StateStatus.loading));
    var plant = await _plantSearchRepository.getPlant(event.plantId);
    emit(state.copyWith(status: () => StateStatus.success, plant: () => plant));
  }
}