import 'package:connectivity_plus/connectivity_plus.dart';

abstract class BaseRepository {
  final String key;
  int nbDaysCache;

  BaseRepository({required this.key, required this.nbDaysCache});

  Future<bool> isConnected() async {
    // Check for internet connection
    final connectivityResult = await Connectivity().checkConnectivity();
    return ((connectivityResult == ConnectivityResult.ethernet) ||
        (connectivityResult == ConnectivityResult.mobile) ||
        (connectivityResult == ConnectivityResult.vpn) ||
        (connectivityResult == ConnectivityResult.wifi));
  }


}