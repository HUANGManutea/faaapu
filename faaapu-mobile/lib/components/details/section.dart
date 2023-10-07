import 'package:flutter/material.dart';

class Section extends StatelessWidget {
  final String title;
  final String text;

  const Section({super.key, required this.title, required this.text});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
          Text(text)
        ]);
  }
}
