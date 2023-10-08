import 'package:faaapu/model/zone.dart';
import 'package:faaapu/supabase/db.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ZoneCubit extends Cubit<List<Zone>> {
  ZoneCubit(): super([]);

  void fetchZonesWithPlants() async {
    var zones = await supabase.from('zone').select<List<Map<String, dynamic>>>(
        '''id, name, plants:plant!zone_plant(
        id,
        name,
        image_url,
        low_height,
        high_height,
        low_width,
        high_width,
        scientific_name,
        family(name),
        growth(name),
        foliage(name),
        shape(name),
        water(name),
        lifespan(name),
        difficulty(name),
        type(name),
        usage(name),
        light(name)
    )''').withConverter((zones) => zones.map((zone) => Zone.fromJson(zone)).toList());

    // get the plant image
    for (var zone in zones) {
      for (var plant in zone.plants) {
        final imageUrl =
        supabase.storage.from('plants').getPublicUrl(plant.imageUrl);
        plant.imageUrl = imageUrl;
      }
    }

    emit(zones);
  }

}