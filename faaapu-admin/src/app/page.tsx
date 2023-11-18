import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../../types/supabase"
import { cookies } from "next/headers"
import PlantTable from "./components/plant-table";
import { getRangePlants } from "./db/plant-repository";
import Image from 'next/image';
import Link from "next/link";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const plants = await getRangePlants(supabase, 0, 10);

  return (
    <main className="flex min-h-screen flex-col items-center gap-2">
      <div className="hero h-[640px]" style={{ backgroundImage: 'url(/images/hero-faaapu.webp)' }}>
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Fa'a'apu</h1>
            <Link href={"/login"} className="btn btn-primary">Connexion</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 px-60 py-20">
        <section>
          <h2>Bienvenue dans Fa'a'apu</h2>
          <p>Une encyclopédie collaborative pour les habitants de la Polynésie-Française, les agriculteurs, les jardiniers et les voyageurs curieux. Découvrez la beauté et la richesse de la flore locale et apprenez comment tirer le meilleur parti de ces plantes dans votre vie quotidienne.</p>
        </section>
        <section>
          <h2>Jardinage en Polynésie</h2>
          <p>
            Explorez des conseils pratiques et des astuces de jardinage spécifiques au Fenua. Découvrez les meilleures pratiques pour cultiver des plantes locales, créer de magnifiques jardins et embellir votre espace extérieur.
          </p>
        </section>
        <section>
          <h2>Plantes Utiles pour les Agriculteurs</h2>
          <p>
            Découvrez les plantes qui peuvent améliorer votre agriculture en Polynésie-Française. Apprenez comment les agriculteurs locaux tirent parti de la flore pour nourrir leur famille et soutenir leur économie.
          </p>
        </section>
        <section>
          <h2>Découvrez la Flore Locale</h2>
          <p>
            Explorez la diversité de la flore de la Polynésie-Française. Découvrez des plantes uniques, des arbres majestueux aux fleurs exotiques, et apprenez-en davantage sur leur utilisation traditionnelle, leurs propriétés médicinales et leur importance culturelle.
          </p>
        </section>
        <section>
          <h2>Ressources Utiles</h2>
          <p>
            Trouvez des ressources pratiques pour entretenir votre jardin, cultiver des plantes locales et découvrir la flore de la région. Consultez nos guides, nos recommandations de livres et nos informations utiles pour mieux connaître la nature polynésienne.
          </p>
        </section>
        <section>
          <h2>Partagez Vos Connaissances</h2>
          <p>
            Via votre espace utilisateur, nous vous encourageons à partager vos connaissances, vos expériences et vos histoires sur la flore de la Polynésie-Française. Contribuez à enrichir notre encyclopédie en partageant vos observations, vos photos et vos conseils pour que d'autres puissent en bénéficier.
          </p>
          <p>
            Ce contenu met en avant la valeur pratique de l'encyclopédie pour les Polynésiens, les agriculteurs et les touristes, en mettant l'accent sur l'utilisation des plantes locales dans divers contextes, de l'entretien du jardin à l'exploration de la nature.
          </p>
        </section>
      </div>



    </main>
  )
}
