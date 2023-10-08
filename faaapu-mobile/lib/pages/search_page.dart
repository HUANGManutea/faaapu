import 'dart:developer';

import 'package:auto_route/auto_route.dart';
import 'package:faaapu/components/modal/add_plant_modal.dart';
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
import 'package:faaapu/model/zone.dart';
import 'package:faaapu/router/app_router.gr.dart';
import 'package:faaapu/supabase/db.dart';
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
  List<Zone> zones = [];

  @override
  void initState() {
    super.initState();
    getPlants();
    getFilters();
    getZones();
  }

  void getPlants() async {
    List<PlantSearch> plants = await widget.plantRepository.getPlantSearches();
    setState(() {
      plantSearches = plants;
      filteredPlants = plants;
    });
  }

  void getZones() async {
    var zones = await supabase
        .from('zone')
        .select<List<Map<String, dynamic>>>('id, name')
        .withConverter(
            (zones) => zones.map((zone) => Zone.fromJson(zone)).toList());
    setState(() {
      this.zones = zones;
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

  void onViewPlant(PlantSearch plant) {
    AutoRouter.of(context).navigate(PlantDetailsRoute(id: plant.id));
  }

  void onAddPlant(PlantSearch plant) {
    showModalBottomSheet(
        context: context,
        builder: (context) => DraggableScrollableSheet(
          initialChildSize: 1,
            minChildSize: 1,
            builder:
                (BuildContext context, ScrollController scrollController) =>
                    AddPlantModal(
                        title: "Ajouter à une zone",
                        zones: zones,
                        onZoneSelected: (Zone zone) {
                          onAddPlantToZone(zone, plant);
                          Navigator.of(context).pop();
                        })));
  }

  void onAddPlantToZone(Zone zone, PlantSearch plant) async {
    await supabase
        .from('zone_plant')
        .insert({"zone_id": zone.id, "plant_id": plant.id});
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
                    SearchPlantCard(
                        plant: plant,
                        onDetailsTap: onViewPlant,
                        onAddToGardenTap: onAddPlant)
                ])
              ],
            ),
          ],
        ));
  }
}
