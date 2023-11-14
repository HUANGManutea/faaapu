import 'package:auto_route/auto_route.dart';
import 'package:faaapu/components/faaapu/create_zone_modal.dart';
import 'package:faaapu/components/faaapu/delete_zone_modal.dart';
import 'package:faaapu/components/faaapu/zone_container.dart';
import 'package:faaapu/model/zone.dart';
import 'package:faaapu/router/app_router.gr.dart';
import 'package:faaapu/state/state_status.dart';
import 'package:faaapu/state/zone/zone_event.dart';
import 'package:faaapu/state/zone/zone_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../model/plant.dart';
import '../state/zone/zone_bloc.dart';

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

  void onViewPlant(Plant plant) {
    AutoRouter.of(context).navigate(PlantDetailsRoute(id: plant.id));
  }

  void showDeleteZoneModal(Zone zone) {
    showModalBottomSheet(
        context: context,
        builder: (context) => DraggableScrollableSheet(
            initialChildSize: 1,
            minChildSize: 1,
            builder:
                (BuildContext context, ScrollController scrollController) =>
                    DeleteZoneModal(
                        zoneName: zone.name,
                        onDeleteZone: (bool result) {
                          if (result) {
                            BlocProvider.of<ZoneBloc>(context)
                                .add(ZoneDeleted(zone.id));
                          }
                          Navigator.of(context).pop();
                        })));
  }

  void showCreateZoneModal() {
    showModalBottomSheet(
        context: context,
        builder: (context) => DraggableScrollableSheet(
            initialChildSize: 1,
            minChildSize: 1,
            builder:
                (BuildContext context, ScrollController scrollController) =>
                    CreateZoneModal(onCreateZone: (String name) {
                      BlocProvider.of<ZoneBloc>(context).add(ZoneAdded(name));
                      Navigator.of(context).pop();
                    })));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("Mes fa'a'apu")),
        body: BlocBuilder<ZoneBloc, ZoneState>(
            builder: (context, state) => Column(
                  children: [
                    if (state.status == StateStatus.success) ...[
                      for (var zone in state.zones)
                        ZoneContainer(
                            zone: zone,
                            onDetailsTap: onViewPlant,
                            onDeleteZone: showDeleteZoneModal,
                            onRemoveFromGardenTap:
                                (Zone zone, Plant plant) {
                              BlocProvider.of<ZoneBloc>(context).add(RemovePlantFromZone(zone.id, plant.id));
                            }),
                      ElevatedButton(
                          onPressed: () {
                            showCreateZoneModal();
                          },
                          child: const Text("Créer une zone")
                      )
                    ] else ...[
                      const Text("chargement")
                    ]
                  ],
                )));
  }
}
