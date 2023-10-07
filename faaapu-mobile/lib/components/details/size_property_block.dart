import 'package:flutter/material.dart';

class SizePropertyBlock extends StatelessWidget {
  final String title;
  final String unit;
  final num? minValue;
  final num? maxValue;

  const SizePropertyBlock(
      {super.key,
      required this.title,
      required this.unit,
      this.minValue,
      this.maxValue});

  @override
  Widget build(BuildContext context) {
    var text = "";
    if (minValue != null && maxValue != null) {
      text = "De $minValue$unit à $maxValue$unit";
    } else if (minValue != null) {
      text = "A partir de $minValue$unit";
    } else {
      text = "Jusqu'à $maxValue$unit";
    }
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Padding(
          padding: const EdgeInsetsDirectional.only(bottom: 5),
          child: Text(title,
              style:
                  const TextStyle(fontSize: 16, fontWeight: FontWeight.w500))),
      Wrap(children: [Text(text)])
    ]);
  }
}
