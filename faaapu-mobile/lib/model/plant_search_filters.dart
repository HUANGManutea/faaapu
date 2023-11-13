import 'package:faaapu/model/plant-properties/light_property.dart';
import 'package:faaapu/model/plant-properties/usage_property.dart';
import 'package:faaapu/model/plant-properties/water_property.dart';
import 'package:faaapu/model/plant_search.dart';

class PlantSearchFilters {
  final LightProperty? selectedLight;
  final WaterProperty? selectedWater;
  final List<UsageProperty> selectedUsages;
  final String? usageFilterCondition;
  final String? nameFilter;

  const PlantSearchFilters({
    this.selectedLight,
    this.selectedWater,
    this.selectedUsages = const [],
    this.usageFilterCondition,
    this.nameFilter
});

  PlantSearchFilters.fromForm(this.selectedLight, this.selectedWater, this.selectedUsages, this.usageFilterCondition, this.nameFilter);
}

extension PlantSearchFiltersX on PlantSearchFilters {
  bool apply(PlantSearch plant) {
    var selectedUsageNames = selectedUsages.isEmpty ? null :
    selectedUsages.map((selectedUsage) => selectedUsage.name);

    // "!isFilterExpanded ||" means we do not use the filter when the advanced filters are not displayed
    bool lightCondition = selectedLight == null ||
        plant.lights.contains(selectedLight!.name);
    bool waterCondition = selectedWater == null ||
        plant.water == selectedWater!.name;
    bool usageCondition = selectedUsages.isEmpty || selectedUsageNames == null ||
        ((usageFilterCondition == null || usageFilterCondition == "OR")
            ? selectedUsageNames
            .any((usage) => plant.usages.contains(usage))
            : selectedUsageNames
            .every((usage) => plant.usages.contains(usage)));
    bool nameCondition = nameFilter == '' ||
        plant.name.contains(nameFilter!) ||
        plant.scientificName.contains(nameFilter!);
    return lightCondition &&
        waterCondition &&
        usageCondition &&
        nameCondition;
  }

  Iterable<PlantSearch> applyAll(Iterable<PlantSearch> plantSearches) {
    return plantSearches.where(apply);
  }
}