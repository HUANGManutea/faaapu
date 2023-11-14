import 'package:auto_route/auto_route.dart';
import 'package:faaapu/components/modal/add_plant_modal.dart';
import 'package:faaapu/components/search/custom_search_bar.dart';
import 'package:faaapu/components/search/search_plant_card.dart';
import 'package:faaapu/model/zone.dart';
import 'package:faaapu/router/app_router.gr.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../model/plant.dart';
import '../state/plant_search/plant_bloc.dart';
import '../state/plant_search/plant_state.dart';
import '../state/state_status.dart';
import '../state/zone/zone_bloc.dart';
import '../state/zone/zone_event.dart';
import '../state/zone/zone_state.dart';

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

  void onViewPlant(Plant plant) {
    AutoRouter.of(context).navigate(PlantDetailsRoute(id: plant.id));
  }

  void showAddPlantModal(Plant plant) {
    showModalBottomSheet(
        context: context,
        builder: (context) => BlocBuilder<ZoneBloc, ZoneState>(
            builder: (context, state) => DraggableScrollableSheet(
                initialChildSize: 1,
                minChildSize: 1,
                builder:
                    (BuildContext context, ScrollController scrollController) =>
                        AddPlantModal(
                            zones: state.zones,
                            onZoneSelected: (Zone zone) {
                              BlocProvider.of<ZoneBloc>(context).add(AddPlantToZone(zone.id, plant.id));
                              Navigator.of(context).pop();
                            }))));
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
                BlocBuilder<PlantBloc, PlantState>(
                    builder: (context, state) =>
                        Column(children: [
                          if (state.status == StateStatus.success) ...[
                            for (var plant in state.filteredPlants)
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
