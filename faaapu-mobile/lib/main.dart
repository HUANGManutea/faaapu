import 'dart:io';

import 'package:faaapu/config/faaapu_config.dart';
import 'package:faaapu/data/light_repository.dart';
import 'package:faaapu/data/plant_repository.dart';
import 'package:faaapu/data/usage_repository.dart';
import 'package:faaapu/data/water_repository.dart';
import 'package:faaapu/data/zone_repository.dart';
import 'package:faaapu/router/app_router.dart';
import 'package:faaapu/state/light_cubit.dart';
import 'package:faaapu/state/plant_search/plant_bloc.dart';
import 'package:faaapu/state/plant_search/plant_event.dart';
import 'package:faaapu/state/usage_cubit.dart';
import 'package:faaapu/state/water_cubit.dart';
import 'package:faaapu/state/zone/zone_bloc.dart';
import 'package:faaapu/state/zone/zone_event.dart';
import 'package:faaapu/supabase/db.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'dart:developer';

Future<void> main() async {
  const supabaseUrl =
      String.fromEnvironment('supabaseUrl', defaultValue: 'error');
  const supabaseAnonKey =
      String.fromEnvironment('supabaseAnonKey', defaultValue: 'error');
  var nbDaysCache = int.parse(const String.fromEnvironment('nbDaysCache', defaultValue: '0'));
  if (supabaseUrl == "error" || supabaseAnonKey == "error") {
    log('supabaseUrl or supabaseAnonKey not defined');
    exit(0);
  } else {
    log('env file loaded');
  }

  FaaapuConfig config =
      FaaapuConfig(supabaseAnonKey: supabaseAnonKey, supabaseUrl: supabaseUrl,nbDaysCache: nbDaysCache);
  await initialize(config);
  runApp(MyApp(config: config));
}

class MyApp extends StatelessWidget {
  final FaaapuConfig config;

  const MyApp({super.key, required this.config});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    AppRouter appRouter = AppRouter();
    return BlocProvider<PlantBloc>(
        create: (context) {
          return PlantBloc(plantRepository: PlantRepository(nbDaysCache: config.nbDaysCache))
            ..add(PlantsLoaded());
        },
        child: MultiBlocProvider(
            providers: [
              BlocProvider<ZoneBloc>(create: (context) {
                return ZoneBloc(zoneRepository: ZoneRepository(nbDaysCache: config.nbDaysCache))
                  ..add(ZonesLoaded());
              }),
              BlocProvider<LightCubit>(
                  create: (context) => LightCubit(lightRepository: LightRepository(nbDaysCache: config.nbDaysCache))..fetchLights()),
              BlocProvider<WaterCubit>(
                  create: (context) => WaterCubit(waterRepository: WaterRepository(nbDaysCache: config.nbDaysCache))..fetchWaters()),
              BlocProvider<UsageCubit>(
                  create: (context) => UsageCubit(usageRepository: UsageRepository(nbDaysCache: config.nbDaysCache))..fetchUsages()),
            ],
            child: MaterialApp.router(
              title: "Fa'a'apu",
              theme: ThemeData.light().copyWith(
                primaryColor: Colors.green,
                textButtonTheme: TextButtonThemeData(
                  style: TextButton.styleFrom(
                    foregroundColor: Colors.green,
                  ),
                ),
                elevatedButtonTheme: ElevatedButtonThemeData(
                  style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.white,
                    backgroundColor: Colors.green,
                  ),
                ),
              ),
              routerConfig: appRouter.config(),
            )));
  }
}
