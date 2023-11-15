import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";

export async function getUsages(supabase: SupabaseClient<Database>): Promise<string[]> {
  const result = await supabase.from('usage').select('*');
  if (result.error) {
    console.log("error getUsages: ", result.error);
    return [];
  }
  return result.data.map(e => e.name);
}