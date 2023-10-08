import 'dart:convert';

class Profile {
  int id;
  String username;
  String? avatarUrl;

  Profile({required this.id, required this.username, this.avatarUrl});

  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(id: json['id'], username: json['username'], avatarUrl: json['avatar_url']);
  }


  Map<String, dynamic> toJson() => {
    "id": id,
    "username": username,
    "avatar_url": avatarUrl
  };

  @override
  String toString() {
    return jsonEncode(toJson());
  }
}