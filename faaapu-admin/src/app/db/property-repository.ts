import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";
import { SimpleProperty } from "../model/simple-property";

type SimplePropertyTableName = 'growth' | 'foliage' | 'shape' | 'water' | 'lifespan' | 'difficulty' | 'light' | 'type' | 'usage';

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

export async function getSimplePropertyList(supabase: SupabaseClient<Database>, tablename: SimplePropertyTableName): Promise<SimpleProperty[]> {
  const result = await supabase.from(tablename).select('*');
  if (result.error) {
    console.error("error getSimplePropertyList: ", result.error);
    return [];
  }
  return result.data.map(e => ({
    id: e.id,
    name: e.name
  }));
}

export async function getGrowths(supabase: SupabaseClient<Database>): Promise<SimpleProperty[]> {
  try {
    return await getSimplePropertyList(supabase, 'growth');
  } catch (error) {
    console.error("error getGrowths: ", error);
    return [];
  }
}

export async function getFoliages(supabase: SupabaseClient<Database>): Promise<SimpleProperty[]> {
  try {
    return await getSimplePropertyList(supabase, 'foliage');
  } catch (error) {
    console.error("error getFoliages: ", error);
    return [];

  }
}

export async function getShapes(supabase: SupabaseClient<Database>): Promise<SimpleProperty[]> {
  try {
    return await getSimplePropertyList(supabase, 'shape');
  } catch (error) {
    console.error("error getShapes: ", error);
    return [];

  }
}

export async function getWaters(supabase: SupabaseClient<Database>): Promise<SimpleProperty[]> {
  try {
    return await getSimplePropertyList(supabase, 'water');
  } catch (error) {
    console.error("error getWaters: ", error);
    return [];
  }
}

export async function getLifespans(supabase: SupabaseClient<Database>): Promise<SimpleProperty[]> {
  try {
    return await getSimplePropertyList(supabase, 'lifespan');
  } catch (error) {
    console.error("error getLifespan: ", error);
    return [];
  }
}

export async function getDifficulties(supabase: SupabaseClient<Database>): Promise<SimpleProperty[]> {
  try {
    return await getSimplePropertyList(supabase, 'difficulty');
  } catch (error) {
    console.error("error getDifficulty: ", error);
    return [];
  }
}

export async function getTypes(supabase: SupabaseClient<Database>): Promise<SimpleProperty[]> {
  try {
    return await getSimplePropertyList(supabase, 'type');
  } catch (error) {
    console.error("error getType: ", error);
    return [];
  }
}

// export async function getLights(supabase: SupabaseClient<Database>): Promise<SimpleProperty[]> {
//   try {
//     return await getSimplePropertyList(supabase, 'light');
//   } catch (error) {
//     console.error("error getLights: ", error);
//     return [];

//   }
// }

// export async function getUsages(supabase: SupabaseClient<Database>): Promise<SimpleProperty[]> {
//   try {
//     return await getSimplePropertyList(supabase, 'usage');
//   } catch (error) {
//     console.error("error getUsages: ", error);
//     return [];
//   }
// }

