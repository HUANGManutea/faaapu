import 'package:flutter/material.dart';

class DeleteZoneModal extends StatefulWidget {
  final String zoneName;
  final Function(bool) onDeleteZone;

  const DeleteZoneModal(
      {super.key, required this.onDeleteZone, required this.zoneName});

  @override
  DeleteZoneModalState createState() => DeleteZoneModalState();
}

class DeleteZoneModalState extends State<DeleteZoneModal> {
  @override
  Widget build(BuildContext context) {
    return Material(
        child: Padding(
            padding: const EdgeInsets.all(10),
            child: Column(children: [
              const Text("Supprimer une zone",
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              const SizedBox(height: 10),
              Text(
                  "Voulez-vous vraiment supprimer la zone ${widget.zoneName}?"),
              const SizedBox(height: 10),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                ElevatedButton(
                  onPressed: () {
                    widget.onDeleteZone(false);
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.grey
                  ),
                  child: const Text('Annuler'),
                ),
                const SizedBox(width: 20),
                ElevatedButton(
                  onPressed: () {
                    widget.onDeleteZone(true);
                  },
                  style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.red
                  ),
                  child: const Text('Supprimer'),
                ),
              ])
            ])));
  }
}
