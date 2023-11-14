import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class WidgetPropertyBlock extends StatelessWidget {
  final String title;
  final String? property;
  final List<String>? properties;

  final Map<String, Widget> propToWidget = {
    "comestible": const Icon(
      Icons.restaurant,
      color: Colors.green,
      size: 24.0,
      semanticLabel: 'comestible',
    ),
    "médicinal": const Icon(
      Icons.medication,
      color: Colors.green,
      size: 24.0,
      semanticLabel: 'médicinal',
    ),
    "parfumerie": const FaIcon(FontAwesomeIcons.sprayCanSparkles,
        color: Colors.green, size: 18.0, semanticLabel: "parfumerie"),
    "facile": const Row(children: [
      Icon(
        Icons.star,
        color: Colors.green,
        size: 24.0,
        semanticLabel: 'difficulté facile',
      ),
      Icon(
        Icons.star_border,
        color: Colors.green,
        size: 24.0,
        semanticLabel: '',
      ),
      Icon(
        Icons.star_border,
        color: Colors.green,
        size: 24.0,
        semanticLabel: '',
      ),
    ]),
    "moyen": const Row(children: [
      Icon(
        Icons.star,
        color: Colors.green,
        size: 24.0,
        semanticLabel: '',
      ),
      Icon(
        Icons.star,
        color: Colors.green,
        size: 24.0,
        semanticLabel: 'difficulté moyenne',
      ),
      Icon(
        Icons.star_border,
        color: Colors.green,
        size: 24.0,
        semanticLabel: '',
      )
    ]),
    "difficile": const Row(children: [
      Icon(
        Icons.star,
        color: Colors.green,
        size: 24.0,
        semanticLabel: '',
      ),
      Icon(
        Icons.star,
        color: Colors.green,
        size: 24.0,
        semanticLabel: '',
      ),
      Icon(
        Icons.star,
        color: Colors.green,
        size: 24.0,
        semanticLabel: 'difficulté difficile',
      )
    ]),
    "faible": const Row(children: [
      Icon(
        Icons.water_drop,
        color: Colors.green,
        size: 24.0,
        semanticLabel: 'besoin en eau faible',
      ),
      Icon(
        Icons.water_drop_outlined,
        color: Colors.green,
        size: 24.0,
        semanticLabel: '',
      ),
      Icon(
        Icons.water_drop_outlined,
        color: Colors.green,
        size: 24.0,
        semanticLabel: '',
      )
    ]),
    "modéré": const Row(children: [
      Icon(
        Icons.water_drop,
        color: Colors.green,
        size: 24.0,
        semanticLabel: '',
      ),
      Icon(
        Icons.water_drop,
        color: Colors.green,
        size: 24.0,
        semanticLabel: 'besoin en eau modéré',
      ),
      Icon(
        Icons.water_drop_outlined,
        color: Colors.green,
        size: 24.0,
        semanticLabel: '',
      )
    ]),
    "important": const Row(children: [
      Icon(
        Icons.water_drop,
        color: Colors.green,
        size: 24.0,
        semanticLabel: '',
      ),
      Icon(
        Icons.water_drop,
        color: Colors.green,
        size: 24.0,
        semanticLabel: '',
      ),
      Icon(
        Icons.water_drop,
        color: Colors.green,
        size: 24.0,
        semanticLabel: 'besoin en eau important',
      )
    ]),
    "soleil": const FaIcon(FontAwesomeIcons.sun,
        color: Colors.green, size: 18.0, semanticLabel: "soleil"),
    "mi-ombre": const FaIcon(FontAwesomeIcons.cloudSun,
        color: Colors.green, size: 18.0, semanticLabel: "mi-ombre"),
    "ombre": const FaIcon(FontAwesomeIcons.cloud,
        color: Colors.green, size: 18.0, semanticLabel: "ombre"),
  };

  Widget _getWidgetFromProp(String prop) {
    if (propToWidget[prop] != null) {
      return propToWidget[prop]!;
    }
    return Text(prop);
  }

  WidgetPropertyBlock(
      {super.key, required this.title, this.property, this.properties});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
            padding: const EdgeInsetsDirectional.only(bottom: 5),
            child: Text(title,
                style: const TextStyle(
                    fontSize: 16, fontWeight: FontWeight.w500))),
        if (property != null)
          Wrap(children: [_getWidgetFromProp(property!)])
        else if (properties != null)
          Wrap(children: [
            for (int i = 0; i < properties!.length; i++)
              Wrap(children: [
                _getWidgetFromProp(properties![i]),
                const SizedBox(width: 5),
                if (i != properties!.length - 1)
                  const Wrap(
                      children: [
                        Text(
                          '|',
                          style: TextStyle(fontSize: 20),
                        ),
                        SizedBox(width: 5)
                      ])
              ])
          ])
      ],
    );
  }
}
