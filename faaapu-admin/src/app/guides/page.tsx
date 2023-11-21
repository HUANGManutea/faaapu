import Navbar from "../components/navbar";
import GuidesComponent from "./guides-component";

export default async function Guides() {
  return (
    <main className="flex min-h-screen flex-col">
    <Navbar prevRoute={{ href: "/home", label: "Accueil" }}></Navbar>
      <div className="flex h-full flex-col items-center p-10">
        <GuidesComponent></GuidesComponent>
      </div>
    </main>
  );
}