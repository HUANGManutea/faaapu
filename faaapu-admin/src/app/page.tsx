import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../../types/supabase"
import { cookies } from "next/headers"
import { Plant } from "./model/plant";
import { Usage } from "./model/usage";
import { Light } from "./model/light";
import { PlantingMethod } from "./model/planting-method";
import { SoilHumidity } from "./model/soil-humidity";
import { SoilPh } from "./model/soil-ph";
import { SoilType } from "./model/soil-type";
import PlantTable from "./components/plant-table";
import { getTablePlants } from "./db/faaapu";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  let lights: {
    created_at: string;
    description: string | null;
    id: number;
    name: string;
  }[] = [];
  const getLightsResults = await supabase.from('light').select('*');
  if (getLightsResults.data) {
    lights = getLightsResults.data;
  }
  
  let waters: {
    created_at: string;
    description: string | null;
    id: number;
    name: string;
  }[] = [];
  const getWatersResults = await supabase.from('water').select('*');
  if (getWatersResults.data) {
    waters = getWatersResults.data;
  }
  
  let families: {
    created_at: string;
    id: number;
    name: string;
  }[] = [];
  const getFamiliesResults = await supabase.from('family').select('*');
  if (getFamiliesResults.data) {
    families = getFamiliesResults.data;
  }
  
  let seasons: {
    created_at: string;
    end_month: number;
    id: number;
    start_month: number;
  }[] = [];
  const getSeasonsResults = await supabase.from('season').select('*');
  if (getSeasonsResults.data) {
    seasons = getSeasonsResults.data;
  }

  const plants = await getTablePlants(supabase);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PlantTable plants={plants}></PlantTable>
    </main>
    )
  }
  