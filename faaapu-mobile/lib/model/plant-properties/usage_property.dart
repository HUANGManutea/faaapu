import 'package:faaapu/model/plant-properties/simple_property.dart';

class UsageProperty extends SimpleProperty {
  UsageProperty({
    required int id,
    required String name,
    String? description,
  }) : super(id: id, name: name, description: description);

  factory UsageProperty.fromJson(Map<String, dynamic> json) {
    return UsageProperty(
      id: json['id'],
      name: json['name'],
      description: json['description'],
    );
  }
}
