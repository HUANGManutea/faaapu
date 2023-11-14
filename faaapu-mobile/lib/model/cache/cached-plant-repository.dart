import '../plant.dart';

class CachedPlantRepository {
  final List<Plant> plants;

  const CachedPlantRepository(
      {required this.plants});

  factory CachedPlantRepository.fromJson(Map<String, dynamic> json) {
    final List<Plant> plants =
        (json['plants'] as List<dynamic>)
            .map((item) => Plant.fromJson(item as Map<String, dynamic>))
            .toList();

    return CachedPlantRepository(
      plants: plants,
    );
  }

  Map<String, dynamic> toJson() => {
        "plants": plants.map((ps) => ps.toJson()).toList(),
      };
}
