import 'dart:developer';

import 'package:faaapu/components/search/filter_section.dart';
import 'package:faaapu/components/search/multi_filter_section.dart';
import 'package:faaapu/model/plant_search.dart';
import 'package:faaapu/model/plant-properties/light_property.dart';
import 'package:faaapu/model/plant-properties/usage_property.dart';
import 'package:faaapu/model/plant-properties/water_property.dart';
import 'package:flutter/material.dart';

class CustomSearchBar extends StatefulWidget {
  final List<LightProperty> lightFilters;
  final List<WaterProperty> waterFilters;
  final List<UsageProperty> usageFilters;
  final List<PlantSearch> plants;
  final void Function(List<PlantSearch>) onPlantFilter;

  const CustomSearchBar(
      {super.key,
      required this.lightFilters,
      required this.waterFilters,
      required this.usageFilters,
      required this.plants,
      required this.onPlantFilter});

  @override
  CustomSearchBarState createState() => CustomSearchBarState();
}

class CustomSearchBarState extends State<CustomSearchBar> {
  LightProperty? selectedLight;
  WaterProperty? selectedWater;
  List<UsageProperty> selectedUsages = [];
  String? usageFilterCondition;
  String selectedFamily = '';
  String nameFilter = '';
  bool isFilterExpanded = false;

  @override
  void initState() {
    super.initState();
  }

  void filterPlantList() {
    var selectedUsageNames =
        selectedUsages.map((selectedUsage) => selectedUsage.name);
    List<PlantSearch> filteredPlants = widget.plants
        .where((plant) {
          // "!isFilterExpanded ||" means we do not use the filter when the advanced filters are not displayed
          bool lightCondition = !isFilterExpanded ||
              selectedLight == null ||
              plant.lights.contains(selectedLight!.name);
          bool waterCondition = !isFilterExpanded ||
              selectedWater == null ||
              plant.water == selectedWater!.name;
          bool usageCondition = !isFilterExpanded ||
              selectedUsages.isEmpty ||
              ((usageFilterCondition == null || usageFilterCondition == "OR")
                  ? selectedUsageNames
                      .any((usage) => plant.usages.contains(usage))
                  : selectedUsageNames
                      .every((usage) => plant.usages.contains(usage)));
          bool nameCondition = nameFilter == '' ||
              plant.name.contains(nameFilter) ||
              plant.scientificName.contains(nameFilter);
          return lightCondition &&
              waterCondition &&
              usageCondition &&
              nameCondition;
        })
        .toList();
    widget.onPlantFilter(filteredPlants);
  }

  @override
  Widget build(BuildContext context) {
    return Card(
        child: Padding(
            padding: const EdgeInsets.all(5),
            child: Column(
              children: [
                Row(
                  children: [
                    Expanded(
                        child: TextField(
                      onChanged: (value) {
                        setState(() {
                          nameFilter = value;
                        });
                      },
                      onSubmitted: (_) {
                        filterPlantList();
                      },
                      decoration: const InputDecoration(
                          hintText: 'Nom de plante',
                          prefixIcon: Icon(Icons.search),
                          border: InputBorder.none),
                    )),
                    IconButton(
                      icon: const Icon(Icons.filter_list),
                      onPressed: () {
                        setState(() {
                          isFilterExpanded = !isFilterExpanded;
                        });
                      },
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                if (isFilterExpanded) ...[
                  FilterSection(
                    title: 'Ensoleillement',
                    items: widget.lightFilters,
                    selectedItem: selectedLight,
                    onChanged: (value) {
                      setState(() {
                        selectedLight = value as LightProperty?;
                      });
                    },
                  ),
                  const SizedBox(height: 10),
                  FilterSection(
                    title: 'Besoin en eau',
                    items: widget.waterFilters,
                    selectedItem: selectedWater,
                    onChanged: (value) {
                      setState(() {
                        selectedWater = value as WaterProperty?;
                      });
                    },
                  ),
                  const SizedBox(height: 10),
                  // FilterSection(
                  //   title: 'Family',
                  //   items: const ['Family A', 'Family B', 'Family C'],
                  //   selectedItem: selectedFamily,
                  //   onChanged: (value) {
                  //     setState(() {
                  //       selectedFamily = value;
                  //     });
                  //   },
                  // ),
                  MultiFilterSection(
                    title: 'Utilisations',
                    items: widget.usageFilters,
                    selectedItems: selectedUsages,
                    onConditionChanged: (condition) {
                      setState(() {
                        usageFilterCondition = condition;
                      });
                    },
                    onValuesChanged: (values) {
                      var transformedValues = values
                          .map((value) => value as UsageProperty)
                          .toList();
                      setState(() {
                        selectedUsages = transformedValues;
                      });
                    },
                  ),
                  ElevatedButton(
                    onPressed: () {
                      filterPlantList();
                    },
                    child: const Text('Rechercher'),
                  ),
                ],
              ],
            )));
  }

// void filterPlants() {
//   // Apply filters for light, water, family, and usage here
//   filteredPlants = allPlants.where((plant) {
//     return (selectedLight || plant.light == selectedLight) &&
//         (selectedWater.isEmpty || plant.water == selectedWater) &&
//         (selectedFamily.isEmpty || plant.family == selectedFamily) &&
//         (selectedUsages.isEmpty ||
//             plant.usage.any((usage) => selectedUsages.contains(usage)));
//   }).toList();
//   setState(() {});
// }
}