import 'package:faaapu/model/plant-properties/simple_property.dart';

class WaterProperty extends SimpleProperty {
  WaterProperty({
    required int id,
    required String name,
    String? description,
  }) : super(id: id, name: name, description: description);

  factory WaterProperty.fromJson(Map<String, dynamic> json) {
    return WaterProperty(
      id: json['id'],
      name: json['name'],
      description: json['description'],
    );
  }
}
