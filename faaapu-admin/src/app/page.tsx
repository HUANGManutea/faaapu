import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../../types/supabase"
import { cookies } from "next/headers"
import PlantTable from "./plants/plant-table";
import { getRangePlants } from "./db/plant-repository";
import Image from 'next/image';
import Link from "next/link";
import HomeSection from "./components/home-section";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const plants = await getRangePlants(supabase, 0, 10);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="hero h-[640px]" style={{ backgroundImage: 'url(/images/hero-faaapu.webp)' }}>
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">Fa'a'apu</h1>
            <Link href={"/login"} className="btn btn-primary">Voir les plantes</Link>
            <p className="py-6">Une encyclopédie collaborative pour les habitants de la Polynésie-Française, les agriculteurs, les jardiniers et les voyageurs curieux.</p>
            <p className="py-6">Découvrez la beauté et la richesse de la flore locale et apprenez comment tirer le meilleur parti de ces plantes dans votre vie quotidienne.</p>
          </div>
        </div>
      </div>
      <div className="section-container">
        <HomeSection imgSrc="/images/home-jardinage.webp" imgAlt="jardinage" leftToRight>
          <h2>Jardinage en Polynésie</h2>
          <p>Explorez des conseils pratiques et des astuces de jardinage spécifiques au Fenua.</p>
          <p>Découvrez les meilleures pratiques pour cultiver des plantes locales, créer de magnifiques jardins et embellir votre espace extérieur.</p>
        </HomeSection>
        <HomeSection imgSrc="/images/home/home-agriculteur.webp" imgAlt="agriculture" leftToRight={false}>
          <h2>Plantes utiles pour les agriculteurs</h2>
          <p>Découvrez les plantes qui peuvent améliorer votre agriculture en Polynésie-Française.</p>
          <p>Apprenez comment les agriculteurs locaux tirent parti de la flore pour nourrir le Fenua et soutenir leur économie.</p>
        </HomeSection>
        <HomeSection imgSrc="/images/home/home-flore.webp" imgAlt="flore locale" leftToRight>
          <h2>Découvrez la Flore Locale</h2>
          <p>Explorez la diversité de la flore de la Polynésie-Française.</p>
          <p>Découvrez des plantes uniques, des arbres majestueux aux fleurs exotiques, et apprenez-en davantage sur leur utilisation traditionnelle, leurs propriétés médicinales et leur importance culturelle.</p>
        </HomeSection>
        <HomeSection imgSrc="/images/home/home-resource.webp" imgAlt="ressources" leftToRight={false}>
          <h2>Ressources Utiles</h2>
          <p>Trouvez des ressources pratiques pour entretenir votre jardin, cultiver des plantes locales et découvrir la flore de la région.</p>
          <p>Consultez nos guides, nos recommandations de livres et nos informations utiles pour mieux connaître la nature polynésienne.</p>
        </HomeSection>
        <HomeSection imgSrc="/images/home/home-share.webp" imgAlt="partage" leftToRight>
        <h2>Partagez Vos Connaissances</h2>
          <p>Via votre espace utilisateur, nous vous encourageons à partager vos connaissances, vos expériences et vos histoires sur la flore de la Polynésie-Française.</p>
          <p>Contribuez à enrichir notre encyclopédie en partageant vos observations, vos photos et vos conseils pour que d'autres puissent en bénéficier.</p>
          <p>Ce contenu met en avant la valeur pratique de l'encyclopédie pour les Polynésiens, les agriculteurs et les touristes, en mettant l'accent sur l'utilisation des plantes locales dans divers contextes, de l'entretien du jardin à l'exploration de la nature.</p>
        </HomeSection>
        <section>
          
        </section>
      </div>



    </main>
  )
}
