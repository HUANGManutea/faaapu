import 'package:faaapu/data/water_repository.dart';
import 'package:faaapu/model/plant-properties/water_property.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class WaterCubit extends Cubit<List<WaterProperty>> {
  final WaterRepository _waterRepository;
  WaterCubit({required WaterRepository waterRepository}):_waterRepository = waterRepository, super([]);

  void fetchWaters() async {
    var waters = await _waterRepository.getWaters();
    emit(waters);
  }
}