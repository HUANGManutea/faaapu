import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../types/supabase";
import PlantTable from "../components/plant-table";
import { getRangePlants } from "../db/plant-repository";
import PlantsComponent from "../components/plants-component";
import Navbar from "../components/navbar";

export default async function PlantPage() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar></Navbar>
      <div className="flex h-full flex-col items-center p-10">
        <PlantsComponent></PlantsComponent>
      </div>
    </main>
  );
}