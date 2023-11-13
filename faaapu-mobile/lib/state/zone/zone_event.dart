import 'package:equatable/equatable.dart';

sealed class ZoneEvent extends Equatable {
  const ZoneEvent();
  @override
  List<Object?> get props => [];
}


class ZonesLoaded extends ZoneEvent {}

class ZoneDeleted extends ZoneEvent{
  final int zoneId;

  const ZoneDeleted(this.zoneId);

  @override
  List<Object> get props => [zoneId];
}

class ZoneAdded extends ZoneEvent{
  final String name;

  const ZoneAdded(this.name);

  @override
  List<Object> get props => [name];
}

class RemovePlantFromZone extends ZoneEvent{
  final int zoneId;
  final int plantId;

  const RemovePlantFromZone(this.zoneId, this.plantId);

  @override
  List<Object> get props => [zoneId, plantId];
}

class AddPlantToZone extends ZoneEvent{
  final int zoneId;
  final int plantId;

  const AddPlantToZone(this.zoneId, this.plantId);

  @override
  List<Object> get props => [zoneId, plantId];
}