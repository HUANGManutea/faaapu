import Navbar from "@/app/components/navbar";
import UpsertPlantFormContainer from "@/app/components/upsert-plant-form-container";

export default function CreatePlant({ params }: { params: { id: string } }) {

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar prevRoute={{href: "/plants", label: "Plantes"}}></Navbar>
      <div className="flex h-full flex-col items-center p-10">
        <h1>Créer une plante</h1>
        <UpsertPlantFormContainer></UpsertPlantFormContainer>
      </div>
    </main>
  );
}