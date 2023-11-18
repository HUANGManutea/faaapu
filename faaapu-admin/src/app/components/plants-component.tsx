'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import PlantTable from "./plant-table";
import { Database } from "../../../types/supabase";
import { countNbPlants, getRangePlants } from "../db/plant-repository";
import { ChangeEvent, useEffect, useState } from "react";
import { Plant } from "../model/plant";
import { ItemRange } from "../model/item-range";
import Pagination from "./pagination";
import PaginationView from "./pagination-view";
import { useRouter } from "next/navigation";

type PlantsComponentProps = {

};

export default function PlantsComponent(props: PlantsComponentProps) {
  const [loading, setLoading] = useState(true);
  const [initCalled, setInitCalled] = useState(false);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [nbPlants, setNbPlants] = useState<number | null>(null);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const init = async () => {
    const nbPlants = await countNbPlants(supabase);
    setNbPlants(nbPlants);
    const plants = await getRangePlants(supabase, 0, 10);
    setPlants(plants);
    setLoading(false);
    setInitCalled(true);
  }

  useEffect(() => {
    if (loading && !initCalled) {
      init();
    }
  }, [loading, initCalled]);

  if (loading) {
    return <div>Chargement</div>;
  }

  const onPaginationClick = async (index: number, range: ItemRange) => {
    await fetchPlants(range);
  }

  const onSelectItemsPerPageChange = async (value: number, range: ItemRange) => {
    await fetchPlants(range);
  }

  const fetchPlants = async (range: ItemRange) => {
    const plants = await getRangePlants(supabase, range.start, range.end);
    setPlants(plants);
  }

  const onCreatePlant = () => {
    router.push(`/plants/create`);
  }

  return (
    <div className="flex flex-col w-full h-full gap-5">
      <div className="flex flex-row w-full justify-between">
        <h1>Plantes</h1>
        <button className="btn btn-primary" onClick={() => onCreatePlant()}>Créer une plante</button>
      </div>
      <PaginationView
      count={nbPlants}
      onPaginationClick={(index, range) => onPaginationClick(index, range)}
      onSelectItemsPerPageChange={(value, range) => onSelectItemsPerPageChange(value, range)}>
          <PlantTable plants={plants}></PlantTable>
      </PaginationView>
    </div>
  );
}