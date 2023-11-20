import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";
import { Property, SimpleProperty } from "../model/property";
import { Season } from "../model/season";

export type PropertyTableName = 'growth' | 'foliage' | 'shape' | 'water' | 'lifespan' | 'difficulty' | 'light' | 'type' | 'usage' | 'planting_method' | 'soil_humidity' | 'soil_ph' | 'soil_type';
export type SeasonTablename = 'plant_bloom_season' | 'plant_harvest_season' | 'plant_prune_season' | 'plant_planting_season';

function getDeletedItems(fromArray: number[], toArray: number[]) {
  return fromArray.filter(i => !toArray.includes(i));
}

export async function getFamilies(supabase: SupabaseClient<Database>): Promise<SimpleProperty[]> {
  try {
    const result = await supabase.from('family').select('id, name');
    if (result.error) {
      console.error("error getFamilies: ", result.error);
      return [];
    }
    return result.data.map(e => ({
      id: e.id,
      name: e.name
    }));
  } catch (error) {
    console.error("error getFamilies: ", error);
    return [];
  }
}

export async function getSimplePropertyList(supabase: SupabaseClient<Database>, tablename: PropertyTableName): Promise<SimpleProperty[]> {
  const result = await supabase.from(tablename).select('id, name');
  if (result.error) {
    console.error("error getSimplePropertyList: ", result.error);
    return [];
  }
  return result.data.map(e => ({
    id: e.id,
    name: e.name
  }));
}

export async function getAllPropertyList(supabase: SupabaseClient<Database>): Promise<Property[]> {
  const result = await supabase.from('properties').select('id, name, tablename');
  if (result.error) {
    console.error("error getSimplePropertyList: ", result.error);
    return [];
  }
  return result.data.map(e => ({
    id: e.id!,
    name: e.name!,
    tablename: e.tablename!
  }));
}

export async function getSeasons(supabase: SupabaseClient<Database>): Promise<Season[]> {
  const result = await supabase.from('season').select('id, start_month, end_month');
  if (result.error) {
    console.error('error getSeasons: ', result.error);
    return [];
  }
  return result.data.map(e => ({
    id: e.id,
    endMonth: e.end_month,
    startMonth: e.start_month
  }));
}

export async function createFamily(supabase: SupabaseClient<Database>, familyName: string) {
  const result = await supabase.from('family').insert({
    name: familyName
  }).select('id').single();
  if (result.error) {
    console.error('error createFamily: ', result.error);
  }
  return result.data;
}

export async function createShape(supabase: SupabaseClient<Database>, shapeName: string) {
  const result = await supabase.from('shape').insert({
    name: shapeName
  }).select('id').single();
  if (result.error) {
    console.error('error createShape: ', result.error);
  }
  return result.data;
}

export async function createType(supabase: SupabaseClient<Database>, typeName: string) {
  const result = await supabase.from('type').insert({
    name: typeName
  }).select('id').single();
  if (result.error) {
    console.error('error createType: ', result.error);
  }
  return result.data;
}

export async function createUsages(supabase: SupabaseClient<Database>, usageNames: string[]) {
  const result = await supabase.from('usage').insert(usageNames.map(u => ({ name: u }))).select('id');
  if (result.error) {
    console.error('error createUsages: ', result.error);
  }
  return result.data?.map(v => v.id);
}

export async function createSeasons(supabase: SupabaseClient<Database>, seasons: Season[]) {
  const result = await supabase.from('season').insert(seasons.map(season => ({
    end_month: season.endMonth!,
    start_month: season.startMonth!
  }))).select('id');
  if (result.error) {
    console.error('error createSeasons: ', result.error);
  }
  return result.data?.map(v => v.id);
}

export async function associateUsagesToPlant(supabase: SupabaseClient<Database>, plantId: number, ids: number[]) {
  const previousAssociationResult = await supabase.from('plant_usage').select('usage_id').eq('plant_id', plantId);
  const deletedItems = getDeletedItems((previousAssociationResult?.data || []).map(e => e.usage_id), ids);
  if (deletedItems.length > 0) {
    const deleteResult = await supabase.from('plant_usage').delete().eq('plant_id', plantId).in('usage_id', deletedItems);
    if (deleteResult.error) {
      console.log(deleteResult.error);
      return false;
    }
  }
  const result = await supabase.from('plant_usage').upsert(ids.map(id => ({ plant_id: plantId, usage_id: id })));
  if (result.error) {
    console.error('error associateUsageToPlant: ', result.error);
    return false;
  }
  return true;
}

export async function associateLightsToPlant(supabase: SupabaseClient<Database>, plantId: number, ids: number[]) {
  const previousAssociationResult = await supabase.from('plant_light').select('light_id').eq('plant_id', plantId);
  const deletedItems = getDeletedItems((previousAssociationResult?.data || []).map(e => e.light_id), ids);
  if (deletedItems.length > 0) {
    const deleteResult = await supabase.from('plant_light').delete().eq('plant_id', plantId).in('light_id', deletedItems);
    if (deleteResult.error) {
      console.error(deleteResult.error);
      return false;
    }
  }
  const result = await supabase.from('plant_light').upsert(ids.map(id => ({ plant_id: plantId, light_id: id })));
  if (result.error) {
    console.error('error associateLightsToPlant: ', result.error);
    return false;
  }
  return true;
}

export async function associatePlantingMethodsToPlant(supabase: SupabaseClient<Database>, plantId: number, ids: number[]) {
  const previousAssociationResult = await supabase.from('plant_planting_method').select('planting_method_id').eq('plant_id', plantId);
  const deletedItems = getDeletedItems((previousAssociationResult?.data || []).map(e => e.planting_method_id), ids);
  if (deletedItems.length > 0) {
    const deleteResult = await supabase.from('plant_planting_method').delete().eq('plant_id', plantId).in('planting_method_id', deletedItems);
    if (deleteResult.error) {
      console.error(deleteResult.error);
      return false;
    }
  }
  const result = await supabase.from('plant_planting_method').upsert(ids.map(id => ({ plant_id: plantId, planting_method_id: id })));
  if (result.error) {
    console.error('error associatePlantingMethodsToPlant: ', result.error);
    return false;
  }
  return true;
}

export async function associateSoilHumiditiesToPlant(supabase: SupabaseClient<Database>, plantId: number, ids: number[]) {
  const previousAssociationResult = await supabase.from('plant_soil_humidity').select('soil_humidity_id').eq('plant_id', plantId);
  const deletedItems = getDeletedItems((previousAssociationResult?.data || []).map(e => e.soil_humidity_id), ids);
  if (deletedItems.length > 0) {
    const deleteResult = await supabase.from('plant_soil_humidity').delete().eq('plant_id', plantId).in('soil_humidity_id', deletedItems);
    if (deleteResult.error) {
      console.error(deleteResult.error);
      return false;
    }
  }
  const result = await supabase.from('plant_soil_humidity').upsert(ids.map(id => ({ plant_id: plantId, soil_humidity_id: id })));
  if (result.error) {
    console.error('error associateSoilHumiditiesToPlant: ', result.error);
    return false;
  }
  return true;
}

export async function associateSoilPhsToPlant(supabase: SupabaseClient<Database>, plantId: number, ids: number[]) {
  const previousAssociationResult = await supabase.from('plant_soil_ph').select('soil_ph_id').eq('plant_id', plantId);
  const deletedItems = getDeletedItems((previousAssociationResult?.data || []).map(e => e.soil_ph_id), ids);
  if (deletedItems.length > 0) {
    const deleteResult = await supabase.from('plant_soil_ph').delete().eq('plant_id', plantId).in('soil_ph_id', deletedItems);
    if (deleteResult.error) {
      console.error(deleteResult.error);
      return false;
    }
  }
  const result = await supabase.from('plant_soil_ph').upsert(ids.map(id => ({ plant_id: plantId, soil_ph_id: id })));
  if (result.error) {
    console.error('error associateSoilPhsToPlant: ', result.error);
    return false;
  }
  return true;
}

export async function associateSoilTypesToPlant(supabase: SupabaseClient<Database>, plantId: number, ids: number[]) {
  const previousAssociationResult = await supabase.from('plant_soil_type').select('soil_type_id').eq('plant_id', plantId);
  const deletedItems = getDeletedItems((previousAssociationResult?.data || []).map(e => e.soil_type_id), ids);
  if (deletedItems.length > 0) {
    const deleteResult = await supabase.from('plant_soil_type').delete().eq('plant_id', plantId).in('soil_type_id', deletedItems);
    if (deleteResult.error) {
      console.error(deleteResult.error);
      return false;
    }
  }
  const result = await supabase.from('plant_soil_type').upsert(ids.map(id => ({ plant_id: plantId, soil_type_id: id })));
  if (result.error) {
    console.error('error associateSoilTypesToPlant: ', result.error);
    return false;
  }
  return true;
}

export async function associateSeasonsToPlant(supabase: SupabaseClient<Database>, plantId: number, ids: number[], seasonTablename: SeasonTablename) {
  const previousAssociationResult = await supabase.from(seasonTablename).select('season_id').eq('plant_id', plantId);
  const deletedItems = getDeletedItems((previousAssociationResult?.data || []).map(e => e.season_id), ids);
  if (deletedItems.length > 0) {
    const deleteResult = await supabase.from(seasonTablename).delete().eq('plant_id', plantId).in('season_id', deletedItems);
    if (deleteResult.error) {
      console.error(deleteResult.error);
      return false;
    }
  }
  const result = await supabase.from(seasonTablename).upsert(ids.map(id => ({ plant_id: plantId, season_id: id })));
  if (result.error) {
    console.error(`error associateSeasonsToPlant on ${seasonTablename}: `, result.error);
    return false;
  }
  return true;
}