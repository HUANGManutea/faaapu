"use client";

import UpsertPlantForm from "@/app/components/upsert-plant-form";
import { PlantUpsertDto } from "@/app/model/plant-upsert-dto";
import { useState } from "react";

export type CreatePlantProps = {
}

export default function CreatePlant(props: CreatePlantProps) {

  const onSubmit = async (plantUpsertDto: PlantUpsertDto) => {

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
    <h1>Créer une plante</h1>
      <UpsertPlantForm onSubmit={onSubmit}></UpsertPlantForm>
    </main>
  );
}