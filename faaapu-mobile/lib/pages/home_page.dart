import 'dart:developer';

import 'package:auto_route/auto_route.dart';
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("Mes fa'a'apu")),
        body: BlocBuilder<ZoneCubit, List<Zone>>(builder: (context, zones) => Column(
          children: [
            for (var zone in zones)
              ZoneContainer(
                  zone: zone,
                  onDetailsTap: onViewPlant,
                  onRemoveFromGardenTap: (Zone zone, PlantSearch plant) {
                    onRemovePlantFromGarden(zone, plant);
                    context.read<ZoneCubit>().fetchZonesWithPlants();
                  })
          ],
        )));
  }
}
