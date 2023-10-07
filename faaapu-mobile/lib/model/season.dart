import 'dart:convert';

class Season {
  int startMonth;
  int endMonth;
  Season({required this.startMonth, required this.endMonth});

  factory Season.fromJson(Map<String, dynamic> json) {
    return Season(startMonth: json['start_month'], endMonth: json['end_month']);
  }


  Map<String, dynamic> toJson() => {
    'start_month': startMonth,
    'end_month': endMonth
  };

  @override
  String toString() {
    return jsonEncode(toJson());
  }

}