'use client';
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../types/supabase";
import { getPlant } from "@/app/db/faaapu";
import { useParams } from 'next/navigation';

export default async function PlantDetails() {
  const supabase = createClientComponentClient<Database>();
  const params = useParams();

  if (!params.id || Array.isArray(params.id)) {
    return <div>Error getting plant id</div>;
  }

  const plant = await getPlant(supabase, Number(params.id));

  if (!plant) {
    return <div>Error fetching plant</div>;
  }

  return (
  <div>
    {plant.name}
  </div>
  );
}