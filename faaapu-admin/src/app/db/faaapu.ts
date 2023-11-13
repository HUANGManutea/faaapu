import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";
import { Plant } from "../model/plant";
import { Usage } from "../model/usage";
import { Light } from "../model/light";
import { PlantingMethod } from "../model/planting-method";
import { SoilHumidity } from "../model/soil-humidity";
import { SoilPh } from "../model/soil-ph";
import { SoilType } from "../model/soil-type";
import { Season } from "../model/season";

export async function getPlant(supabase: SupabaseClient<Database>, id: number): Promise<Plant | null> {
  let plant: Plant | null = null;
  const { data } = await supabase.from('plant').select(`
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
    light(name),
    bloomSeasons:season!plant_bloom_season(start_month,end_month),
    harvestSeasons:season!plant_harvest_season(start_month,end_month),
    pruneSeasons:season!plant_prune_season(start_month,end_month),
    plantingMethods:planting_method!plant_planting_method(name),
    plantingSeasons:season!plant_planting_season(start_month,end_month),
    soil_humidity!plant_soil_humidity(name),
    soil_ph!plant_soil_ph(name),
    soil_type!plant_soil_type(name),
    description,
    plant_advice,
    maintenance_advice,
    info`).eq('id', id).single();
  if (data) {
    const imageUrlResult = supabase.storage.from('plants').getPublicUrl(data.image_url);

    plant = {
      id: data.id,
      name: data.name,
      imageUrl: imageUrlResult.data.publicUrl,
      lowHeight: data.low_height,
      highHeight: data.high_height,
      lowWidth: data.low_width,
      highWidth: data.high_width,
      scientificName: data.scientific_name,
      family: data.family ? {
        name: data.family.name
      } : null,
      growth: data.growth ? {
        name: data.growth.name
      } : null,
      foliage: data.foliage ? {
        name: data.foliage.name
      } : null,
      shape: data.shape ? {
        name: data.shape.name
      } : null,
      water: data.water ? {
        name: data.water.name
      } : null,
      lifespan: data.lifespan ? {
        name: data.lifespan.name
      } : null,
      difficulty: data.difficulty ? {
        name: data.difficulty.name
      } : null,
      type: data.type ? {
        name: data.type.name
      } : null,
      usages: data.usage.map((e) => { const transformed: Usage = { name: e.name }; return transformed; }),
      lights: data.light.map((e) => { const transformed: Light = { name: e.name }; return transformed; }),
      bloomSeasons: data.bloomSeasons.map((e) => { const transformed: Season = { endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
      harvestSeasons: data.harvestSeasons.map((e) => { const transformed: Season = { endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
      pruneSeasons: data.pruneSeasons.map((e) => { const transformed: Season = { endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
      plantingSeasons: data.plantingSeasons.map((e) => { const transformed: Season = { endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
      plantingMethods: data.plantingMethods.map((e) => { const transformed: PlantingMethod = { name: e.name }; return transformed; }),
      soilHumidities: data.soil_humidity.map((e) => { const transformed: SoilHumidity = { name: e.name }; return transformed; }),
      soilPhs: data.plantingMethods.map((e) => { const transformed: SoilPh = { name: e.name }; return transformed; }),
      soilTypes: data.plantingMethods.map((e) => { const transformed: SoilType = { name: e.name }; return transformed; }),
      description: data.description,
      plantAdvice: data.plant_advice,
      maintenanceAdvice: data.maintenance_advice,
      info: data.info
    }
  };
  return plant;
}

export async function getTablePlants(supabase: SupabaseClient<Database>): Promise<Plant[]> {
  let plants: Plant[] = [];
  const getPlantsResults = await supabase.from('plant').select(`
    id,
    name,
    image_url,
    scientific_name,
    family(name)`);
  if (getPlantsResults.data) {
    for (let plant of getPlantsResults.data) {
      if (plant) {
        const imageUrlResult = supabase.storage.from('plants').getPublicUrl(plant.image_url);

        const transformedPlant: Plant = {
          id: plant.id,
          name: plant.name,
          imageUrl: imageUrlResult.data.publicUrl,
          scientificName: plant.scientific_name,
          family: plant.family ? {
            name: plant.family.name
          } : null
        }
        plants.push(transformedPlant);
      }
    }
  }

  return plants;

}