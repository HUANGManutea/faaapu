import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../types/supabase";
import { consolidatePlantWithContent, getPlant } from "@/app/db/plant-repository";
import { useParams } from 'next/navigation';
import UpsertPlantFormContainer from "@/app/components/upsert-plant-form-container";
import { cookies } from "next/headers";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import LoadingSpinner from "@/app/components/loading-spinner";

export default async function PlantDetails({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  if (!params.id || Array.isArray(params.id)) {
    return <div>Error getting plant id</div>;
  }
  const plant = await getPlant(supabase, Number(params.id));
  if (plant) {
    await consolidatePlantWithContent(supabase, plant);
  }

  if (!plant) {
    return <LoadingSpinner />;
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar prevRoute={{href: "/plants", label: "Plantes"}}></Navbar>
      <div className="flex h-full flex-col items-center p-10">
        <div className="flex flex-row w-full justify-between">
          <h1>Modifier une plante</h1>
          <div></div>
        </div>
        <UpsertPlantFormContainer plant={plant}></UpsertPlantFormContainer>
      </div>
    </main>
  );
}