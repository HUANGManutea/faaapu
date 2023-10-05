class PlantSearch {
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
  List<String> usages;
  List<String> lights;
  num? lowHeight;
  num? highHeight;
  num? lowWidth;
  num? highWidth;

  PlantSearch(
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
      required this.usages,
      required this.lights,
      this.lowHeight,
      this.highHeight,
      this.lowWidth,
      this.highWidth});

  factory PlantSearch.fromJson(Map<String, dynamic> json) {
    List<String> usages = [];
    if (json['usage'] != null) {
      var jsonUsages = List<Map<String, dynamic>>.from(json['usage']);
      for (var jsonUsage in jsonUsages) {
        if (jsonUsage['name'] != null) {
          usages.add(jsonUsage['name']);
        }
      }
    }
    List<String> lights = [];
    if (json['light'] != null) {
      var jsonLights = List<Map<String, dynamic>>.from(json['light']);
      for (var jsonLight in jsonLights) {
        if (jsonLight['name'] != null) {
          lights.add(jsonLight['name']);
        }
      }
    }
    return PlantSearch(
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
      lowHeight: json['low_height'],
      highHeight: json['high_height'],
      lowWidth: json['low_width'],
      highWidth: json['high_width'],
    );
  }

  @override
  String toString() {
    return "{id: $id, name: $name, scientificName: $scientificName, imageUrl: $imageUrl, family: $family, growth: $growth, foliage: $foliage, shape: $shape, water: $water, lifespan: $lifespan, difficulty: $difficulty, type: $type, usages: $usages, lights: $lights, lowHeight: $lowHeight, highHeight: $highHeight, lowWidth: $lowWidth, highWidth: $highWidth}";
  }
}
