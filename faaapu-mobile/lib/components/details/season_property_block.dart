import 'package:faaapu/model/season.dart';
import 'package:flutter/material.dart';

class SeasonPropertyBlock extends StatelessWidget {
  final String title;
  final List<Season> seasons;

  final Map<int, String> months = {
    1: "Jan.",
    2: "Fév.",
    3: "Mars",
    4: "Avr.",
    5: "Mai",
    6: "Juin",
    7: "Juil.",
    8: "Août",
    9: "Sept.",
    10: "Oct.",
    11: "Nov.",
    12: "Déc.",
  };

  SeasonPropertyBlock({super.key, required this.title, required this.seasons});

  bool _isMonthInsideSeason(int month, Season season) {
    return season.startMonth <= month && season.endMonth >= month;
  }

  bool _isMonthInsideAnySeason(int month) {
    bool isInside = false;
    for (var season in seasons) {
      if (_isMonthInsideSeason(month, season)) {
        isInside = true;
      }
    }
    return isInside;
  }

  List<Container> getMonthsWidgets() {
    // Get the current date and time
    DateTime now = DateTime.now();

    // Extract the current month (from 1 to 12)
    int currentMonth = now.month;

    return months.entries.map((entry) {
      return Container(
          padding: const EdgeInsets.all(5),
          decoration: BoxDecoration(
            border: Border.all(
                color: currentMonth == entry.key ? Colors.red : Colors.black),
            color:
                _isMonthInsideAnySeason(entry.key) ? Colors.green : Colors.grey,
          ),
          alignment: Alignment.center,
          child: Text(entry.value));
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Padding(
          padding: const EdgeInsetsDirectional.only(bottom: 5),
          child: Text(title,
              style:
                  const TextStyle(fontSize: 16, fontWeight: FontWeight.w500))),
      SizedBox(
          height: 150,
          width: 180,
          child: GridView(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 4, crossAxisSpacing: 2, mainAxisSpacing: 2),
              children: getMonthsWidgets())),
    ]);
  }
}
