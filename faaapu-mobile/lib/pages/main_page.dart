import 'package:auto_route/auto_route.dart';
import 'package:faaapu/router/app_router.gr.dart';
import 'package:flutter/material.dart';

@RoutePage()
class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  MainPageState createState() => MainPageState();
}

class MainPageState extends State<MainPage> {

  @override
  void initState() {
    super.initState();
  }

  void _onItemTapped(int index, TabsRouter tabsRouter) {
    // Check if the tapped item is the drawer item
    if (index == 3) {
      // Logic to open the bottom drawer
      showModalBottomSheet(
        context: context,
        builder: (BuildContext context) {
          // Return the widget for the bottom drawer here
          return Container(
            height: 200,
            color: Colors.white,
            child: const Center(
              child: Text("Your bottom drawer content here"),
            ),
          );
        },
      );
    } else {
      // Normal navigation
      tabsRouter.setActiveIndex(index);
    }
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
            onTap: (value) => _onItemTapped(value, tabsRouter),
            selectedItemColor: Colors.blue,
            unselectedItemColor: Colors.grey,
            items: const [
              BottomNavigationBarItem(icon: Icon(Icons.home), label: "Mes fa'a'apu"),
              BottomNavigationBarItem(
                  icon: Icon(Icons.search), label: "Encyclopédie"),
              BottomNavigationBarItem(
                  icon: Icon(Icons.account_circle_outlined), label: "Compte"),
              BottomNavigationBarItem(
                  icon: Icon(Icons.menu), label: "Menu"),
            ],
          ),
        );
      },
    );
  }
}
