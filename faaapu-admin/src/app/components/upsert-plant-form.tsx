'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Plant } from "../model/plant"
import { PlantUpsertDto } from "../model/plant-upsert-dto";
import Select, { MultiValue, SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types/supabase";
import Image from 'next/image';
import { IntOption, StringOption } from '../model/option';
import { SimpleProperty } from "../model/property";
import { Season } from "../model/season";
import SeasonComponent from "./season-component";
import ContentView from "./content-view";
import { consolidatePlantWithContent } from "../db/plant-repository";


type UpsertPlantFormProps = {
  plant?: Plant,
  familyOptions: StringOption[],
  growthOptions: IntOption[],
  foliageOptions: IntOption[],
  shapeOptions: IntOption[],
  waterOptions: IntOption[],
  lifespanOptions: IntOption[],
  difficultyOptions: IntOption[],
  typeOptions: IntOption[],
  usageOptions: IntOption[],
  lightOptions: IntOption[],
  plantingMethodOptions: IntOption[],
  soilHumiditiesOptions: IntOption[],
  soilPhOptions: IntOption[],
  soilTypeOptions: IntOption[],
  seasons: Season[]
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
  typeOptions,
  usageOptions,
  lightOptions,
  plantingMethodOptions,
  soilHumiditiesOptions,
  soilPhOptions,
  soilTypeOptions,
  seasons
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
  const [selectedUsages, setSelectedUsages] = useState<IntOption[]>();
  const [selectedLights, setSelectedLights] = useState<IntOption[]>();
  const [selectedPlantingMethods, setSelectedPlantingMethods] = useState<IntOption[]>();
  const [selectedSoilHumidities, setSelectedSoilHumidities] = useState<IntOption[]>();
  const [selectedSoilPhs, setSelectedSoilPhs] = useState<IntOption[]>();
  const [selectedSoilTypes, setSelectedSoilTypes] = useState<IntOption[]>();
  const [lowHeight, setLowHeight] = useState<number>(0);
  const [highHeight, setHighHeight] = useState<number>(0);
  const [lowWidth, setLowWidth] = useState<number>(0);
  const [highWidth, setHighWidth] = useState<number>(0);
  const [bloomSeasons, setBloomSeasons] = useState<Season[]>();
  const [harvestSeasons, setHarvestSeasons] = useState<Season[]>();
  const [pruneSeasons, setPruneSeasons] = useState<Season[]>();
  const [plantingSeasons, setPlantingSeasons] = useState<Season[]>();
  const [content, setContent] = useState("");
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

    if (plant?.usages) {
      setSelectedUsages(usageOptions.filter(option => plant.usages!.find(e => e === option.label)));
    }
    if (plant?.lights) {
      setSelectedLights(lightOptions.filter(option => plant.lights!.find(e => e === option.label)));
    }
    if (plant?.plantingMethods) {
      setSelectedPlantingMethods(plantingMethodOptions.filter(option => plant.plantingMethods!.find(e => e === option.label)));
    }
    if (plant?.soilHumidities) {
      setSelectedSoilHumidities(soilHumiditiesOptions.filter(option => plant.soilHumidities!.find(e => e === option.label)));
    }
    if (plant?.soilPhs) {
      setSelectedSoilPhs(soilPhOptions.filter(option => plant.soilPhs!.find(e => e === option.label)));
    }
    if (plant?.soilTypes) {
      setSelectedSoilTypes(soilTypeOptions.filter(option => plant.soilTypes!.find(e => e === option.label)));
    }
    if (plant?.lowHeight) {
      setLowHeight(plant.lowHeight);
    }
    if (plant?.highHeight) {
      setHighHeight(plant.highHeight);
    }
    if (plant?.lowWidth) {
      setLowWidth(plant.lowWidth);
    }
    if (plant?.highWidth) {
      setHighWidth(plant.highWidth);
    }

    if (plant?.bloomSeasons) {
      setBloomSeasons(plant.bloomSeasons);
    }
    if (plant?.harvestSeasons) {
      setHarvestSeasons(plant.harvestSeasons);
    }
    if (plant?.pruneSeasons) {
      setPruneSeasons(plant.pruneSeasons);
    }
    if (plant?.plantingSeasons) {
      setPlantingSeasons(plant.plantingSeasons);
    }

    if (plant?.content) {
      setContent(plant.content);
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
      foliageId: selectedFoliage!.value,
      shapeId: selectedShape!.value,
      waterId: selectedWater!.value,
      lifespanId: selectedLifespan!.value,
      difficultyId: selectedDifficulty!.value,
      typeId: selectedType!.value,
      usageIds: selectedUsages!.map(v => v.value),
      lightIds: selectedLights!.map(v => v.value),
      plantingMethodIds: selectedPlantingMethods!.map(v => v.value),
      soilHumiditieIds: selectedSoilHumidities!.map(v => v.value),
      soilPhIds: selectedSoilPhs!.map(v => v.value),
      soilTypeIds: selectedSoilTypes!.map(v => v.value),
      bloomSeasonIds: bloomSeasons?.map(s => s.id!)
    };
    if (uploadedImage) {
      dto.image = uploadedImage;
    } else {
      dto.imageUrl = plant?.imageUrl
    }
    onSubmit(dto);
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
    <form className="flex flex-col h-full w-full gap-5" method="POST" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex flex-row flex-grow items-stretch h-full w-full gap-2">
        <div className="flex flex-col flex-1 justify-center items-center">
        <h2>Caractéristiques</h2>
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
                <span className="label-text label-text-alt text-primary">Créable, Unique</span>
              </label>
              <CreatableSelect id="family-select" instanceId="family-select" className="leading-8" options={familyOptions} value={selectedFamily} onChange={(newValue) => setSelectedFamily(newValue ?? undefined)} />
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
              <Select id="growth-select" instanceId="growth-select" className="leading-8" options={growthOptions} value={selectedGrowth} onChange={(newValue) => setSelectedGrowth(newValue ?? undefined)} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Feuillage</span>
              </label>
              <Select id="foliage-select" instanceId="foliage-select" className="leading-8" options={foliageOptions} value={selectedFoliage} onChange={(newValue) => setSelectedFoliage(newValue ?? undefined)} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Forme</span>
                <span className="label-text label-text-alt text-primary">Créable, Unique</span>
              </label>
              <CreatableSelect id="shape-select" instanceId="shape-select" className="leading-8" options={shapeOptions} value={selectedShape} onChange={(newValue) => setSelectedShape(newValue ?? undefined)} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Besoin en eau</span>
              </label>
              <Select id="water-select" instanceId="water-select" className="leading-8" options={waterOptions} value={selectedWater} onChange={(newValue) => setSelectedWater(newValue ?? undefined)} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Durée de vie</span>
              </label>
              <Select id="lifespan-select" instanceId="lifespan-select" className="leading-8" options={lifespanOptions} value={selectedLifespan} onChange={(newValue) => setSelectedLifespan(newValue ?? undefined)} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Difficulté</span>
              </label>
              <Select id="difficulty-select" instanceId="difficulty-select" className="leading-8" options={difficultyOptions} value={selectedDifficulty} onChange={(newValue) => setSelectedDifficulty(newValue ?? undefined)} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Type</span>
                <span className="label-text label-text-alt text-primary">Créable, Unique</span>
              </label>
              <CreatableSelect id="type-select" instanceId="type-select" className="leading-8" options={typeOptions} value={selectedType} onChange={(newValue) => setSelectedType(newValue ?? undefined)} />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Utilisations</span>
                <span className="label-text label-text-alt text-primary">Créable, Multiple</span>
              </label>
              <CreatableSelect id="usage-select" instanceId="usage-select" className="leading-8" options={usageOptions} value={selectedUsages} isMulti onChange={(newValue) => setSelectedUsages(newValue as IntOption[])} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Ensoleillement</span>
                <span className="label-text label-text-alt text-primary">Multiple</span>
              </label>
              <Select id="light-select" instanceId="light-select" className="leading-8" options={lightOptions} value={selectedLights} isMulti onChange={(newValue) => setSelectedLights(newValue as IntOption[])} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Plantation</span>
                <span className="label-text label-text-alt text-primary">Multiple</span>
              </label>
              <Select id="planting-methods-select" instanceId="planting-methods-select" className="leading-8" options={plantingMethodOptions} value={selectedPlantingMethods} isMulti onChange={(newValue) => setSelectedPlantingMethods(newValue as IntOption[])} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Humidité du sol</span>
                <span className="label-text label-text-alt text-primary">Multiple</span>
              </label>
              <Select id="soil-humidity-select" instanceId="soil-humidity-select" className="leading-8" options={soilHumiditiesOptions} value={selectedSoilHumidities} isMulti onChange={(newValue) => setSelectedSoilHumidities(newValue as IntOption[])} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Ph du sol</span>
                <span className="label-text label-text-alt text-primary">Multiple</span>
              </label>
              <Select id="soil-ph-select" instanceId="soil-ph-select" className="leading-8" options={soilPhOptions} value={selectedSoilPhs} isMulti onChange={(newValue) => setSelectedSoilPhs(newValue as IntOption[])} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Type de sol</span>
                <span className="label-text label-text-alt text-primary">Multiple</span>
              </label>
              <Select id="soil-type-select" instanceId="soil-type-select" className="leading-8" options={soilTypeOptions} value={selectedSoilTypes} isMulti onChange={(newValue) => setSelectedSoilTypes(newValue as IntOption[])} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Hauteur minimale à l'âge adulte (mètres)</span>
              </label>
              <input type="number" min="0" step="0.01" className="input input-bordered w-full max-w-xs" value={lowHeight} onChange={(e) => setLowHeight(Number(e.target.value))} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Hauteur maximale à l'âge adulte (mètres)</span>
              </label>
              <input type="number" min="0" step="0.01" className="input input-bordered w-full max-w-xs" value={highHeight} onChange={(e) => setHighHeight(Number(e.target.value))} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Largeur minimale à l'âge adulte (mètres)</span>
              </label>
              <input type="number" min="0" step="0.01" className="input input-bordered w-full max-w-xs" value={lowWidth} onChange={(e) => setLowWidth(Number(e.target.value))} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Largeur maximale à l'âge adulte (mètres)</span>
              </label>
              <input type="number" min="0" step="0.01" className="input input-bordered w-full max-w-xs" value={highWidth} onChange={(e) => setHighWidth(Number(e.target.value))} />
            </div>
            {/* empty div */}
            <div></div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Saisons de floraison</span>
                <span className="label-text label-text-alt text-primary">Clickable</span>
              </label>
              <SeasonComponent seasons={bloomSeasons} onSeasonsChanged={(seasons => setBloomSeasons(seasons))}></SeasonComponent>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Saisons de récolte</span>
                <span className="label-text label-text-alt text-primary">Clickable</span>
              </label>
              <SeasonComponent seasons={harvestSeasons} onSeasonsChanged={(seasons => setHarvestSeasons(seasons))}></SeasonComponent>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Saisons de taille</span>
                <span className="label-text label-text-alt text-primary">Clickable</span>
              </label>
              <SeasonComponent seasons={pruneSeasons} onSeasonsChanged={(seasons => setPruneSeasons(seasons))}></SeasonComponent>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Saisons de plantation</span>
                <span className="label-text label-text-alt text-primary">Clickable</span>
              </label>
              <SeasonComponent seasons={plantingSeasons} onSeasonsChanged={(seasons => setPlantingSeasons(seasons))}></SeasonComponent>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center">
          <h2>Contenu</h2>
          <div className="flex flex-col w-full h-full">
            <ContentView content={content} onContentChanged={(c) => setContent(c)}></ContentView>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <input type="submit" className="btn btn-primary max-w-xs" value={plant ? 'Modifier' : 'Créer'} />
      </div>
    </form>
  );
}
