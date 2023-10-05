abstract class SimpleProperty {
  int id;
  String name;
  String? description;

  SimpleProperty({
    required this.id,
    required this.name,
    this.description,
  });

  @override
  String toString() {
    return "{id: $id, name: $name, description: $description}";
  }
}
