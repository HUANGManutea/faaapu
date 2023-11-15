import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";

export async function getFamilies(supabase: SupabaseClient<Database>): Promise<string[]> {
  const result = await supabase.from('family').select('name');
  if (result.error) {
    console.log("error getFamilies: ", result.error);
    return [];
  }
  return result.data.map(e => e.name);
}