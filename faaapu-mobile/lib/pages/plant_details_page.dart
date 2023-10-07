import 'dart:developer';

import 'package:auto_route/auto_route.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:faaapu/components/details/season_property_block.dart';
import 'package:faaapu/components/details/size_property_block.dart';
import 'package:faaapu/components/details/widget_property_block.dart';
import 'package:faaapu/components/details/section.dart';
import 'package:faaapu/model/plant.dart';
import 'package:faaapu/supabase/db.dart';
import 'package:flutter/material.dart';

@RoutePage()
class PlantDetailsPage extends StatefulWidget {
  final int id;

  const PlantDetailsPage({super.key, required this.id});

  @override
  PlantDetailsPageState createState() => PlantDetailsPageState();
}

class PlantDetailsPageState extends State<PlantDetailsPage> {
  Plant? plant;

  @override
  void initState() {
    super.initState();
    getPlant();
  }

  void getPlant() async {
    var plant = await supabase
        .from('plant')
        .select<Map<String, dynamic>>('''
        id,
        name,
        image_url,
        low_height,
        high_height,
        low_width,
        high_width,
        scientific_name,
        family(name),
        growth(name),
        foliage(name),
        shape(name),
        water(name),
        lifespan(name),
        difficulty(name),
        type(name),
        usage(name),
        light(name),
        bloomSeasons:season!plant_bloom_season(start_month,end_month),
        harvestSeasons:season!plant_harvest_season(start_month,end_month),
        pruneSeasons:season!plant_prune_season(start_month,end_month),
        plantingMethods:planting_method!plant_planting_method(name),
        plantingSeasons:season!plant_planting_season(start_month,end_month),
        soilHumidities:soil_humidity!plant_soil_humidity(name),
        soilPhs:soil_ph!plant_soil_ph(name),
        soilTypes:soil_type!plant_soil_type(name),
        description,
        plant_advice,
        maintenance_advice,
        info
        ''')
        .eq('id', widget.id)
        .single()
        .withConverter((plantResult) => Plant.fromJson(plantResult));

    final imageUrl =
        supabase.storage.from('plants').getPublicUrl(plant.imageUrl);
    plant.imageUrl = imageUrl;

    setState(() {
      this.plant = plant;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Détails de la plante")),
      body: ListView(padding: const EdgeInsets.all(10), children: [
        if (plant == null)
          const CircularProgressIndicator()
        else
          Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
            Column(children: [
              Flex(
                direction: Axis.vertical,
                children: [
                  Text(plant!.name,
                      style: const TextStyle(
                          fontSize: 20, fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 5),
              Flex(
                direction: Axis.vertical,
                children: [
                  Text(plant!.scientificName,
                      style: const TextStyle(
                          fontSize: 20, fontStyle: FontStyle.italic))
                ],
              )
            ]),
            CachedNetworkImage(
              imageUrl: plant!.imageUrl,
              height: 200,
              width: 200,
              fit: BoxFit.fitHeight,
              alignment: FractionalOffset.topCenter,
              placeholder: (context, url) => const CircularProgressIndicator(),
              errorWidget: (context, url, error) =>
                  const Icon(Icons.error_outline),
            ),
            const SizedBox(height: 10),
            Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              WidgetPropertyBlock(
                title: "Utilisations",
                properties: plant!.usages,
              ),
              const SizedBox(width: 50),
              WidgetPropertyBlock(
                title: "Difficulté",
                property: plant!.difficulty,
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
                      property: plant!.water,
                    )),
                SizedBox(
                    width: 130,
                    height: 65,
                    child: WidgetPropertyBlock(
                      title: "Ensoleillement",
                      properties: plant!.lights,
                    )),
                SizedBox(
                    width: 130,
                    height: 65,
                    child: WidgetPropertyBlock(
                      title: "Durée de vie",
                      property: plant!.lifespan,
                    )),
                SizedBox(
                    width: 130,
                    height: 65,
                    child: WidgetPropertyBlock(
                      title: "Feuillage",
                      property: plant!.foliage,
                    )),
                SizedBox(
                    width: 130,
                    height: 65,
                    child: WidgetPropertyBlock(
                      title: "Croissance",
                      property: plant!.growth,
                    )),
                SizedBox(
                    width: 130,
                    height: 65,
                    child: WidgetPropertyBlock(
                      title: "Propagation",
                      properties: plant!.plantingMethods,
                    )),
                SizedBox(
                    width: 130,
                    height: 65,
                    child: WidgetPropertyBlock(
                      title: "Type de sol",
                      properties: plant!.soilTypes,
                    )),
                SizedBox(
                    width: 130,
                    height: 65,
                    child: WidgetPropertyBlock(
                      title: "PH du sol",
                      properties: plant!.soilPhs,
                    )),
                SizedBox(
                    width: 130,
                    height: 65,
                    child: WidgetPropertyBlock(
                      title: "Humidité du sol",
                      properties: plant!.soilHumidities,
                    )),
                if (plant!.lowWidth != null || plant!.highWidth != null)
                  SizedBox(
                      width: 130,
                      height: 65,
                      child: SizePropertyBlock(
                        title: "Largeur",
                        unit: "m",
                        minValue: plant!.lowWidth,
                        maxValue: plant!.highWidth,
                      )),
                if (plant!.lowHeight != null || plant!.highHeight != null)
                  SizedBox(
                      width: 130,
                      height: 65,
                      child: SizePropertyBlock(
                        title: "Hauteur",
                        unit: "m",
                        minValue: plant!.lowHeight,
                        maxValue: plant!.highHeight,
                      )),
              ],
            ),
            const SizedBox(height: 10),
            Wrap(direction: Axis.horizontal, spacing: 20, children: [
              if (plant!.plantingSeasons.isNotEmpty)
                SeasonPropertyBlock(title: "Plantation", seasons: plant!.plantingSeasons),
              if (plant!.bloomSeasons.isNotEmpty)
                SeasonPropertyBlock(title: "Floraison", seasons: plant!.bloomSeasons),
              if (plant!.harvestSeasons.isNotEmpty)
                SeasonPropertyBlock(title: "Récolte", seasons: plant!.harvestSeasons),
              if (plant!.pruneSeasons.isNotEmpty)
                SeasonPropertyBlock(title: "Taille", seasons: plant!.pruneSeasons),
            ],),
            const SizedBox(height: 10),
            if (plant!.description != null)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Section(title: "Description", text: plant!.description!),
                  const SizedBox(height: 10),
                ],
              ),
            if (plant!.plantAdvice != null)
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Section(
                    title: "Conseil de propagation", text: plant!.plantAdvice!),
                const SizedBox(height: 10)
              ]),
            if (plant!.maintenanceAdvice != null)
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Section(
                    title: "Conseil d'entretien",
                    text: plant!.maintenanceAdvice!),
                const SizedBox(height: 10)
              ]),
            if (plant!.info != null)
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Section(title: "Informations", text: plant!.info!)
              ]),
          ])
      ]),
    );
  }
}
