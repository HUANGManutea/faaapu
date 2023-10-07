import 'package:cached_network_image/cached_network_image.dart';
import 'package:faaapu/model/plant_search.dart';
import 'package:flutter/material.dart';

class SearchPlantCard extends StatelessWidget {
  final PlantSearch plant;
  final Function(PlantSearch) onTap;

  const SearchPlantCard({super.key, required this.plant, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        onTap: () {
          onTap(plant);
        },
        child: Card(
            clipBehavior: Clip.hardEdge,
            shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(10))),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              CachedNetworkImage(
                imageUrl: plant.imageUrl,
                height: 100,
                width: 100,
                fit: BoxFit.fitHeight,
                alignment: FractionalOffset.topCenter,
                placeholder: (context, url) =>
                    const CircularProgressIndicator(),
                errorWidget: (context, url, error) =>
                    const Icon(Icons.error_outline),
              ),
              const SizedBox(width: 5),
              Padding(
                  padding: const EdgeInsets.all(10),
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Flex(direction: Axis.vertical, children: [
                          Text(plant.name,
                              style: const TextStyle(
                                  fontSize: 20, fontWeight: FontWeight.bold)),
                        ],),
                        const SizedBox(height: 5),
                        Flex(direction: Axis.vertical, children: [
                          Text(plant.scientificName,
                              style: const TextStyle(
                                  fontSize: 20, fontStyle: FontStyle.italic))
                        ],)
                      ]))
            ])));
  }
}
