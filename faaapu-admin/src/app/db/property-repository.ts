import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";
import { Property, SimpleProperty } from "../model/property";
import { Season } from "../model/season";

export type PropertyTableName = 'growth' | 'foliage' | 'shape' | 'water' | 'lifespan' | 'difficulty' | 'light' | 'type' | 'usage' | 'planting_method' | 'soil_humidity' | 'soil_ph' | 'soil_type';

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

export async function createFamily(supabase:  SupabaseClient<Database>, familyName: string) {
  const result = await supabase.from('family').insert({
    name: familyName
  }).select('id').single();
  if (result.error) {
    console.error('error createFamily: ', result.error);
  }
  return result.data;
}

export async function createShape(supabase:  SupabaseClient<Database>, shapeName: string) {
  const result = await supabase.from('shape').insert({
    name: shapeName
  }).select('id').single();
  if (result.error) {
    console.error('error createShape: ', result.error);
  }
  return result.data;
}

export async function createType(supabase:  SupabaseClient<Database>, typeName: string) {
  const result = await supabase.from('type').insert({
    name: typeName
  }).select('id').single();
  if (result.error) {
    console.error('error createType: ', result.error);
  }
  return result.data;
}

export async function createUsages(supabase:  SupabaseClient<Database>, usageNames: string[]) {
  const result = await supabase.from('usage').insert(usageNames.map(u => ({name: u}))).select('id');
  if (result.error) {
    console.error('error createUsages: ', result.error);
  }
  return result.data?.map(v => v.id);
}

export async function createSeasons(supabase:  SupabaseClient<Database>, seasons: Season[]) {
  const result = await supabase.from('season').insert(seasons.map(season => ({
    end_month: season.endMonth!,
    start_month: season.startMonth!
  }))).select('id');
  if (result.error) {
    console.error('error createSeasons: ', result.error);
  }
  return result.data?.map(v => v.id);
}