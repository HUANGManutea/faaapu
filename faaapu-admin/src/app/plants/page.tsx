import PlantsComponent from "./plants-component";
import Navbar from "../components/navbar";

export default async function PlantPage() {
  return (
    <main className="flex min-h-screen flex-col">
    <Navbar prevRoute={{ href: "/home", label: "Accueil" }}></Navbar>
      <div className="flex h-full flex-col items-center p-10">
        <PlantsComponent></PlantsComponent>
      </div>
    </main>
  );
}