import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../../types/supabase"
import { cookies } from "next/headers"
import PlantTable from "./components/plant-table";
import { getRangePlants } from "./db/plant-repository";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const plants = await getRangePlants(supabase, 0, 10);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1>Faaapu</h1>
    </main>
    )
  }
  