import UpsertPlantFormContainer from "@/app/components/upsert-plant-form-container";

export default function CreatePlant({ params }: { params: { id: string } }) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
    <h1>Créer une plante</h1>
      <UpsertPlantFormContainer></UpsertPlantFormContainer>
    </main>
  );
}