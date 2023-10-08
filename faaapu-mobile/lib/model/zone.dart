import 'dart:convert';

import 'package:faaapu/model/plant_search.dart';

class Zone {
  int id;
  String name;
  List<PlantSearch> plants;

  Zone({required this.id, required this.name, required this.plants});

  static getPlantSearchList(Map<String, dynamic> json) {
    List<PlantSearch> plants = [];
    if (json['plants'] != null) {
      var jsonDatas = List<Map<String, dynamic>>.from(json['plants']);
      for(var jsonData in jsonDatas) {
        plants.add(PlantSearch.fromJson(jsonData));
      }
    }
    return plants;
  }

  factory Zone.fromJson(Map<String, dynamic> json) {
    List<PlantSearch> plants = getPlantSearchList(json);
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