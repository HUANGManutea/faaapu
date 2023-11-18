'use client';
import { useRouter } from "next/navigation";
import { Plant } from "../model/plant"
import Image from 'next/image';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import SortableSearchableTableHeader from "./sortable-searchable-table-header";

export type PlantTableProps = {
  plants: Plant[],
}

export default function PlantTable(props: PlantTableProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // asc or desc
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(props.plants);
  const router = useRouter();

  useEffect(() => {
    if (sortColumn) {
      sortPlants();
    }
  }, [sortOrder, sortColumn]);

  const viewPlantDetails = (plant: Plant) => {
    router.push(`/plants/${plant.id}`);
  };

  const updatePlant = (plant: Plant) => {
    router.push(`/plants/${plant.id}`);
  }

  const setSortingColumn = (column: string | null) => {
    setSortColumn(column);
  };

  const handleHeaderClick = (column: string) => {
    if (sortColumn !== column) {
      setSortingColumn(column);
      setSortOrder('asc');
    } else {
      if (sortOrder === 'asc') {
        setSortingColumn(column);
        setSortOrder('desc');
      } else {
        setSortingColumn(null);
        setSortOrder('asc');
      }
    }
  };

  const sortPlants = () => {
    setFilteredPlants(props.plants.sort((a: Plant, b: Plant) => {
      // @ts-ignore
      const aValue: any = a[sortColumn];
      // @ts-ignore
      const bValue: any = b[sortColumn];
      if (sortOrder === 'asc') {
        if (typeof aValue === 'string') {
          return (bValue as string).localeCompare(aValue);
        } else {
          return (bValue as number) - (aValue as number);
        }
      } else {
        if (typeof aValue === 'string') {
          return aValue.localeCompare(bValue as string);
        } else {
          return (aValue as number) - (bValue as number);
        }
      }
    }));
  }

  const searchPlant = (column: string, searchValue: string) => {
    if (searchValue === '') {
      setFilteredPlants(props.plants);
    } else {
      const foundPlants = props.plants.filter((p: Plant) => {
        // @ts-ignore
        const value: any = p[column];
        if (typeof value === 'string') {
          return value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
        } else {
          return (value as number) === Number(searchValue);
        }
      });
      setFilteredPlants(foundPlants);
    }
    
  }


  return (
    <table className="table table-zebra">
      <thead>
        <tr>
        <SortableSearchableTableHeader
            columnLabel="Id"
            columnKey="id"
            currentSortColumn={sortColumn}
            sortOrder={sortOrder}
            onClick={handleHeaderClick}
            onSearch={searchPlant}
          />
          <th>Image</th>
          <SortableSearchableTableHeader
            columnLabel="Name"
            columnKey="name"
            currentSortColumn={sortColumn}
            sortOrder={sortOrder}
            onClick={handleHeaderClick}
            onSearch={searchPlant}
          />
          <SortableSearchableTableHeader
            columnLabel="Scientific Name"
            columnKey="scientificName"
            currentSortColumn={sortColumn}
            sortOrder={sortOrder}
            onClick={handleHeaderClick}
            onSearch={searchPlant}
          />
          <SortableSearchableTableHeader
            columnLabel="Family"
            columnKey="family"
            currentSortColumn={sortColumn}
            sortOrder={sortOrder}
            onClick={handleHeaderClick}
            onSearch={searchPlant}
          />
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredPlants.map((plant) => <tr key={`row-plant-${plant.id}`}>
          <td>{plant.id}</td>
          <td><Image src={plant.imageUrl} alt={`image-${plant.name}`} width={200} height={200}></Image></td>
          <td>{plant.name}</td>
          <td>{plant.scientificName}</td>
          <td>{plant.family}</td>
          <td>
            <div className="flex flex-row justify-between gap-5">
              <button className="btn btn-primary" onClick={() => updatePlant(plant)}>Modifier</button>
              <button className="btn btn-secondary" onClick={() => viewPlantDetails(plant)}>Voir</button>
            </div>
          </td>
        </tr>)}
      </tbody>
    </table>
  );
}