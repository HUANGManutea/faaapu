import 'package:faaapu/components/search/filter_section.dart';
import 'package:faaapu/components/search/multi_filter_section.dart';
import 'package:faaapu/model/plant-properties/light_property.dart';
import 'package:faaapu/model/plant-properties/usage_property.dart';
import 'package:faaapu/model/plant-properties/water_property.dart';
import 'package:faaapu/model/plant_search_filters.dart';
import 'package:faaapu/state/light_cubit.dart';
import 'package:faaapu/state/plant_search/plant_search_bloc.dart';
import 'package:faaapu/state/usage_cubit.dart';
import 'package:faaapu/state/water_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../state/plant_search/plant_search_event.dart';
import '../../state/plant_search/plant_search_state.dart';
import '../../state/state_status.dart';

class CustomSearchBar extends StatefulWidget {
  const CustomSearchBar({super.key});

  @override
  CustomSearchBarState createState() => CustomSearchBarState();
}

class CustomSearchBarState extends State<CustomSearchBar> {
  LightProperty? selectedLight;
  WaterProperty? selectedWater;
  List<UsageProperty> selectedUsages = [];
  String? usageFilterCondition;
  String selectedFamily = '';
  String nameFilter = '';
  bool isFilterExpanded = false;

  @override
  void initState() {
    super.initState();
  }

  void applyFilters() {
    BlocProvider.of<PlantSearchBloc>(context).add(PlantSearchFilterChanged(
        PlantSearchFilters.fromForm(selectedLight, selectedWater,
            selectedUsages, usageFilterCondition, nameFilter)));
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<PlantSearchBloc, PlantSearchState>(
        builder: (context, state) => BlocBuilder<LightCubit,
                List<LightProperty>>(
            builder: (context, lightFilters) => BlocBuilder<UsageCubit,
                    List<UsageProperty>>(
                builder: (context, usageFilters) =>
                    BlocBuilder<WaterCubit, List<WaterProperty>>(
                        builder: (context, waterFilters) => Card(
                            child: Padding(
                                padding: const EdgeInsets.all(5),
                                child: Column(
                                  children: [
                                    if (state.status == StateStatus.loading) ...[
                                      const Text('Chargement'),
                                    ] else ...[
                                      Row(
                                        children: [
                                          Expanded(
                                              child: TextField(
                                            onChanged: (value) {
                                              setState(() {
                                                nameFilter = value;
                                              });
                                            },
                                            onSubmitted: (_) {
                                              applyFilters();
                                            },
                                            decoration: const InputDecoration(
                                                hintText: 'Nom de plante',
                                                prefixIcon: Icon(Icons.search),
                                                border: InputBorder.none),
                                          )),
                                          IconButton(
                                            icon: const Icon(Icons.filter_list),
                                            onPressed: () {
                                              setState(() {
                                                isFilterExpanded =
                                                    !isFilterExpanded;
                                              });
                                            },
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 10),
                                      if (isFilterExpanded) ...[
                                        FilterSection(
                                          title: 'Ensoleillement',
                                          items: lightFilters,
                                          selectedItem:
                                              state.filters.selectedLight,
                                          onChanged: (value) {
                                            setState(() {
                                              selectedLight =
                                                  value as LightProperty?;
                                            });
                                          },
                                        ),
                                        const SizedBox(height: 10),
                                        FilterSection(
                                          title: 'Besoin en eau',
                                          items: waterFilters,
                                          selectedItem:
                                              state.filters.selectedWater,
                                          onChanged: (value) {
                                            setState(() {
                                              selectedWater =
                                                  value as WaterProperty?;
                                            });
                                          },
                                        ),
                                        const SizedBox(height: 10),
                                        // FilterSection(
                                        //   title: 'Family',
                                        //   items: const ['Family A', 'Family B', 'Family C'],
                                        //   selectedItem: selectedFamily,
                                        //   onChanged: (value) {
                                        //     setState(() {
                                        //       selectedFamily = value;
                                        //     });
                                        //   },
                                        // ),
                                        MultiFilterSection(
                                          title: 'Utilisations',
                                          items: usageFilters,
                                          selectedItems:
                                              state.filters.selectedUsages,
                                          onConditionChanged: (condition) {
                                            setState(() {
                                              usageFilterCondition = condition;
                                            });
                                          },
                                          onValuesChanged: (values) {
                                            var transformedValues = values
                                                .map((value) =>
                                                    value as UsageProperty)
                                                .toList();
                                            setState(() {
                                              selectedUsages =
                                                  transformedValues;
                                            });
                                          },
                                        ),
                                        ElevatedButton(
                                          onPressed: () {
                                            applyFilters();
                                          },
                                          child: const Text('Rechercher'),
                                        ),
                                      ],
                                    ]
                                  ],
                                )))))));
  }
}
