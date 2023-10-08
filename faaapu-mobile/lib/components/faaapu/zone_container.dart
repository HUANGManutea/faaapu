import 'package:faaapu/components/search/search_plant_card.dart';
import 'package:faaapu/model/plant_search.dart';
import 'package:faaapu/model/zone.dart';
import 'package:flutter/material.dart';

class ZoneContainer extends StatelessWidget {
  final Zone zone;
  final Function(PlantSearch) onDetailsTap;
  final Function(Zone, PlantSearch) onRemoveFromGardenTap;

  const ZoneContainer({super.key, required this.zone, required this.onDetailsTap, required this.onRemoveFromGardenTap});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(zone.name,
            style:
            const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        for(var plant in zone.plants)
          SearchPlantCard(
              plant: plant, onDetailsTap: onDetailsTap, onRemoveFromGardenTap: (PlantSearch plant) {
                onRemoveFromGardenTap(zone, plant);
          })
      ],
    );
  }
}
