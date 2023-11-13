import 'package:bloc/bloc.dart';
import 'package:faaapu/data/plant_repository.dart';
import 'package:faaapu/state/plant_search/plant_search_event.dart';
import 'package:faaapu/state/plant_search/plant_search_state.dart';

class PlantSearchBloc extends Bloc<PlantSearchEvent, PlantSearchState> {
  final PlantRepository plantSearchRepository;

  PlantSearchBloc({required this.plantSearchRepository}): super(const PlantSearchState()) {
    on<PlantSearchLoaded>(_onPlantSearchLoaded);
    on<PlantSearchFilterChanged>(_onPlantSearchFilterChanged);
    on<PlantChanged>(_onPlantChanged);
  }

  Future<void> _onPlantSearchLoaded(PlantSearchLoaded event, Emitter<PlantSearchState> emit) async {
    emit(state.copyWith(status: () => PlantSearchStatus.loading));
    var plantSearches = await plantSearchRepository.getPlantSearches();
    emit(state.copyWith(status: () => PlantSearchStatus.success, plantSearches: () => plantSearches));
  }

  void _onPlantSearchFilterChanged(PlantSearchFilterChanged event, Emitter<PlantSearchState> emit) {
    emit(state.copyWith(filters: () => event.filter));
  }

  Future<void> _onPlantChanged(PlantChanged event, Emitter<PlantSearchState> emit) async {
    emit(state.copyWith(status: () => PlantSearchStatus.loading));
    var plant = await plantSearchRepository.getPlant(event.plantId);
    emit(state.copyWith(status: () => PlantSearchStatus.success, plant: () => plant));
  }
}