import 'dart:developer';

import 'package:auto_route/auto_route.dart';
import 'package:faaapu/components/CustomSearchBar.dart';
import 'package:faaapu/model/plant-properties/light_property.dart';
import 'package:faaapu/model/plant-properties/usage_property.dart';
import 'package:faaapu/model/plant-properties/water_property.dart';
import 'package:faaapu/model/plant_search.dart';
import 'package:faaapu/supabase/Db.dart';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

@RoutePage()
class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  SearchPageState createState() => SearchPageState();
}

class SearchPageState extends State<SearchPage> {
  List<LightProperty> lightProperties = [];
  List<WaterProperty> waterProperties = [];
  List<UsageProperty> usageProperties = [];
  List<PlantSearch> plantSearches = [];
  @override
  void initState() {
    super.initState();
    getPlants();
    getFilters();
  }

  void getPlants() async {
    var plants = await supabase.from('plant')
        .select<List<Map<String, dynamic>>>('''
        id,
        name,
        image_url,
        low_height,
        high_height,
        low_width,
        high_width,
        scientific_name,
        family(name),
        growth(name),
        foliage(name),
        shape(name),
        water(name),
        lifespan(name),
        difficulty(name),
        type(name),
        usage(name),
        light(name)
        ''').withConverter((plantSearchResults) => plantSearchResults.map((data) => PlantSearch.fromJson(data)).toList());
    log("$plants");
    setState(() {
      plantSearches = plants;
    });
  }

  void getFilters() async {
    final lightFilters = await supabase.from('light')
        .select<List<Map<String, dynamic>>>('id, name, description')
        .withConverter((lights) => lights.map((data) => LightProperty.fromJson(data)).toList());
    final waterFilters = await supabase.from('water')
        .select<List<Map<String, dynamic>>>('id, name, description')
        .withConverter((waters) => waters.map((data) => WaterProperty.fromJson(data)).toList());
    final usageFilters = await supabase.from('usage')
        .select<List<Map<String, dynamic>>>('id, name, description')
        .withConverter((usages) => usages.map((data) => UsageProperty.fromJson(data)).toList());

    setState(() {
      lightProperties = lightFilters;
      waterProperties = waterFilters;
      usageProperties = usageFilters;
    });
  }

  void onPlantFilter(List<int> filteredPlantIds) {
    log('$filteredPlantIds');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("Encyclopédie")),
        body: Padding(
          padding: const EdgeInsets.all(10),
          child: Column(
            children: [CustomSearchBar(lightFilters: lightProperties, waterFilters: waterProperties, usageFilters: usageProperties, plants: plantSearches, onPlantFilter: onPlantFilter)],
          ),
        ));
  }
}
