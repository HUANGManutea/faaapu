import 'dart:developer';

import 'package:faaapu/model/plant-properties/simple_property.dart';
import 'package:flutter/material.dart';

class FilterSection extends StatefulWidget {
  final String title;
  final List<SimpleProperty> items;
  final SimpleProperty? selectedItem;
  final ValueChanged<SimpleProperty?> onChanged;

  const FilterSection({
    super.key,
    required this.title,
    required this.items,
    required this.onChanged,
    required this.selectedItem,
  });

  @override
  FilterSectionState createState() => FilterSectionState();
}

class FilterSectionState extends State<FilterSection> {
  SimpleProperty? filter;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(widget.title),
        Row(
          children: [
            for (var item in widget.items)
              FilterChip(
                label: Text(item.name),
                selected: filter == item,
                onSelected: (bool selected) {
                  setState(() {
                    if (selected) {
                      filter = item;
                    } else {
                      filter = null;
                    }
                  });
                  widget.onChanged(filter);
                },
              ),
          ],
        )
      ],
    );
  }
}
