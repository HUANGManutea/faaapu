import 'package:auto_route/auto_route.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:faaapu/components/details/season_property_block.dart';
import 'package:faaapu/components/details/size_property_block.dart';
import 'package:faaapu/components/details/widget_property_block.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_markdown/flutter_markdown.dart';

import '../state/plant_search/plant_search_bloc.dart';
import '../state/plant_search/plant_search_event.dart';
import '../state/plant_search/plant_search_state.dart';

@RoutePage()
class PlantDetailsPage extends StatefulWidget {
  final int id;

  const PlantDetailsPage({super.key, required this.id});

  @override
  PlantDetailsPageState createState() => PlantDetailsPageState();
}

class PlantDetailsPageState extends State<PlantDetailsPage> {
  @override
  void initState() {
    super.initState();
    BlocProvider.of<PlantSearchBloc>(context).add(PlantChanged(widget.id));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("Détails de la plante")),
        body: BlocBuilder<PlantSearchBloc, PlantSearchState>(
          builder: (context, state) =>
              ListView(padding: const EdgeInsets.all(10), children: [
            if (state.plant != null) ...[
              Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
                Column(children: [
                  Flex(
                    direction: Axis.vertical,
                    children: [
                      Text(state.plant!.name,
                          style: const TextStyle(
                              fontSize: 20, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  const SizedBox(height: 5),
                  Flex(
                    direction: Axis.vertical,
                    children: [
                      Text(state.plant!.scientificName,
                          style: const TextStyle(
                              fontSize: 20, fontStyle: FontStyle.italic))
                    ],
                  )
                ]),
                CachedNetworkImage(
                  imageUrl: state.plant!.imageUrl,
                  height: 200,
                  width: 200,
                  fit: BoxFit.fitHeight,
                  alignment: FractionalOffset.topCenter,
                  placeholder: (context, url) =>
                      const CircularProgressIndicator(),
                  errorWidget: (context, url, error) =>
                      const Icon(Icons.error_outline),
                ),
                const SizedBox(height: 10),
                Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  WidgetPropertyBlock(
                    title: "Utilisations",
                    properties: state.plant!.usages,
                  ),
                  const SizedBox(width: 50),
                  WidgetPropertyBlock(
                    title: "Difficulté",
                    property: state.plant!.difficulty,
                  )
                ]),
                const SizedBox(height: 10),
                Wrap(
                  direction: Axis.horizontal,
                  children: [
                    SizedBox(
                        width: 130,
                        height: 65,
                        child: WidgetPropertyBlock(
                          title: "Besoin en eau",
                          property: state.plant!.water,
                        )),
                    SizedBox(
                        width: 130,
                        height: 65,
                        child: WidgetPropertyBlock(
                          title: "Ensoleillement",
                          properties: state.plant!.lights,
                        )),
                    SizedBox(
                        width: 130,
                        height: 65,
                        child: WidgetPropertyBlock(
                          title: "Durée de vie",
                          property: state.plant!.lifespan,
                        )),
                    SizedBox(
                        width: 130,
                        height: 65,
                        child: WidgetPropertyBlock(
                          title: "Feuillage",
                          property: state.plant!.foliage,
                        )),
                    SizedBox(
                        width: 130,
                        height: 65,
                        child: WidgetPropertyBlock(
                          title: "Croissance",
                          property: state.plant!.growth,
                        )),
                    SizedBox(
                        width: 130,
                        height: 65,
                        child: WidgetPropertyBlock(
                          title: "Propagation",
                          properties: state.plant!.plantingMethods,
                        )),
                    SizedBox(
                        width: 130,
                        height: 65,
                        child: WidgetPropertyBlock(
                          title: "Type de sol",
                          properties: state.plant!.soilTypes,
                        )),
                    SizedBox(
                        width: 130,
                        height: 65,
                        child: WidgetPropertyBlock(
                          title: "PH du sol",
                          properties: state.plant!.soilPhs,
                        )),
                    SizedBox(
                        width: 130,
                        height: 65,
                        child: WidgetPropertyBlock(
                          title: "Humidité du sol",
                          properties: state.plant!.soilHumidities,
                        )),
                    if (state.plant!.lowWidth != null ||
                        state.plant!.highWidth != null)
                      SizedBox(
                          width: 130,
                          height: 65,
                          child: SizePropertyBlock(
                            title: "Largeur",
                            unit: "m",
                            minValue: state.plant!.lowWidth,
                            maxValue: state.plant!.highWidth,
                          )),
                    if (state.plant!.lowHeight != null ||
                        state.plant!.highHeight != null)
                      SizedBox(
                          width: 130,
                          height: 65,
                          child: SizePropertyBlock(
                            title: "Hauteur",
                            unit: "m",
                            minValue: state.plant!.lowHeight,
                            maxValue: state.plant!.highHeight,
                          )),
                  ],
                ),
                const SizedBox(height: 10),
                Wrap(
                  direction: Axis.horizontal,
                  spacing: 20,
                  children: [
                    if (state.plant!.plantingSeasons.isNotEmpty)
                      SeasonPropertyBlock(
                          title: "Plantation",
                          seasons: state.plant!.plantingSeasons),
                    if (state.plant!.bloomSeasons.isNotEmpty)
                      SeasonPropertyBlock(
                          title: "Floraison",
                          seasons: state.plant!.bloomSeasons),
                    if (state.plant!.harvestSeasons.isNotEmpty)
                      SeasonPropertyBlock(
                          title: "Récolte",
                          seasons: state.plant!.harvestSeasons),
                    if (state.plant!.pruneSeasons.isNotEmpty)
                      SeasonPropertyBlock(
                          title: "Taille", seasons: state.plant!.pruneSeasons),
                  ],
                ),
                const SizedBox(height: 10),
                if (state.plant!.content != null)
                  MarkdownBody(data: state.plant!.content!)
              ])
            ] else ...[
              const CircularProgressIndicator()
            ]
          ]),
        ));
  }
}
