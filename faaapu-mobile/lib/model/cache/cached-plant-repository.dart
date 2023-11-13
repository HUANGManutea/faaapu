import '../plant.dart';
import '../plant_search.dart';

class CachedPlantRepository {
  final List<PlantSearch> plantSearches;
  final Map<int, Plant> plants;

  const CachedPlantRepository(
      {required this.plantSearches, required this.plants});

  factory CachedPlantRepository.fromJson(Map<String, dynamic> json) {
    final List<PlantSearch> plantSearches =
        (json['plantSearches'] as List<dynamic>)
            .map((item) => PlantSearch.fromJson(item as Map<String, dynamic>))
            .toList();

    final Map<int, Plant> plants = {
      for (var entry in (json['plants'] as Map<String, dynamic>).entries)
        int.parse(entry.key):
            Plant.fromJson(entry.value as Map<String, dynamic>)
    };

    return CachedPlantRepository(
      plantSearches: plantSearches,
      plants: plants,
    );
  }

  Map<String, dynamic> toJson() => {
        "plantSearches": plantSearches.map((ps) => ps.toJson()).toList(),
        "plants": Map<String, dynamic>.fromEntries(plants.entries.map(
            (entry) => MapEntry(entry.key.toString(), entry.value.toJson()))),
      };
}
