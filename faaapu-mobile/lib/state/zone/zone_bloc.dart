import 'package:bloc/bloc.dart';
import 'package:faaapu/data/zone_repository.dart';
import 'package:faaapu/state/zone/zone_event.dart';
import 'package:faaapu/state/zone/zone_state.dart';

import '../state-status.dart';

class ZoneBloc extends Bloc<ZoneEvent, ZoneState> {
  final ZoneRepository _zoneRepository;

  ZoneBloc({required ZoneRepository zoneRepository})
      : _zoneRepository = zoneRepository,
        super(const ZoneState()) {
    on<ZonesLoaded>(_onZonesLoaded);
    on<ZoneAdded>(_onZoneAdded);
    on<ZoneDeleted>(_onZoneDeleted);
    on<RemovePlantFromZone>(_onRemovePlantFromZone);
    on<AddPlantToZone>(_onAddPlantToZone);
  }

  Future<void> _onZonesLoaded(
      ZonesLoaded event, Emitter<ZoneState> emit) async {
    emit(state.copyWith(status: () => StateStatus.loading));
    var zones = await _zoneRepository.getZones();
    emit(state.copyWith(status: () => StateStatus.success, zones: () => zones));
  }

  Future<void> _onZoneAdded(ZoneAdded event, Emitter<ZoneState> emit) async {
    await _zoneRepository.insertZone(event.name);
    add(ZonesLoaded());
  }

  Future<void> _onZoneDeleted(
      ZoneDeleted event, Emitter<ZoneState> emit) async {
    await _zoneRepository.deleteZone(event.zoneId);
    add(ZonesLoaded());
  }

  Future<void> _onRemovePlantFromZone(
      RemovePlantFromZone event, Emitter<ZoneState> emit) async {
    await _zoneRepository.deletePlantFromZone(event.zoneId, event.plantId);
    add(ZonesLoaded());
  }

  Future<void> _onAddPlantToZone(
      AddPlantToZone event, Emitter<ZoneState> emit) async {
    await _zoneRepository.addPlantToZone(event.zoneId, event.plantId);
    add(ZonesLoaded());
  }
}
