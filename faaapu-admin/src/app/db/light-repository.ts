import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";

export async function getLights(supabase: SupabaseClient<Database>): Promise<string[]> {
  const result = await supabase.from('light').select('*');
  if (result.error) {
    console.log("error getLights: ", result.error);
    return [];
  }
  return result.data.map(e => e.name);
}