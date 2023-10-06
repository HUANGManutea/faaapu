import 'dart:developer';

import 'package:auto_route/auto_route.dart';
import 'package:faaapu/router/app_router.gr.dart';
import 'package:faaapu/supabase/db.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthGuard extends AutoRouteGuard {
  @override
  void onNavigation(NavigationResolver resolver, StackRouter router) {
    final session = supabase.auth.currentSession;
    if (session != null) {
      log(
        "session is not null: ${session.toString()}",
      );
      resolver.next(true);
    } else {
      log("session is null");
      router.navigate(const LoginRoute());
    }
  }
}
