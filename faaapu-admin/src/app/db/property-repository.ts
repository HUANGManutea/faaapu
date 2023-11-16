import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";
import { Property, SimpleProperty } from "../model/property";
import { Season } from "../model/season";

export type PropertyTableName = 'growth' | 'foliage' | 'shape' | 'water' | 'lifespan' | 'difficulty' | 'light' | 'type' | 'usage' | 'planting_method' | 'soil_humidity' | 'soil_ph' | 'soil_type';

export async function getFamilies(supabase: SupabaseClient<Database>): Promise<string[]> {
  try {
    const result = await supabase.from('family').select('name');
    if (result.error) {
      console.error("error getFamilies: ", result.error);
      return [];
    }
    return result.data.map(e => e.name);
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

export async function getSeasons(supabase:  SupabaseClient<Database>): Promise<Season[]> {
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