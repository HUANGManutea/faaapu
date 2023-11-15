import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

interface SortableSearchableTableHeaderProps {
  columnLabel: string;
  columnKey: string;
  currentSortColumn: string | null;
  sortOrder: 'asc' | 'desc';
  onClick: (column: string) => void;
  onSearch?: (column: string, searchValue: string) => void;
}

export default function SortableSearchableTableHeader({
  columnLabel,
  columnKey,
  currentSortColumn,
  sortOrder,
  onClick,
  onSearch
}: SortableSearchableTableHeaderProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const isSorting = columnKey === currentSortColumn;

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(columnKey, searchValue);
    }
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  return (
    <th>
      <div className='flex flex-row items-center gap-2'>
        {columnLabel}
        <button onClick={() => onClick(columnKey)}>
          {isSorting && (
            <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
          )}
          {!isSorting && (
            <FontAwesomeIcon icon={faSort} />
          )}
        </button>
        {onSearch ? <input className='input input-bordered input-sm' placeholder='Recherche' onKeyDown={(e) => onSearchKeyDown(e)} onChange={(e) => onSearchChange(e)}></input> : <></>}
      </div>
    </th>
  );
}