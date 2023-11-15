'use client';
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../types/supabase";
import { getPlant } from "@/app/db/plant-repository";
import { useParams } from 'next/navigation';
import UpsertPlantForm from "@/app/components/upsert-plant-form";
import { PlantUpsertDto } from "@/app/model/plant-upsert-dto";
import { useEffect, useState } from "react";
import { Plant } from "@/app/model/plant";

export default function PlantDetails() {
  const [loading, setLoading] = useState(true);
  const [initCalled, setInitCalled] = useState(false);
  const [plant, setPlant] = useState<Plant>();

  const supabase = createClientComponentClient<Database>();
  const params = useParams();

  if (!params.id || Array.isArray(params.id)) {
    return <div>Error getting plant id</div>;
  }

  const init = async () => {
    console.log('init', params.id);
    const plantResult = await getPlant(supabase, Number(params.id));
    if(plantResult) {
      setPlant(plantResult);
    }
    setLoading(false);
    setInitCalled(true);
  }

  useEffect(() => {
    if (loading && !initCalled) {
      init();
    }
  }, [loading, initCalled])

  const onSubmit = async (dto: PlantUpsertDto) => {
    
    console.log(dto);
  }

  if (!plant) {
    return <p>Chargement</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1>Modifier une plante</h1>
      <UpsertPlantForm onSubmit={onSubmit} plant={plant}></UpsertPlantForm>
    </main>
  );
}