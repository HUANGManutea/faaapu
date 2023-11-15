import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";

export async function getWaters(supabase: SupabaseClient<Database>): Promise<string[]> {
  const result = await supabase.from('water').select('*');
  if (result.error) {
    console.log("error getWaters: ", result.error);
    return [];
  }
  return result.data.map(e => e.name);
}