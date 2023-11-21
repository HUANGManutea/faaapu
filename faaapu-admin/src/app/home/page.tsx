import Navbar from "../components/navbar";
import HomeMenuItem from "./home-menu-item";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
    <Navbar></Navbar>
    <div className="flex h-full flex-col items-center p-10">
      <h1>Accueil</h1>
      <div className="flex flex-row gap-10">
        <HomeMenuItem title="Plantes" imageSrc="/images/menu/menu-plantes.webp" href="/plants" />
        <HomeMenuItem title="Guides" imageSrc="/images/menu/menu-guides.webp" href="/guides" />
      </div>
    </div>
  </main>
  );
}