import 'package:cached_network_image/cached_network_image.dart';
import 'package:faaapu/model/plant_search.dart';
import 'package:flutter/material.dart';

class SearchPlantCard extends StatelessWidget {
  final PlantSearch plant;
  final Function(PlantSearch) onDetailsTap;
  final Function(PlantSearch) onAddToGardenTap;

  const SearchPlantCard(
      {super.key,
      required this.plant,
      required this.onDetailsTap,
      required this.onAddToGardenTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        onTap: () {
          onDetailsTap(plant);
        },
        child: Card(
            clipBehavior: Clip.hardEdge,
            shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(10))),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              CachedNetworkImage(
                imageUrl: plant.imageUrl,
                height: 130,
                width: 130,
                fit: BoxFit.fitHeight,
                alignment: FractionalOffset.topCenter,
                placeholder: (context, url) =>
                    const CircularProgressIndicator(),
                errorWidget: (context, url, error) =>
                    const Icon(Icons.error_outline),
              ),
              const SizedBox(width: 5),
              Flexible(
                  child: Padding(
                      padding: const EdgeInsets.all(10),
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(plant.name,
                                style: const TextStyle(
                                    fontSize: 20, fontWeight: FontWeight.bold)),
                            const SizedBox(height: 5),
                            Text(plant.scientificName,
                                style: const TextStyle(
                                    fontSize: 20, fontStyle: FontStyle.italic)),
                            const SizedBox(height: 5),
                            Row(
                                children: [
                                  ElevatedButton(
                                      onPressed: () {
                                        onDetailsTap(plant);
                                      },
                                      child: const Text("Voir la fiche")),
                                  const SizedBox(width: 5),
                                  ElevatedButton(
                                      onPressed: () {
                                        onAddToGardenTap(plant);
                                      },
                                      child: const Text("Ajouter")),
                                ])
                          ])))
            ])));
  }
}
