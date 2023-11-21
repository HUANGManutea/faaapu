'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Database } from "../../../types/supabase";
import LoadingSpinner from "../components/loading-spinner";
import PaginationView from "../components/pagination-view";
import { ItemRange } from "../model/item-range";
import { Guide } from "../model/guide";
import { countNbGuides, getRangeGuides } from "../db/guide-repository";
import GuideTable from "./guide-table";

export default function GuidesComponent() {
  const [loading, setLoading] = useState(true);
  const [initCalled, setInitCalled] = useState(false);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [nbGuides, setNbGuides] = useState<number | null>(null);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  
  const init = async () => {
    const nbGuides = await countNbGuides(supabase);
    setNbGuides(nbGuides);
    const guides = await getRangeGuides(supabase, 0, 10);
    setGuides(guides);
    setLoading(false);
    setInitCalled(true);
  }

  useEffect(() => {
    if (loading && !initCalled) {
      init();
    }
  }, [loading, initCalled]);

  const onPaginationClick = async (index: number, range: ItemRange) => {
    await fetchPlants(range);
  }

  const onSelectItemsPerPageChange = async (value: number, range: ItemRange) => {
    await fetchPlants(range);
  }

  const fetchPlants = async (range: ItemRange) => {
    const plants = await getRangeGuides(supabase, range.start, range.end);
    setGuides(plants);
  }

  const onCreateGuide = () => {
    router.push(`/guides/create`);
  }

  if (loading) {
    return <LoadingSpinner />;
  }
  

  return (
    <div className="flex flex-col w-full h-full gap-5">
      <div className="flex flex-row w-full justify-between">
        <h1>Guides</h1>
        <button className="btn btn-primary" onClick={() => onCreateGuide()}>Créer un guide</button>
      </div>
      <PaginationView
      count={nbGuides}
      onPaginationClick={(index, range) => onPaginationClick(index, range)}
      onSelectItemsPerPageChange={(value, range) => onSelectItemsPerPageChange(value, range)}>
          <GuideTable guides={guides}></GuideTable>
      </PaginationView>
    </div>
  );
}