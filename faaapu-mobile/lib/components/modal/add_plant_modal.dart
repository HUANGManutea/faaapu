import 'package:faaapu/model/zone.dart';
import 'package:flutter/material.dart';

class AddPlantModal extends StatelessWidget {
  final List<Zone> zones;
  final Function(Zone) onZoneSelected;

  const AddPlantModal(
      {super.key,
      required this.zones,
      required this.onZoneSelected});

  @override
  Widget build(BuildContext context) {
    return Material(
        child: Padding(
            padding: const EdgeInsets.all(10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text("Ajouter à une zone",
                    style: TextStyle(
                        fontSize: 24, fontWeight: FontWeight.bold)),
                const SizedBox(height: 10),
                Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      for (var zone in zones)
                        ElevatedButton(
                          onPressed: () {
                            onZoneSelected(zone);
                          },
                          child: Padding(
                              padding: EdgeInsets.all(10),
                              child: Text(zone.name,
                                  style: const TextStyle(fontSize: 20))),
                        )
                    ])
              ],
            )));
  }
}
