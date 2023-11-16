import { cookies } from "next/headers";
import { Database } from "../../../types/supabase";
import { getDifficulties, getFamilies, getFoliages, getGrowths, getLifespans, getShapes, getTypes, getWaters } from "../db/property-repository";
import { Plant } from "../model/plant";
import { PlantUpsertDto } from "../model/plant-upsert-dto";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { SimpleProperty } from "../model/simple-property";
import { IntOption, StringOption } from "../model/option";
import UpsertPlantForm from "./upsert-plant-form";

type UpsertPlantFormContainerProps = {
  plant?: Plant;
}

export default async function UpsertPlantFormContainer({ plant }: UpsertPlantFormContainerProps) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const familiesToStringOptions = (families: string[]): StringOption[] => {
    return families.map((f: string) => ({
      label: f,
      value: f
    }));
  }

  const simplePropertyListToIntOptions = (simplePropertyList: SimpleProperty[]): IntOption[] => {
    return simplePropertyList.map((sp: SimpleProperty) => ({
      label: sp.name,
      value: sp.id
    }));
  }


  const familyOptions = familiesToStringOptions(await getFamilies(supabase));
  const growthOptions = simplePropertyListToIntOptions(await getGrowths(supabase));
  const foliageOptions = simplePropertyListToIntOptions(await getFoliages(supabase));
  const shapeOptions = simplePropertyListToIntOptions(await getShapes(supabase));
  const waterOptions = simplePropertyListToIntOptions(await getWaters(supabase));
  const lifespanOptions = simplePropertyListToIntOptions(await getLifespans(supabase));
  const difficultyOptions = simplePropertyListToIntOptions(await getDifficulties(supabase));
  const typeOptions = simplePropertyListToIntOptions(await getTypes(supabase));

  return (
    <UpsertPlantForm
      plant={plant}
      familyOptions={familyOptions}
      growthOptions={growthOptions}
      foliageOptions={foliageOptions}
      shapeOptions={shapeOptions}
      waterOptions={waterOptions}
      lifespanOptions={lifespanOptions}
      difficultyOptions={difficultyOptions}
      typeOptions={typeOptions}
      ></UpsertPlantForm>
  );
}