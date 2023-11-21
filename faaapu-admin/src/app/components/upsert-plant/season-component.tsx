'use client';

import { useState } from "react";
import { Season } from "../../model/season";

type SeasonComponentProps = {
  seasons?: Season[],
  onSeasonsChanged: (seasons: Season[]) => void
}

type MonthsType = {
  [key: number]: string;
};

const months: MonthsType = {
  1: "Jan.",
  2: "Fév.",
  3: "Mars",
  4: "Avr.",
  5: "Mai",
  6: "Juin",
  7: "Juil.",
  8: "Août",
  9: "Sept.",
  10: "Oct.",
  11: "Nov.",
  12: "Déc.",
};
const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function SeasonComponent({seasons, onSeasonsChanged}: SeasonComponentProps) {
  const [workingSeason, setWorkingSeason] = useState<Season>();

  const monthNumberToString = (monthNumber: number) => {
    return months[monthNumber];
  }

  const isStartEndMonthSeason = (s: Season, monthNumber: number) => {
    return s.startMonth === monthNumber || s.endMonth === monthNumber
  }

  const isStrictInsideSeason = (s: Season, monthNumber: number) => {
    return s.startMonth && s.endMonth && monthNumber > s.startMonth && monthNumber < s.endMonth;
  }

  const getClassname = (monthNumber: number) => {
    let classname = "flex aspect-square cursor-pointer items-center justify-center border border-black";
    if (seasons) {
      if (seasons.find(s => isStartEndMonthSeason(s, monthNumber)) || (workingSeason && (isStartEndMonthSeason(workingSeason, monthNumber)))) {
        classname += ' bg-green-500';
      } else if (seasons.find(s => isStrictInsideSeason(s, monthNumber))) {
        classname += ' bg-green-300';
      }
    }
    return classname;
  }

  const handleClick = (monthNumber: number) => {
    // click on any month of an existing season
    if (seasons) {
      const existingSeason = seasons.find(s => isStartEndMonthSeason(s, monthNumber) || isStrictInsideSeason(s, monthNumber));
      if (existingSeason) {
        // case remove season
        const updatedSeasons = seasons.filter(s => s !== existingSeason);
        onSeasonsChanged(updatedSeasons);
        return;
      }
    }

    if (!workingSeason) {
      // case in progress of creating new season
      setWorkingSeason({
        id: 0,
        startMonth: monthNumber
      });
    } else {
      // new season in progress
      if (monthNumber === workingSeason.startMonth) {
        // case remove season in progress
        setWorkingSeason(undefined);
      } else {
        // case create new season
        let updatedSeasons = seasons ?? [];
        updatedSeasons.push({
          id: workingSeason.id,
          startMonth: workingSeason.startMonth,
          endMonth: monthNumber
        });
        onSeasonsChanged(updatedSeasons);
        setWorkingSeason(undefined);
      }
    }

  }

  return(
    <div className="grid grid-cols-4">
      {monthList.map((m) => <div key={`month-${m}`} className={getClassname(m)} onClick={() => handleClick(m)}><p className="text-center">{monthNumberToString(m)}</p></div>)}
    </div>
  );
}