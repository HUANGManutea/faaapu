import 'dart:convert';

import 'package:faaapu/model/plant.dart';

class Zone {
  int id;
  String name;
  List<Plant> plants;

  Zone({required this.id, required this.name, required this.plants});

  static getPlantList(Map<String, dynamic> json) {
    List<Plant> plants = [];
    if (json['plants'] != null) {
      var jsonDatas = List<Map<String, dynamic>>.from(json['plants']);
      for(var jsonData in jsonDatas) {
        plants.add(Plant.fromJson(jsonData));
      }
    }
    return plants;
  }

  factory Zone.fromJson(Map<String, dynamic> json) {
    List<Plant> plants = getPlantList(json);
    return Zone(id: json['id'], name: json['name'], plants: plants);
  }

  Map<String, dynamic> toJson() => {
    "id": id,
    "name": name,
    "plants": plants.map((plant) => plant.toJson()).toList()
  };

  @override
  String toString() {
    return jsonEncode(toJson());
  }
}