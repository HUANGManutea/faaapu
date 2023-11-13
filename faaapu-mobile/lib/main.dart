import 'dart:io';

import 'package:faaapu/config/faaapu_config.dart';
import 'package:faaapu/data/plant_search_repository.dart';
import 'package:faaapu/router/app_router.dart';
import 'package:faaapu/state/light_cubit.dart';
import 'package:faaapu/state/plant_search/plant_search_bloc.dart';
import 'package:faaapu/state/plant_search/plant_search_event.dart';
import 'package:faaapu/state/usage_cubit.dart';
import 'package:faaapu/state/water_cubit.dart';
import 'package:faaapu/state/zone_cubit.dart';
import 'package:faaapu/supabase/db.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'dart:developer';

import 'package:flutter_native_splash/flutter_native_splash.dart';

Future<void> main() async {
  const supabaseUrl =
      String.fromEnvironment('supabaseUrl', defaultValue: 'error');
  const supabaseAnonKey =
      String.fromEnvironment('supabaseAnonKey', defaultValue: 'error');
  if (supabaseUrl == "error" || supabaseAnonKey == "error") {
    log('supabaseUrl or supabaseAnonKey not defined');
    exit(0);
  } else {
    log('env file loaded');
  }

  FaaapuConfig config =
      FaaapuConfig(supabaseAnonKey: supabaseAnonKey, supabaseUrl: supabaseUrl);
  await initialize(config);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    AppRouter appRouter = AppRouter();
    return BlocProvider<PlantSearchBloc>(create: (context) {
      return PlantSearchBloc(plantSearchRepository: PlantSearchRepository())..add(PlantSearchLoaded());
    }, child: MultiBlocProvider(
        providers: [
          BlocProvider<ZoneCubit>(
              create: (context) => ZoneCubit()..fetchZonesWithPlants()),
          BlocProvider<LightCubit>(
              create: (context) => LightCubit()..fetchLights()),
          BlocProvider<WaterCubit>(
              create: (context) => WaterCubit()..fetchWaters()),
          BlocProvider<UsageCubit>(
              create: (context) => UsageCubit()..fetchUsages()),
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
