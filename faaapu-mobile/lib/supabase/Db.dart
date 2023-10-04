
import 'dart:developer';

import 'package:faaapu/config/FaaapuConfig.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

Future<void> initialize(FaaapuConfig config) async {
  log("connection to supabase");
  await Supabase.initialize(
    url: config.supabaseUrl,
    anonKey: config.supabaseAnonKey,
    authFlowType: AuthFlowType.implicit,
  );
  log("connected to supabase");
}

final supabase = Supabase.instance.client;