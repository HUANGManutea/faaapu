import 'package:faaapu/model/plant-properties/simple_property.dart';

class LightProperty extends SimpleProperty {
  LightProperty({
    required int id,
    required String name,
    String? description,
  }) : super(id: id, name: name, description: description);

  factory LightProperty.fromJson(Map<String, dynamic> json) {
    return LightProperty(
      id: json['id'],
      name: json['name'],
      description: json['description'],
    );
  }
}
