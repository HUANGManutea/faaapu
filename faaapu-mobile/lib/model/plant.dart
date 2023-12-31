import 'dart:convert';

import 'season.dart';

class Plant {
  int id;
  String name;
  String scientificName;
  String imageUrl;
  String family;
  String growth;
  String foliage;
  String shape;
  String water;
  String lifespan;
  String difficulty;
  String type;
  List<Season> bloomSeasons;
  List<Season> harvestSeasons;
  List<Season> pruneSeasons;
  List<Season> plantingSeasons;
  List<String> usages;
  List<String> lights;
  List<String> plantingMethods;
  List<String> soilHumidities;
  List<String> soilPhs;
  List<String> soilTypes;
  num? lowHeight;
  num? highHeight;
  num? lowWidth;
  num? highWidth;
  String? contentUrl;
  String? content;

  Plant(
      {required this.id,
      required this.name,
      required this.scientificName,
      required this.imageUrl,
      required this.family,
      required this.growth,
      required this.foliage,
      required this.shape,
      required this.water,
      required this.lifespan,
      required this.difficulty,
      required this.type,
      required this.bloomSeasons,
      required this.harvestSeasons,
      required this.pruneSeasons,
      required this.plantingSeasons,
      required this.usages,
      required this.lights,
      required this.plantingMethods,
      required this.soilHumidities,
      required this.soilPhs,
      required this.soilTypes,
      this.lowHeight,
      this.highHeight,
      this.lowWidth,
      this.highWidth,
      this.contentUrl});

  static getPropertyList(Map<String, dynamic> json, String key) {
    List<String> propertyList = [];
    if (json[key] != null) {
      var jsonDatas = List<dynamic>.from(json[key]);
      for (var jsonData in jsonDatas) {
        if (jsonData is String) {
          propertyList.add(jsonData);
        } else if (jsonData['name'] != null) {
          propertyList.add(jsonData['name']);
        }
      }
    }
    return propertyList;
  }

  static getSeasonList(Map<String, dynamic> json, String key) {
    List<Season> seasonList = [];
    if (json[key] != null) {
      var jsonDatas = List<Map<String, dynamic>>.from(json[key]);
      for (var jsonData in jsonDatas) {
        seasonList.add(Season.fromJson(jsonData));
      }
    }
    return seasonList;
  }

  factory Plant.fromJson(Map<String, dynamic> json) {
    List<Season> bloomSeasons = getSeasonList(json, 'bloomSeasons');
    List<Season> harvestSeasons = getSeasonList(json, 'harvestSeasons');
    List<Season> pruneSeasons = getSeasonList(json, 'pruneSeasons');
    List<Season> plantingSeasons = getSeasonList(json, 'plantingSeasons');
    List<String> usages = getPropertyList(json, 'usage');
    List<String> lights = getPropertyList(json, 'light');
    List<String> plantingMethods = getPropertyList(json, 'plantingMethods');
    List<String> soilHumidities = getPropertyList(json, 'soilHumidities');
    List<String> soilPhs = getPropertyList(json, 'soilPhs');
    List<String> soilTypes = getPropertyList(json, 'soilTypes');
    return Plant(
      id: json['id'],
      name: json['name'],
      scientificName: json['scientific_name'],
      imageUrl: json['image_url'],
      family: json['family']['name'],
      growth: json['growth']['name'],
      foliage: json['foliage']['name'],
      shape: json['shape']['name'],
      water: json['water']['name'],
      lifespan: json['lifespan']['name'],
      difficulty: json['difficulty']['name'],
      type: json['type']['name'],
      usages: usages,
      lights: lights,
      bloomSeasons: bloomSeasons,
      harvestSeasons: harvestSeasons,
      pruneSeasons: pruneSeasons,
      plantingMethods: plantingMethods,
      plantingSeasons: plantingSeasons,
      soilHumidities: soilHumidities,
      soilPhs: soilPhs,
      soilTypes: soilTypes,
      lowHeight: json['low_height'],
      highHeight: json['high_height'],
      lowWidth: json['low_width'],
      highWidth: json['high_width'],
      contentUrl: json['content_url'],
    );
  }

  List<Map<String, dynamic>> seasonsToJson(List<Season> seasons) {
    return seasons.map((season) => season.toJson()).toList();
  }

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "scientific_name": scientificName,
        "image_url": imageUrl,
        "family": {"name": family},
        "growth": {"name": growth},
        "foliage": {"name": foliage},
        "shape": {"name": name},
        "water": {"name": water},
        "lifespan": {"name": lifespan},
        "difficulty": {"name": difficulty},
        "type": {"name": type},
        "usage": usages,
        "light": lights,
        "bloomSeasons": seasonsToJson(bloomSeasons),
        "harvestSeasons": seasonsToJson(harvestSeasons),
        "pruneSeasons": seasonsToJson(pruneSeasons),
        "plantingSeasons": seasonsToJson(plantingSeasons),
        "plantingMethods": plantingMethods,
        "soilHumidities": soilHumidities,
        "soilPhs": soilPhs,
        "soilTypes": soilTypes,
        "low_height": lowHeight,
        "high_height": highHeight,
        "low_width": lowWidth,
        "high_width": highWidth,
        "content_url": contentUrl,
      };

  @override
  String toString() {
    return jsonEncode(toJson());
  }
}
