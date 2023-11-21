import Navbar from "@/app/components/navbar";
import UpsertPlantFormContainer from "@/app/components/upsert-plant/upsert-plant-form-container";
import AlertProvider from "@/app/providers/alert-provider";

export default function CreatePlant() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar prevRoute={{ href: "/plants", label: "Plantes" }}></Navbar>
      <div className="flex h-full flex-col items-center p-10">
        <AlertProvider>
          <h1>Créer une plante</h1>
          <UpsertPlantFormContainer></UpsertPlantFormContainer>
        </AlertProvider>
      </div>
    </main>
  );
}