'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Plant } from "../model/plant"
import { PlantUpsertDto } from "../model/plant-upsert-dto";
import Select, { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types/supabase";
import Image from 'next/image';
import { getFamilies } from "../db/family-repository";


type UpsertPlantFormProps = {
  plant?: Plant,
  onSubmit: (plant: PlantUpsertDto) => void
}

interface Option {
  label: string,
  value: string
}

export default function UpsertPlantForm({ plant, onSubmit }: UpsertPlantFormProps) {
  const [loading, setLoading] = useState(true);
  const [initCalled, setInitCalled] = useState(false);
  const [name, setName] = useState(plant?.name ?? '');
  const [scientificName, setScientificName] = useState(plant?.scientificName ?? '');
  const [family, setFamily] = useState(plant?.family ?? '');
  const [imageUrl, setImageUrl] = useState(plant?.imageUrl ?? '');
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [familyOptions, setFamilyOptions] = useState<Option[]>([]);
  const supabase = createClientComponentClient<Database>();

  const init = async () => {
    const families = await getFamilies(supabase);
    setFamilyOptions(families.map((name) => {return {label: name, value: name}}));
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
      family: family,
      // growthId: 0,
      // foliageId: 0,
      // shapeId: 0,
      // waterId: 0,
      // lifespanId: 0,
      // difficultyId: 0,
      // typeId: 0,
    };
    if (uploadedImage) {
      dto.image = uploadedImage;
    } else {
      dto.imageUrl = plant?.imageUrl
    }
    onSubmit(dto);
  }

  const onFamilyChange = (option: SingleValue<Option>) => {
    if (option) {
      setFamily(option.value);
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

  return (
    <form className="flex flex-col h-full w-full justify-center items-center" method="POST" onSubmit={(e) => handleSubmit(e)}>
      <div className="grid grid-cols-2 gap-5">
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
          </label>
          <CreatableSelect options={familyOptions} onChange={onFamilyChange} />
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
      </div>
      <input type="submit" className="btn btn-primary" value={plant ? 'Modifier' : 'Créer'}/>
    </form>
  );
}