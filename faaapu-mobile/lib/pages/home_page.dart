import 'dart:developer';

import 'package:auto_route/auto_route.dart';
import 'package:faaapu/components/faaapu/create_zone_modal.dart';
import 'package:faaapu/components/faaapu/delete_zone_modal.dart';
import 'package:faaapu/components/faaapu/zone_container.dart';
import 'package:faaapu/model/plant_search.dart';
import 'package:faaapu/model/zone.dart';
import 'package:faaapu/router/app_router.gr.dart';
import 'package:faaapu/state/zone_cubit.dart';
import 'package:faaapu/supabase/db.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

@RoutePage()
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  HomePageState createState() => HomePageState();
}

class HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();
  }

  void onViewPlant(PlantSearch plant) {
    AutoRouter.of(context).navigate(PlantDetailsRoute(id: plant.id));
  }

  void onRemovePlantFromGarden(Zone zone, PlantSearch plant) async {
    await supabase
        .from('zone_plant')
        .delete()
        .eq("zone_id", zone.id)
        .eq("plant_id", plant.id);
  }

  void deleteZone(Zone zone, ZoneCubit zoneCubit) async {
    await supabase.from('zone').delete().eq('id', zone.id);
    zoneCubit.fetchZonesWithPlants();
  }

  void createZone(String name, ZoneCubit zoneCubit) async {
    var user = supabase.auth.currentUser;
    if (user == null) {
      log('cannot create zone, user is null');
    } else {
      await supabase.from('zone').insert({'name': name, 'profile_id': user.id});
      zoneCubit.fetchZonesWithPlants();
    }
  }

  void showDeleteZoneModal(Zone zone) {
    showModalBottomSheet(
        context: context,
        builder: (context) => BlocBuilder<ZoneCubit, List<Zone>>(
            builder: (context, zones) => DraggableScrollableSheet(
                initialChildSize: 1,
                minChildSize: 1,
                builder:
                    (BuildContext context, ScrollController scrollController) =>
                        DeleteZoneModal(
                            zoneName: zone.name,
                            onDeleteZone: (bool result) {
                              if (result) {
                                deleteZone(zone, context.read<ZoneCubit>());
                              }
                              Navigator.of(context).pop();
                            }))));
  }

  void showCreateZoneModal() {
    showModalBottomSheet(
        context: context,
        builder: (context) => BlocBuilder<ZoneCubit, List<Zone>>(
            builder: (context, zones) => DraggableScrollableSheet(
                initialChildSize: 1,
                minChildSize: 1,
                builder:
                    (BuildContext context, ScrollController scrollController) =>
                        CreateZoneModal(onCreateZone: (String name) {
                          createZone(name, context.read<ZoneCubit>());
                          Navigator.of(context).pop();
                        }))));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("Mes fa'a'apu")),
        body: BlocBuilder<ZoneCubit, List<Zone>>(
            builder: (context, zones) => Column(
                  children: [
                    for (var zone in zones)
                      ZoneContainer(
                          zone: zone,
                          onDetailsTap: onViewPlant,
                          onDeleteZone: showDeleteZoneModal,
                          onRemoveFromGardenTap:
                              (Zone zone, PlantSearch plant) {
                            onRemovePlantFromGarden(zone, plant);
                            context.read<ZoneCubit>().fetchZonesWithPlants();
                          }),
                    ElevatedButton(
                        onPressed: () {
                          showCreateZoneModal();
                        },
                        child: Text("Créer une zone"))
                  ],
                )));
  }
}
