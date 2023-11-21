'use client';

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/loading-spinner";
import { Guide } from "../model/guide";
import SortableSearchableTableHeader from "../components/sortable-searchable-table-header";
import Image from 'next/image';

export type PlantTableProps = {
  guides: Guide[],
}

export default function PlantTable(props: PlantTableProps) {
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // asc or desc
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>(props.guides);
  const router = useRouter();

  useEffect(() => {
    if (sortColumn) {
      sortGuides();
    }
  }, [sortOrder, sortColumn]);

  const viewGuideDetails = (guide: Guide) => {
    setLoading(true);
    router.push(`/guides/${guide.id}`);
  };

  const updateGuide = (guide: Guide) => {
    setLoading(true);
    router.push(`/guides/${guide.id}`);
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

  const sortGuides = () => {
    setFilteredGuides(props.guides.sort((a: Guide, b: Guide) => {
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

  const searchGuide = (column: string, searchValue: string) => {
    if (searchValue === '') {
      setFilteredGuides(props.guides);
    } else {
      const foundElement = props.guides.filter((e: Guide) => {
        // @ts-ignore
        const value: any = e[column];
        if (typeof value === 'string') {
          return value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
        } else {
          return (value as number) === Number(searchValue);
        }
      });
      setFilteredGuides(foundElement);
    }
  }


  return (
    <>
      {loading && <LoadingSpinner />}
      <table className="table table-zebra">
        <thead>
          <tr>
            <SortableSearchableTableHeader
              columnLabel="Id"
              columnKey="id"
              currentSortColumn={sortColumn}
              sortOrder={sortOrder}
              onClick={handleHeaderClick}
              onSearch={searchGuide}
            />
            <th>Image</th>
            <SortableSearchableTableHeader
              columnLabel="Titre"
              columnKey="title"
              currentSortColumn={sortColumn}
              sortOrder={sortOrder}
              onClick={handleHeaderClick}
              onSearch={searchGuide}
            />
            <SortableSearchableTableHeader
              columnLabel="Sous-titre"
              columnKey="subtitle"
              currentSortColumn={sortColumn}
              sortOrder={sortOrder}
              onClick={handleHeaderClick}
              onSearch={searchGuide}
            />
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuides.map((guide) => <tr key={`row-guide-${guide.id}`}>
            <td>{guide.id}</td>
            <td><Image src={guide.imageUrl} alt={`image-${guide.title}`} width={200} height={200} className="rounded"></Image></td>
            <td>{guide.title}</td>
            <td>{guide.subtitle}</td>
            <td>
              <div className="flex flex-row items-center gap-5">
                <button className="btn btn-primary" onClick={() => updateGuide(guide)}>Modifier</button>
                <button className="btn btn-secondary" onClick={() => viewGuideDetails(guide)}>Voir</button>
              </div>
            </td>
          </tr>)}
        </tbody>
      </table>
    </>
  );
}