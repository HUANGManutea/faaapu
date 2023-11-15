import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../types/supabase";
import PlantTable from "../components/plant-table";
import { getRangePlants } from "../db/plant-repository";
import PlantsComponent from "../components/plants-component";

export default async function PlantPage() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  
  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-10">
    <PlantsComponent></PlantsComponent>
  </main>
  );
}