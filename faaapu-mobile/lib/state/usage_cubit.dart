import 'package:faaapu/data/usage_repository.dart';
import 'package:faaapu/model/plant-properties/usage_property.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class UsageCubit extends Cubit<List<UsageProperty>> {
  final UsageRepository _usageRepository = UsageRepository();
  UsageCubit(): super([]);

  void fetchUsages() async {
    var usages = await _usageRepository.getUsages();
    emit(usages);
  }
}