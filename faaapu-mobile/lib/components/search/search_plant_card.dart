import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../../model/plant.dart';

class SearchPlantCard extends StatelessWidget {
  final Plant plant;
  final Function(Plant) onDetailsTap;
  final Function(Plant)? onAddToGardenTap;
  final Function(Plant)? onRemoveFromGardenTap;

  const SearchPlantCard(
      {super.key,
      required this.plant,
      required this.onDetailsTap,
      this.onAddToGardenTap, this.onRemoveFromGardenTap});

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
                                      style: ElevatedButton.styleFrom(
                                          backgroundColor: Colors.blueAccent
                                      ),
                                      child: const Text("Voir la fiche")),
                                  if (onAddToGardenTap != null)
                                    Row(children: [
                                      const SizedBox(width: 5),
                                      ElevatedButton(
                                          onPressed: () {
                                            onAddToGardenTap!(plant);
                                          },
                                          child: const Text("Ajouter"),
                                      ),
                                    ],),
                                  if (onRemoveFromGardenTap != null)
                                    Row(children: [
                                      const SizedBox(width: 5),
                                      ElevatedButton(
                                          onPressed: () {
                                            onRemoveFromGardenTap!(plant);
                                          },
                                          style: ButtonStyle(backgroundColor: MaterialStateProperty.all(Colors.red)),
                                          child: const Text("Retirer")),
                                    ],)
                                ])
                          ])))
            ])));
  }
}
