import 'dart:developer';

import 'package:auto_route/auto_route.dart';
import 'package:faaapu/components/modal/add_plant_modal.dart';
import 'package:faaapu/components/search/custom_search_bar.dart';
import 'package:faaapu/components/search/search_plant_card.dart';
import 'package:faaapu/model/plant_search.dart';
import 'package:faaapu/model/zone.dart';
import 'package:faaapu/router/app_router.gr.dart';
import 'package:faaapu/state/zone_cubit.dart';
import 'package:faaapu/supabase/db.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../state/plant_search/plant_search_bloc.dart';
import '../state/plant_search/plant_search_state.dart';

@RoutePage()
class SearchPage extends StatefulWidget {
  SearchPage({super.key});

  @override
  SearchPageState createState() => SearchPageState();
}

class SearchPageState extends State<SearchPage> {
  @override
  void initState() {
    super.initState();
  }

  void onViewPlant(PlantSearch plant) {
    AutoRouter.of(context).navigate(PlantDetailsRoute(id: plant.id));
  }

  void showAddPlantModal(PlantSearch plant) {
    showModalBottomSheet(
        context: context,
        builder: (context) => BlocBuilder<ZoneCubit, List<Zone>>(
            builder: (context, zones) => DraggableScrollableSheet(
                initialChildSize: 1,
                minChildSize: 1,
                builder:
                    (BuildContext context, ScrollController scrollController) =>
                        AddPlantModal(
                            zones: zones,
                            onZoneSelected: (Zone zone) {
                              onAddPlantToZone(zone, plant);
                              context.read<ZoneCubit>().fetchZonesWithPlants();
                              Navigator.of(context).pop();
                            }))));
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
                const CustomSearchBar(),
                BlocBuilder<PlantSearchBloc, PlantSearchState>(
                    builder: (context, state) =>
                        Column(children: [
                          if (state.status == PlantSearchStatus.success) ...[
                            for (var plant in state.filteredPlantSearches)
                              SearchPlantCard(
                                  plant: plant,
                                  onDetailsTap: onViewPlant,
                                  onAddToGardenTap: showAddPlantModal)
                          ] else ... [
                            const Text('Chargement')
                          ]
                        ]))
              ],
            ),
          ],
        ));
  }
}
