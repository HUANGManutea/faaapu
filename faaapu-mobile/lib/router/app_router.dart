import 'package:auto_route/auto_route.dart';
import 'package:faaapu/router/auth_guard.dart';

import 'app_router.gr.dart';


@AutoRouterConfig()
class AppRouter extends $AppRouter {
  @override
  List<AutoRoute> get routes => [

        AutoRoute(
          page: LoginRoute.page,
          initial: true,
          path: "/login",
          children: [
            RedirectRoute(path: '*', redirectTo: ''),
          ]
        ),
        AutoRoute(page: MainRoute.page, children: [
          AutoRoute(page: HomeRoute.page, guards: [AuthGuard()]),
          AutoRoute(page: AccountRoute.page, guards: [AuthGuard()]),
          AutoRoute(page: SearchRoute.page, guards: [AuthGuard()]),
        ]),
    AutoRoute(page: PlantDetailsRoute.page, path: '/plants/:id')
      ];
}
