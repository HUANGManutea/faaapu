import 'package:connectivity_plus/connectivity_plus.dart';

abstract class BaseRepository {
  final String key;

  BaseRepository({required this.key});

  Future<bool> isConnected() async {
    // Check for internet connection
    final connectivityResult = await Connectivity().checkConnectivity();
    return ((connectivityResult == ConnectivityResult.ethernet) ||
        (connectivityResult == ConnectivityResult.mobile) ||
        (connectivityResult == ConnectivityResult.vpn) ||
        (connectivityResult == ConnectivityResult.wifi));
  }
}