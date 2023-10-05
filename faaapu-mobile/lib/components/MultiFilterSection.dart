import 'package:faaapu/model/plant-properties/simple_property.dart';
import 'package:flutter/material.dart';

class MultiFilterSection extends StatefulWidget {
  final String title;
  final List<SimpleProperty> items;
  final List<SimpleProperty>? selectedItems;
  final ValueChanged<String> onConditionChanged;
  final ValueChanged<List<SimpleProperty>> onValuesChanged;

  const MultiFilterSection({
    super.key,
    required this.title,
    required this.items,
    required this.onConditionChanged,
    required this.onValuesChanged,
    required this.selectedItems,
  });

  @override
  MultiFilterSectionState createState() => MultiFilterSectionState();
}

class MultiFilterSectionState extends State<MultiFilterSection> {
  late final List<String> conditions;
  late String selectedCondition;
  Set<SimpleProperty> filters = <SimpleProperty>{};

  @override
  void initState() {
    super.initState();
    conditions = ["OU", "ET"];
    selectedCondition = conditions[0];
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(widget.title),
            DropdownButton(value: selectedCondition, items: conditions.map((option) {
              return DropdownMenuItem(value: option, child: Text(option));
            }).toList(), onChanged: (newValue) {
              setState(() {
                if (newValue != null) {
                  selectedCondition = newValue;
                }
              });
              widget.onConditionChanged(selectedCondition);
            })
          ],
        ),
        Row(
          children: [
            for (var item in widget.items)
              FilterChip(
                label: Text(item.name),
                selected: filters.contains(item),
                onSelected: (bool selected) {
                  setState(() {
                    if (selected) {
                      filters.add(item);
                    } else {
                      filters.remove(item);
                    }
                  });
                  widget.onValuesChanged(filters.toList());
                },
              ),
          ],
        )
      ],
    );
  }
}
