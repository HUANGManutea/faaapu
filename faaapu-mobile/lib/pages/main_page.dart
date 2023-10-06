import 'package:auto_route/auto_route.dart';
import 'package:faaapu/router/app_router.gr.dart';
import 'package:flutter/material.dart';

import '../supabase/db.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  MainPageState createState() => MainPageState();
}

@RoutePage()
class MainPageState extends State<MainPage> {

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return AutoTabsRouter(
      routes: [const HomeRoute(), SearchRoute(), const AccountRoute()],
      builder: (context, child) {
        final tabsRouter = AutoTabsRouter.of(context);
        return Scaffold(
          resizeToAvoidBottomInset : false,
          body: child,
          bottomNavigationBar: BottomNavigationBar(
            currentIndex: tabsRouter.activeIndex,
            onTap: (value) => {tabsRouter.setActiveIndex(value)},
            items: const [
              BottomNavigationBarItem(icon: Icon(Icons.home), label: "Mon fa'a'apu"),
              BottomNavigationBarItem(
                  icon: Icon(Icons.search), label: "Encyclopédie"),
              BottomNavigationBarItem(
                  icon: Icon(Icons.account_circle_outlined), label: "Compte"),
            ],
          ),
        );
      },
    );

  }
}
