import 'package:faaapu/data/zone_repository.dart';
import 'package:faaapu/model/zone.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ZoneCubit extends Cubit<List<Zone>> {
  final ZoneRepository _zoneRepository = ZoneRepository();
  ZoneCubit(): super([]);

  void fetchZonesWithPlants() async {
    var zones = await _zoneRepository.getZones();
    emit(zones);
  }
}