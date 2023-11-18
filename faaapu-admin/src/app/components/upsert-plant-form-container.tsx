import { cookies } from "next/headers";
import { Database } from "../../../types/supabase";
import { PropertyTableName, getAllPropertyList, getFamilies, getSeasons } from "../db/property-repository";
import { Plant } from "../model/plant";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Property, SimpleProperty } from "../model/property";
import { IntOption, StringOption } from "../model/option";
import UpsertPlantForm from "./upsert-plant-form";

type UpsertPlantFormContainerProps = {
  plant?: Plant;
}

export default async function UpsertPlantFormContainer({ plant }: UpsertPlantFormContainerProps) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const familiesToStringOptions = (families: SimpleProperty[]): IntOption[] => {
    return families.map((f: SimpleProperty) => ({
      label: f.name,
      value: f.id
    }));
  }

  const propertiesToIntOptions = (properties: Property[], tablename: PropertyTableName): IntOption[] => {
    return properties.filter(p => p.tablename === tablename).map((sp: SimpleProperty) => ({
      label: sp.name,
      value: sp.id
    }));
  }

  const familyOptions = familiesToStringOptions(await getFamilies(supabase));

  const properties: Property[] = await getAllPropertyList(supabase);

  const growthOptions = propertiesToIntOptions(properties, 'growth');
  const foliageOptions = propertiesToIntOptions(properties, 'foliage');
  const shapeOptions = propertiesToIntOptions(properties, 'shape');
  const waterOptions = propertiesToIntOptions(properties, 'water');
  const lifespanOptions = propertiesToIntOptions(properties, 'lifespan');
  const difficultyOptions = propertiesToIntOptions(properties, 'difficulty');
  const typeOptions = propertiesToIntOptions(properties, 'type');
  const usageOptions = propertiesToIntOptions(properties, 'usage');
  const lightOptions = propertiesToIntOptions(properties, 'light');
  const plantingMethodOptions = propertiesToIntOptions(properties, 'planting_method');
  const soilHumiditiesOptions = propertiesToIntOptions(properties, 'soil_humidity');
  const soilPhOptions = propertiesToIntOptions(properties, 'soil_ph');
  const soilTypeOptions = propertiesToIntOptions(properties, 'soil_type');
  const seasons = await getSeasons(supabase);

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
      usageOptions={usageOptions}
      lightOptions={lightOptions}
      plantingMethodOptions={plantingMethodOptions}
      soilHumiditiesOptions={soilHumiditiesOptions}
      soilPhOptions={soilPhOptions}
      soilTypeOptions={soilTypeOptions}
      seasons={seasons}
      ></UpsertPlantForm>
  );
}