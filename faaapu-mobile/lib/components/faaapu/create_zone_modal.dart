import 'package:faaapu/model/zone.dart';
import 'package:flutter/material.dart';

class CreateZoneModal extends StatefulWidget {
  final Function(String) onCreateZone;

  const CreateZoneModal({
    super.key,
    required this.onCreateZone,
  });

  @override
  CreateZoneModalState createState() => CreateZoneModalState();
}

class CreateZoneModalState extends State<CreateZoneModal> {
  final _zoneNameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Material(
        child: Padding(
      padding: const EdgeInsets.all(10),
      child: Column(children: [
        const Text("Créer une zone",
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        const SizedBox(height: 10),
        TextFormField(
            controller: _zoneNameController,
            decoration: const InputDecoration(labelText: 'Nom')),
        const SizedBox(height: 18),
        ElevatedButton(
          onPressed: () {
            widget.onCreateZone(_zoneNameController.text);
          },
          child: const Text('Créer'),
        ),
      ]),
    ));
  }
}
