'use client';

import { ChangeEvent, ReactNode, useState } from "react";
import { ItemRange } from "../model/item-range";
import Pagination from "./pagination";

type PaginationViewProps = {
  count: number | null,
  onPaginationClick: (index: number, range: ItemRange) => void,
  onSelectItemsPerPageChange: (value: number, range: ItemRange) => void,
  children: ReactNode
}


interface Option {
  name: string,
  value: string
}

export default function PaginationView(props: PaginationViewProps) {
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const itemsPerPageOptions: Option[] = [20, 50, 100].map((value) => {
    return {
      name: `${value}`,
      value: `${value}`
    }
  })

  const pageToRange = (page: number, itemsPerPage: number) => {
    const range: ItemRange = {
      start: page * itemsPerPage,
      end: (page + 1) * itemsPerPage
    }
    return range;
  }

  const onPaginationClick = async (index: number) => {
    setPage(index);
    const range = pageToRange(index, itemsPerPage);
    props.onPaginationClick(index, range);
  }

  const onSelectItemsPerPageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);
    const range = pageToRange(page, newItemsPerPage);
    props.onSelectItemsPerPageChange(newItemsPerPage, range);
  }

  if (props.count == null) {
    return <p>Chargement...</p>;
  }

  if (props.count === 0) {
    return <p>Aucun élément à afficher</p>;
  }


  return (
    <div className="flex flex-col w-full h-full gap-5">
      <div className="flex flex-row justify-end">
        <div className="form-control max-w-xs">
          <label className="label">
            <span className="label-text">Quantité par page</span>
          </label>
          <select className="select select-bordered" onChange={(e) => onSelectItemsPerPageChange(e)}>
            {itemsPerPageOptions.map((opt) => <option key={`itemsPerPageOption-${opt.name}`} value={opt.value}>{opt.name}</option>)}
          </select>
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        {props.children}
      </div>
      <div className="flex flex-row justify-center">
        <Pagination count={props.count} page={page} itemsPerPage={itemsPerPage} onPaginationClick={(index) => onPaginationClick(index)} />
      </div>
    </div>
  );
}