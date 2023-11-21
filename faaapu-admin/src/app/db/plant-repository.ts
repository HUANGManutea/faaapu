import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";
import { Plant } from "../model/plant";
import { Season } from "../model/season";
import { PlantUpsertDto } from "../model/plant-upsert-dto";
import { associateLightsToPlant, associatePlantingMethodsToPlant, associateSeasonsToPlant, associateSoilHumiditiesToPlant, associateSoilPhsToPlant, associateSoilTypesToPlant, associateUsagesToPlant } from "./property-repository";

export async function countNbPlants(supabase: SupabaseClient<Database>): Promise<number | null> {
  const { count, error } = await supabase.from('plant').select('*', {count: 'exact', head: true});
  if (error) {
    console.log(error);
    return null;
  } else {
    return count;
  }
}

async function consolidatePlantWithImage(supabase: SupabaseClient<Database>, plant: Plant) {
  const imageUrl = supabase.storage
      .from('plants')
      .getPublicUrl(`images/${plant.imageUrl}`);
  plant.imageUrl = imageUrl.data.publicUrl;
}

export async function deleteImage(supabase: SupabaseClient<Database>, imageUrl: string): Promise<boolean> {
  const result = await supabase.storage
      .from('plants')
      .remove([`images/${imageUrl}`]);
  if (result.error) {
    console.error(`failed to delete image ${imageUrl}`);
  }
  return result.error == null;
}

export async function uploadImage(supabase: SupabaseClient<Database>, file: File): Promise<string> {
  const result = await supabase.storage
      .from('plants')
      .upload(`images/${file.name}`, file);
  if (result.error) {
    console.error(`failed to create image ${file.name}`);
    return '';
  }
  return file.name;
}

export async function uploadContent(supabase: SupabaseClient<Database>, content: string, filename: string, isUpload: boolean): Promise<string> {
  const blob = new Blob([content as BlobPart], { type: "text/markdown" });
  const file = new File([blob], filename, { type: "text/markdown" });
  const result = await supabase.storage
      .from('plants')
      .upload(`contents/${filename}`, file, {
        upsert: isUpload
      });
  if (result.error) {
    console.error(`failed to create content ${file.name}`);
    return '';
  }
  return file.name;
}

export async function deleteContent(supabase: SupabaseClient<Database>, filename: string): Promise<boolean> {
  const result = await supabase.storage
      .from('plants')
      .remove([`contents/${filename}`]);
  if (result.error) {
    console.error(`failed to delete content ${filename}`);
  }
  return result.error == null;
}

export async function consolidatePlantWithContent(supabase: SupabaseClient<Database>, plant: Plant) {
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
  bloomSeasons:season!plant_bloom_season(id, start_month,end_month),
  harvestSeasons:season!plant_harvest_season(id, start_month,end_month),
  pruneSeasons:season!plant_prune_season(id, start_month,end_month),
  plantingMethods:planting_method!plant_planting_method(name),
  plantingSeasons:season!plant_planting_season(id, start_month,end_month),
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
      bloomSeasons: data.bloomSeasons.map((e) => { const transformed: Season = { id:e.id, endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
      harvestSeasons: data.harvestSeasons.map((e) => { const transformed: Season = { id:e.id, endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
      pruneSeasons: data.pruneSeasons.map((e) => { const transformed: Season = { id:e.id, endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
      plantingSeasons: data.plantingSeasons.map((e) => { const transformed: Season = { id:e.id, endMonth: e.end_month, startMonth: e.start_month }; return transformed; }),
      usages: data.usage.map((e) => e.name),
      lights: data.light.map((e) => e.name),
      plantingMethods: data.plantingMethods.map((e) => e.name),
      soilHumidities: data.soilHumidities.map((e) => e.name),
      soilPhs: data.plantingMethods.map((e) => e.name),
      soilTypes: data.plantingMethods.map((e) => e.name),
      contentUrl: data.content_url
    }

    await consolidatePlantWithImage(supabase, plant);
  };

  
  return plant;
}

export async function upsertPlant(supabase: SupabaseClient<Database>, dto: PlantUpsertDto): Promise<boolean> {
  // upsert plant
  const upsertResult = await supabase.from('plant').upsert({
    id: dto.id,
    name: dto.name,
    scientific_name: dto.scientificName,
    image_url: dto.imageUrl,
    family_id: dto.familyId,
    growth_id: dto.growthId,
    foliage_id: dto.foliageId,
    shape_id: dto.shapeId,
    water_id: dto.waterId,
    lifespan_id: dto.lifespanId,
    difficulty_id: dto.difficultyId,
    type_id: dto.typeId,
    low_height: dto.lowWidth,
    high_height: dto.highHeight,
    low_width: dto.lowWidth,
    high_width: dto.highWidth,
    content_url: dto.contentUrl
  }).select('id').single();
  if (upsertResult.data) {
    let resultAssociation = true;
    if (dto.usageIds.length > 0) {
      resultAssociation = resultAssociation && await associateUsagesToPlant(supabase, upsertResult.data.id, dto.usageIds);
    }
    if (resultAssociation && dto.lightIds.length > 0) {
      resultAssociation = resultAssociation && await associateLightsToPlant(supabase, upsertResult.data.id, dto.lightIds);
    }
    if (resultAssociation && dto.plantingMethodIds.length > 0) {
      resultAssociation = resultAssociation && await associatePlantingMethodsToPlant(supabase, upsertResult.data.id, dto.plantingMethodIds);
    }
    if (resultAssociation && dto.soilHumiditieIds.length > 0) {
      resultAssociation = resultAssociation && await associateSoilHumiditiesToPlant(supabase, upsertResult.data.id, dto.soilHumiditieIds);
    }
    if (resultAssociation && dto.soilPhIds.length > 0) {
      resultAssociation = resultAssociation && await associateSoilPhsToPlant(supabase, upsertResult.data.id, dto.soilPhIds);
    }
    if (resultAssociation && dto.soilTypeIds.length > 0) {
      resultAssociation = resultAssociation && await associateSoilTypesToPlant(supabase, upsertResult.data.id, dto.soilTypeIds);
    }
    if (resultAssociation && dto.soilTypeIds.length > 0) {
      resultAssociation = resultAssociation && await associateSoilTypesToPlant(supabase, upsertResult.data.id, dto.soilTypeIds);
    }
    if (resultAssociation && dto.bloomSeasonIds.length > 0) {
      resultAssociation = resultAssociation && await associateSeasonsToPlant(supabase, upsertResult.data.id, dto.bloomSeasonIds, 'plant_bloom_season');
    }
    if (resultAssociation && dto.harvestSeasonIds.length > 0) {
      resultAssociation = resultAssociation && await associateSeasonsToPlant(supabase, upsertResult.data.id, dto.harvestSeasonIds, 'plant_harvest_season');
    }
    if (resultAssociation && dto.pruneSeasonIds.length > 0) {
      resultAssociation = resultAssociation && await associateSeasonsToPlant(supabase, upsertResult.data.id, dto.pruneSeasonIds, 'plant_prune_season');
    }
    if (resultAssociation && dto.plantingSeasonIds.length > 0) {
      resultAssociation = resultAssociation && await associateSeasonsToPlant(supabase, upsertResult.data.id, dto.plantingSeasonIds, 'plant_planting_season');
    }
    return resultAssociation;
  } else {
    console.error(upsertResult.error);
    return false;
  }
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
  
      await consolidatePlantWithImage(supabase, plant);
      plants.push(plant);
    }
  };

  return plants;
}