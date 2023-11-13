"use client";

import { useState } from "react";

export type CreatePlantProps = {
  lights: {
    created_at: string;
    description: string | null;
    id: number;
    name: string;
  }[],
  waters: {
    created_at: string;
    description: string | null;
    id: number;
    name: string;
  }[],
  families: {
    created_at: string;
    id: number;
    name: string;
  }[],
  seasons: {
    created_at: string;
    end_month: number;
    id: number;
    start_month: number;
  }[]
}

export default function CreatePlant(props: CreatePlantProps) {
  const [name, setName] = useState("");
  return (
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Créer une plante</h2>
    <input
      name="name"
      type="text"
      placeholder="Nom"
      className="input input-bordered w-full max-w-xs"
      onChange={(e) => setName(e.target.value)}
      value={name}/>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Créer</button>
    </div>
  </div>
</div>
  );
}