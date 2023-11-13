

import 'dart:convert';

import 'package:equatable/equatable.dart';
import 'package:faaapu/state/state_status.dart';

import '../../model/zone.dart';

class ZoneState extends Equatable {
  final List<Zone> zones;
  final StateStatus status;

  const ZoneState({this.zones = const [], this.status = StateStatus.initial});


  ZoneState copyWith(
      {List<Zone> Function()? zones,
  StateStatus Function()? status,}) {
    return ZoneState(
        zones:
        zones != null ? zones() : this.zones,
        status: status != null ? status() : this.status,);
  }

  @override
  List<Object?> get props => [zones, status];


  Map<String, dynamic> toJson() {
    return {
      'zones': zones.map((zone) => zone.toJson()).toList(),
      'status': status.toJsonString(),
    };
  }

  factory ZoneState.fromJson(Map<String, dynamic> json) {
    return ZoneState(
      zones: (json['zones'] as List<dynamic>)
          .map((item) => Zone.fromJson(item as Map<String, dynamic>))
          .toList(),
      status: StateStatusX.fromJsonString(json['status']),
    );
  }

  @override
  String toString() => 'ZoneState { ${jsonEncode(toJson())} }';
}