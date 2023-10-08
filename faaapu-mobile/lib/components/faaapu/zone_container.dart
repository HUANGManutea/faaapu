import 'package:faaapu/components/search/search_plant_card.dart';
import 'package:faaapu/model/plant_search.dart';
import 'package:faaapu/model/zone.dart';
import 'package:flutter/material.dart';

class ZoneContainer extends StatelessWidget {
  final Zone zone;
  final Function(PlantSearch) onDetailsTap;
  final Function(Zone, PlantSearch) onRemoveFromGardenTap;
  final Function(Zone) onDeleteZone;

  const ZoneContainer(
      {super.key,
      required this.zone,
      required this.onDetailsTap,
      required this.onRemoveFromGardenTap,
      required this.onDeleteZone});

  @override
  Widget build(BuildContext context) {
    return Card(child: Padding(padding: const EdgeInsets.all(5), child: Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(zone.name,
                style:
                const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            ElevatedButton(
                onPressed: () {
                  onDeleteZone(zone);
                },
                style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(Colors.red)),
                child: const Text('Supprimer'))
          ],
        ),
        if (zone.plants.isEmpty)
          const Text("Aucune plante dans cette zone",
              style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w500,
                  fontStyle: FontStyle.italic))
        else
          for (var plant in zone.plants)
            SearchPlantCard(
                plant: plant,
                onDetailsTap: onDetailsTap,
                onRemoveFromGardenTap: (PlantSearch plant) {
                  onRemoveFromGardenTap(zone, plant);
                })
      ],
    ))) ;
  }
}
