abstract class BaseCacheData {
  final DateTime expirationDate;
  const BaseCacheData({required this.expirationDate});

  Map<String, dynamic> toJson();
}