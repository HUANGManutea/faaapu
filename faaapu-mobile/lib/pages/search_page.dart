import 'dart:developer';

import 'package:auto_route/auto_route.dart';
import 'package:faaapu/components/search/custom_search_bar.dart';
import 'package:faaapu/components/search/search_plant_card.dart';
import 'package:faaapu/data/light_repository.dart';
import 'package:faaapu/data/plant_search_repository.dart';
import 'package:faaapu/data/usage_repository.dart';
import 'package:faaapu/data/water_repository.dart';
import 'package:faaapu/model/plant-properties/light_property.dart';
import 'package:faaapu/model/plant-properties/usage_property.dart';
import 'package:faaapu/model/plant-properties/water_property.dart';
import 'package:faaapu/model/plant_search.dart';
import 'package:faaapu/router/app_router.gr.dart';
import 'package:flutter/material.dart';

@RoutePage()
class SearchPage extends StatefulWidget {
  final PlantSearchRepository plantRepository = PlantSearchRepository();
  final LightRepository lightRepository = LightRepository();
  final WaterRepository waterRepository = WaterRepository();
  final UsageRepository usageRepository = UsageRepository();

  SearchPage({super.key});

  @override
  SearchPageState createState() => SearchPageState();
}

class SearchPageState extends State<SearchPage> {
  List<LightProperty> lightProperties = [];
  List<WaterProperty> waterProperties = [];
  List<UsageProperty> usageProperties = [];
  List<PlantSearch> plantSearches = [];
  List<PlantSearch> filteredPlants = [];

  @override
  void initState() {
    super.initState();
    getPlants();
    getFilters();
  }

  void getPlants() async {
    List<PlantSearch> plants = await widget.plantRepository.getPlantSearches();
    setState(() {
      plantSearches = plants;
      filteredPlants = plants;
    });
  }

  void getFilters() async {
    final lightFilters = await widget.lightRepository.getLights();
    final waterFilters = await widget.waterRepository.getWaters();
    final usageFilters = await widget.usageRepository.getUsages();

    setState(() {
      lightProperties = lightFilters;
      waterProperties = waterFilters;
      usageProperties = usageFilters;
    });
  }

  void onPlantFilter(List<PlantSearch> filteredPlants) {
    log("received filteredPlants: $filteredPlants");
    setState(() {
      this.filteredPlants = filteredPlants;
    });
    log("this.filteredPlants: ${this.filteredPlants}");
  }

  void onPlantSelected(PlantSearch plant) {
    AutoRouter.of(context).navigate(PlantDetailsRoute(id: plant.id));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("Encyclopédie")),
        body: ListView(
          padding: const EdgeInsets.all(10),
          children: [
            Column(
              children: [
                CustomSearchBar(
                    lightFilters: lightProperties,
                    waterFilters: waterProperties,
                    usageFilters: usageProperties,
                    plants: plantSearches,
                    onPlantFilter: onPlantFilter),
                Column(children: [
                  for (var plant in filteredPlants)
                    SearchPlantCard(plant: plant, onTap: onPlantSelected,)
                ])
              ],
            ),
          ],
        ));
  }
}
