'use client';

import { Plant } from "../model/plant"
import { PlantUpsertDto } from "../model/plant-upsert-dto";

type UpsertPlantFormProps = {
  plant?: Plant,
  onSubmit: (plant: PlantUpsertDto) => void
}

export default function UpsertPlantForm(props: UpsertPlantFormProps) {

  const handleSubmit = () => {
    const plant: PlantUpsertDto = {
      name: "",
      scientificName: "",
      imageUrl: "",
      family: {
        name: ""
      }
    };
    props.onSubmit(plant);
  }

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-5">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Nom</span>
          </label>
          <input type="text" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Nom scientifique</span>
          </label>
          <input type="text" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Famille</span>
          </label>
          <input type="text" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
        </div>
      </div>
    </form>
  );
}