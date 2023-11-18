abstract class BaseCacheData {
  final DateTime expirationDate;
  const BaseCacheData({required this.expirationDate});

  Map<String, dynamic> toJson() => {
    'expirationDate': expirationDate.toIso8601String()
  };
}