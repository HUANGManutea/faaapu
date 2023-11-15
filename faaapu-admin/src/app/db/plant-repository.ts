import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";
import { Plant } from "../model/plant";
import { Season } from "../model/season";

export async function countNbPlants(supabase: SupabaseClient<Database>): Promise<number | null> {
  const { count, error } = await supabase.from('plant').select('*', {count: 'exact', head: true});
  if (error) {
    console.log(error);
    return null;
  } else {
    return count;
  }
}

async function consolidatePlant(supabase: SupabaseClient<Database>, plant: Plant) {
  const imageUrl = supabase.storage
      .from('plants')
      .getPublicUrl(`images/${plant.imageUrl}`);
  plant.imageUrl = imageUrl.data.publicUrl;
  if (plant.contentUrl != null) {
    const contentRawFile = await supabase.storage
        .from('plants')
        .download(`contents/${plant.contentUrl}`);
    if (contentRawFile.error) {
      console.log(`failed to get markdown content for plant id: ${plant.id}`);
    } else {
      plant.content = await contentRawFile.data.text();
    }
  }
}

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
  soilHumidities:soil_humidity!plant_soil_humidity(name),
  soilPhs:soil_ph!plant_soil_ph(name),
  soilTypes:soil_type!plant_soil_type(name),
  content_url`)
    .eq('id', id).single();
  if (data) {

    plant = {
      id: data.id,
      name: data.name,
      imageUrl: data.image_url,
      lowHeight: data.low_height,
      highHeight: data.high_height,
      lowWidth: data.low_width,
      highWidth: data.high_width,
      scientificName: data.scientific_name,
      family: data.family?.name,
      growth: data.growth?.name,
      foliage: data.foliage?.name,
      shape: data.shape?.name,
      water: data.water?.name,
      lifespan: data.lifespan?.name,
      difficulty: data.difficulty?.name,
      type: data.type?.name,
      bloomSeasons: data.bloomSeasons.map((e) => { const transformed: Season = { endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
      harvestSeasons: data.harvestSeasons.map((e) => { const transformed: Season = { endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
      pruneSeasons: data.pruneSeasons.map((e) => { const transformed: Season = { endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
      plantingSeasons: data.plantingSeasons.map((e) => { const transformed: Season = { endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
      usages: data.usage.map((e) => e.name),
      lights: data.light.map((e) => e.name),
      plantingMethods: data.plantingMethods.map((e) => e.name),
      soilHumidities: data.soilHumidities.map((e) => e.name),
      soilPhs: data.plantingMethods.map((e) => e.name),
      soilTypes: data.plantingMethods.map((e) => e.name),
      contentUrl: data.content_url
    }

    await consolidatePlant(supabase, plant);
  };

  
  return plant;
}

export async function getRangePlants(supabase: SupabaseClient<Database>, start: number, end: number): Promise<Plant[]> {
  let plants: Plant[] = [];
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
  soilHumidities:soil_humidity!plant_soil_humidity(name),
  soilPhs:soil_ph!plant_soil_ph(name),
  soilTypes:soil_type!plant_soil_type(name),
  content_url`).range(start, end);
  if (data) {
    for(let plantData of data) {
      let plant: Plant = {
        id: plantData.id,
        name: plantData.name,
        imageUrl: plantData.image_url,
        lowHeight: plantData.low_height,
        highHeight: plantData.high_height,
        lowWidth: plantData.low_width,
        highWidth: plantData.high_width,
        scientificName: plantData.scientific_name,
        family: plantData.family?.name,
        growth: plantData.growth?.name,
        foliage: plantData.foliage?.name,
        shape: plantData.shape?.name,
        water: plantData.water?.name,
        lifespan: plantData.lifespan?.name,
        difficulty: plantData.difficulty?.name,
        type: plantData.type?.name,
        bloomSeasons: plantData.bloomSeasons.map((e) => { const transformed: Season = { endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
        harvestSeasons: plantData.harvestSeasons.map((e) => { const transformed: Season = { endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
        pruneSeasons: plantData.pruneSeasons.map((e) => { const transformed: Season = { endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
        plantingSeasons: plantData.plantingSeasons.map((e) => { const transformed: Season = { endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
        usages: plantData.usage.map((e) => e.name),
        lights: plantData.light.map((e) => e.name),
        plantingMethods: plantData.plantingMethods.map((e) => e.name),
        soilHumidities: plantData.soilHumidities.map((e) => e.name),
        soilPhs: plantData.plantingMethods.map((e) => e.name),
        soilTypes: plantData.plantingMethods.map((e) => e.name),
        contentUrl: plantData.content_url
      }
  
      await consolidatePlant(supabase, plant);
      plants.push(plant);
    }
  };

  return plants;
}