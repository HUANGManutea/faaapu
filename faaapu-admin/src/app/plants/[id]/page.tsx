import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../types/supabase";
import { consolidatePlantWithContent, getPlant } from "@/app/db/plant-repository";
import { useParams } from 'next/navigation';
import UpsertPlantFormContainer from "@/app/components/upsert-plant-form-container";
import { cookies } from "next/headers";

export default async function PlantDetails({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({cookies});

  if (!params.id || Array.isArray(params.id)) {
    return <div>Error getting plant id</div>;
  }
  const plant = await getPlant(supabase, Number(params.id));
  if (plant) {
    await consolidatePlantWithContent(supabase, plant);
  }

  if (!plant) {
    return <p>Chargement</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1>Modifier une plante</h1>
      <UpsertPlantFormContainer plant={plant}></UpsertPlantFormContainer>
    </main>
  );
}