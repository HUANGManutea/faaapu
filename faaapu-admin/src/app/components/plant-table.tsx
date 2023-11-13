'use client';
import { useRouter } from "next/navigation";
import { Plant } from "../model/plant"
import Image from 'next/image';


export type PlantTableProps = {
  plants: Plant[],
}

export default function PlantTable(props: PlantTableProps) {
  const router = useRouter();
  const viewPlantDetails = (plant: Plant) => {
    router.push(`/plant/${plant.id}`);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Image</th>
          <th>Name</th>
          <th>Scientific Name</th>
          <th>Family</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.plants.map((plant) => <tr key={`row-plant-${plant.id}`}>
          <td>{plant.id}</td>
          <td><Image src={plant.imageUrl} alt={`image-${plant.name}`} width={200} height={200}></Image></td>
          <td>{plant.name}</td>
          <td>{plant.scientificName}</td>
          <td>{plant.family?.name}</td>
          <td><button className="btn btn-primary" onClick={() => viewPlantDetails(plant)}>Détails</button></td>
        </tr>)}
      </tbody>
    </table>
  );
}