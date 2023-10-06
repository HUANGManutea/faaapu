import 'dart:convert';

abstract class SimpleProperty {
  int id;
  String name;
  String? description;

  SimpleProperty({
    required this.id,
    required this.name,
    this.description,
  });

  Map<String, dynamic> toJson() => {
    "id": id,
    "name": name,
    "description": description,
  };

  @override
  String toString() {
    return jsonEncode(toJson());
  }
}
