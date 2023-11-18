'use client';

import { useState } from "react";

export type PaginationProps = {
  count: number | null,
  page: number,
  itemsPerPage: number,
  onPaginationClick: (value: number) => void
}

export default function Pagination(props: PaginationProps) {
  const [pageElements, setElements] = useState<number[] | null>(props.count ? new Array(Math.ceil(props.count / props.itemsPerPage)).fill(0) : null);
  if (!pageElements) {
    return <></>;
  }

  const onClick = (index: number) => {
    // trigger only for non active pagination buttons
    if (index !== props.page) {
      props.onPaginationClick(index);
    }
  }

  if (!pageElements || pageElements.length === 0) {
    return <></>;
  }

  if (pageElements.length === 1) {
    // If there is only one element, return it as a button without a join group
    return (
      <button
        className={`btn ${props.page === 0 ? 'btn-active' : ''}`}
        onClick={() => onClick(0)}
      >
        1
      </button>
    );
  }
  
  return (
    <div className="join">
      {pageElements.map((e, index) =>
        <button key={`pagination-${index}`}
          className={`join-item btn ${index === props.page ? 'btn-active' : ''}`}
          onClick={() => onClick(index)}>
          {index + 1}
        </button>)
      }
    </div>
  );
}