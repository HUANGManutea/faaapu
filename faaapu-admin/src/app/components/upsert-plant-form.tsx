'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Plant } from "../model/plant"
import { PlantUpsertDto } from "../model/plant-upsert-dto";
import Select, { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types/supabase";
import Image from 'next/image';
import { IntOption, StringOption } from '../model/option';
import { SimpleProperty } from "../model/simple-property";


type UpsertPlantFormProps = {
  plant?: Plant,
  familyOptions: StringOption[],
  growthOptions: IntOption[],
  foliageOptions: IntOption[],
  shapeOptions: IntOption[],
  waterOptions: IntOption[],
  lifespanOptions: IntOption[],
  difficultyOptions: IntOption[],
  typeOptions: IntOption[]
}

export default function UpsertPlantForm({
  plant,
  familyOptions,
  growthOptions,
  foliageOptions,
  shapeOptions,
  waterOptions,
  lifespanOptions,
  difficultyOptions,
  typeOptions
}: UpsertPlantFormProps) {
  const [loading, setLoading] = useState(true);
  const [initCalled, setInitCalled] = useState(false);
  const [name, setName] = useState(plant?.name ?? '');
  const [scientificName, setScientificName] = useState(plant?.scientificName ?? '');
  const [selectedFamily, setSelectedFamily] = useState<StringOption>();
  const [imageUrl, setImageUrl] = useState(plant?.imageUrl ?? '');
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [selectedGrowth, setSelectedGrowth] = useState<IntOption>();
  const [selectedFoliage, setSelectedFoliage] = useState<IntOption>();
  const [selectedShape, setSelectedShape] = useState<IntOption>();
  const [selectedWater, setSelectedWater] = useState<IntOption>();
  const [selectedLifespan, setSelectedLifespan] = useState<IntOption>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<IntOption>();
  const [selectedType, setSelectedType] = useState<IntOption>();
  const supabase = createClientComponentClient<Database>();

  const init = async () => {
    if (plant?.family) {
      setSelectedFamily(familyOptions.find(option => option.value === plant?.family));
    }
    if (plant?.growth) {
      setSelectedGrowth(growthOptions.find(option => option.label === plant?.growth));
    }
    if (plant?.foliage) {
      setSelectedFoliage(foliageOptions.find(option => option.label === plant?.foliage));
    }
    if (plant?.shape) {
      setSelectedShape(shapeOptions.find(option => option.label === plant?.shape));
    }
    if (plant?.water) {
      setSelectedWater(waterOptions.find(option => option.label === plant?.water));
    }
    if (plant?.lifespan) {
      setSelectedLifespan(lifespanOptions.find(option => option.label === plant?.lifespan));
    }
    if (plant?.difficulty) {
      setSelectedDifficulty(difficultyOptions.find(option => option.label === plant?.difficulty));
    }
    if (plant?.type) {
      setSelectedType(typeOptions.find(option => option.label === plant?.type));
    }
    setLoading(false);
    setInitCalled(true);
  }

  useEffect(() => {
    if (loading && !initCalled) {
      init();
    }
  }, [loading, initCalled]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dto: PlantUpsertDto = {
      name: name,
      scientificName: scientificName,
      family: selectedFamily!.value,
      growthId: selectedGrowth!.value,
      foliageId: 0,
      shapeId: 0,
      waterId: 0,
      lifespanId: 0,
      difficultyId: 0,
      typeId: 0,
    };
    if (uploadedImage) {
      dto.image = uploadedImage;
    } else {
      dto.imageUrl = plant?.imageUrl
    }
    onSubmit(dto);
  }

  const onFamilyChange = (option: SingleValue<StringOption>) => {
    if (option) {
      setSelectedFamily(option);
    }
  }

  const loadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (imageUrl.startsWith('blob')) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl('');
    }
    const files = e.target.files;
    if (files && files.length > 0) {
      // get the file
      const file: File = files[0];
      setImageUrl(URL.createObjectURL(file));
      setUploadedImage(file);
    }
  }

  const onSubmit = (dto: PlantUpsertDto) => {
    // if (plant) {

    // } else {

    // }
    console.log(dto);
  }

  return (
    <form className="flex flex-col h-full w-full justify-center items-center gap-5" method="POST" onSubmit={(e) => handleSubmit(e)}>
      <div className="grid grid-cols-2 gap-2">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Nom</span>
          </label>
          <input type="text" className="input input-bordered w-full max-w-xs" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Nom scientifique</span>
          </label>
          <input type="text" className="input input-bordered w-full max-w-xs" value={scientificName} onChange={(e) => setScientificName(e.target.value)} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Famille</span>
            <span className="label-text label-text-alt text-primary">Créable</span>
          </label>
          <CreatableSelect className="leading-8" options={familyOptions} value={selectedFamily} onChange={(newValue) => setSelectedFamily(newValue ?? undefined)} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered w-full max-w-xs" onChange={loadImage} />
          </div>
          {(imageUrl && imageUrl !== '') ? <Image src={imageUrl} alt={name} width={200} height={200}></Image> : <></>}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Croissance</span>
          </label>
          <Select className="leading-8" options={growthOptions} value={selectedGrowth} onChange={(newValue) => setSelectedGrowth(newValue ?? undefined)} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Feuillage</span>
          </label>
          <Select className="leading-8" options={foliageOptions} value={selectedFoliage} onChange={(newValue) => setSelectedFoliage(newValue ?? undefined)} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Forme</span>
            <span className="label-text label-text-alt text-primary">Créable</span>
          </label>
          <CreatableSelect className="leading-8" options={shapeOptions} value={selectedShape} onChange={(newValue) => setSelectedShape(newValue ?? undefined)} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Besoin en eau</span>
          </label>
          <Select className="leading-8" options={waterOptions} value={selectedWater} onChange={(newValue) => setSelectedWater(newValue ?? undefined)} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Durée de vie</span>
          </label>
          <Select className="leading-8" options={lifespanOptions} value={selectedLifespan} onChange={(newValue) => setSelectedLifespan(newValue ?? undefined)} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Difficulté</span>
          </label>
          <Select className="leading-8" options={difficultyOptions} value={selectedDifficulty} onChange={(newValue) => setSelectedDifficulty(newValue ?? undefined)} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Type</span>
            <span className="label-text label-text-alt text-primary">Créable</span>
          </label>
          <CreatableSelect className="leading-8" options={typeOptions} value={selectedType} onChange={(newValue) => setSelectedType(newValue ?? undefined)} />
        </div>
      </div>
      <input type="submit" className="btn btn-primary" value={plant ? 'Modifier' : 'Créer'}/>
    </form>
  );
}