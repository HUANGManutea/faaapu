import 'package:faaapu/data/light_repository.dart';
import 'package:faaapu/model/plant-properties/light_property.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class LightCubit extends Cubit<List<LightProperty>> {
  final LightRepository _lightRepository = LightRepository();
  LightCubit(): super([]);

  void fetchLights() async {
    var lights = await _lightRepository.getLights();
    emit(lights);
  }
}