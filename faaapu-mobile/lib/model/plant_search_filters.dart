import 'package:faaapu/model/plant-properties/light_property.dart';
import 'package:faaapu/model/plant-properties/usage_property.dart';
import 'package:faaapu/model/plant-properties/water_property.dart';
import 'package:faaapu/model/plant.dart';

class PlantFilters {
  final LightProperty? selectedLight;
  final WaterProperty? selectedWater;
  final List<UsageProperty> selectedUsages;
  final String? usageFilterCondition;
  final String? nameFilter;

  const PlantFilters({
    this.selectedLight,
    this.selectedWater,
    this.selectedUsages = const [],
    this.usageFilterCondition,
    this.nameFilter
});

  PlantFilters.fromForm(this.selectedLight, this.selectedWater, this.selectedUsages, this.usageFilterCondition, this.nameFilter);

  Map<String, dynamic> toJson() {
    return {
      'selectedLight': selectedLight?.toJson(), // Assuming LightProperty has a toJson method
      'selectedWater': selectedWater?.toJson(), // Assuming WaterProperty has a toJson method
      'selectedUsages': selectedUsages.map((usage) => usage.toJson()).toList(), // Assuming UsageProperty has a toJson method
      'usageFilterCondition': usageFilterCondition,
      'nameFilter': nameFilter,
    };
  }

  factory PlantFilters.fromJson(Map<String, dynamic> json) {
    return PlantFilters(
      selectedLight: json['selectedLight'] != null
          ? LightProperty.fromJson(json['selectedLight'] as Map<String, dynamic>)
          : null,
      selectedWater: json['selectedWater'] != null
          ? WaterProperty.fromJson(json['selectedWater'] as Map<String, dynamic>)
          : null,
      selectedUsages: (json['selectedUsages'] as List<dynamic>)
          .map((item) => UsageProperty.fromJson(item as Map<String, dynamic>))
          .toList(),
      usageFilterCondition: json['usageFilterCondition'] as String?,
      nameFilter: json['nameFilter'] as String?,
    );
  }
}

extension PlantFiltersX on PlantFilters {
  bool apply(Plant plant) {
    var selectedUsageNames = selectedUsages.isEmpty ? null :
    selectedUsages.map((selectedUsage) => selectedUsage.name);

    // "!isFilterExpanded ||" means we do not use the filter when the advanced filters are not displayed
    bool lightCondition = selectedLight == null ||
        plant.lights.contains(selectedLight!.name);
    bool waterCondition = selectedWater == null ||
        plant.water == selectedWater!.name;
    bool usageCondition = selectedUsages.isEmpty || selectedUsageNames == null ||
        ((usageFilterCondition == null || usageFilterCondition == "OU")
            ? selectedUsageNames
            .any((usage) => plant.usages.contains(usage))
            : selectedUsageNames
            .every((usage) => plant.usages.contains(usage)));
    bool nameCondition = nameFilter == null || nameFilter == '' ||
        plant.name.contains(nameFilter!) ||
        plant.scientificName.contains(nameFilter!);
    return lightCondition &&
        waterCondition &&
        usageCondition &&
        nameCondition;
  }

  Iterable<Plant> applyAll(Iterable<Plant> plants) {
    return plants.where(apply);
  }
}