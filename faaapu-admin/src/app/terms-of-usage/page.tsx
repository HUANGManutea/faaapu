import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function TermsOfUsage() {
  const content = `
  # Conditions d'Utilisation

Dernière mise à jour : 19/11/2023

Bienvenue sur le site web et l'application mobile de Fa'a'apu. En utilisant nos services, vous acceptez de vous conformer aux conditions d'utilisation énoncées ci-dessous. Veuillez les lire attentivement.

## 1. Utilisation du Contenu

### 1.1. Le contenu

Le contenu de ce site web et de l'application mobile est fourni à titre informatif uniquement. Fa'a'apu ne garantit ni n'approuve l'exactitude, l'exhaustivité ou la pertinence des informations fournies.

### 1.2. Votre utilisation

Vous pouvez utiliser le contenu à des fins personnelles, éducatives ou professionnelles, mais vous ne pouvez pas le reproduire, le distribuer, le publier ou l'utiliser à des fins commerciales sans l'autorisation préalable de Fa'a'apu.

## 2. Responsabilité

### 2.1. Dommages potentiels

Fa'a'apu décline toute responsabilité quant aux dommages ou préjudices pouvant résulter de l'utilisation des informations disponibles sur ce site web ou l'application mobile.

### 2.2. Utilisation à vos risques

Vous utilisez les informations fournies par Fa'a'apu à vos propres risques. Nous vous encourageons à consulter des professionnels qualifiés avant de prendre des décisions basées sur ces informations.

## 3. Collecte de Données

### 3.1. Vos données

Lorsque vous utilisez notre site web ou notre application mobile, nous pouvons collecter des données personnelles conformément à notre Politique de Confidentialité.

## 4. Modifications des Conditions d'Utilisation

### 4.1. Modifications

Fa'a'apu se réserve le droit de modifier ces conditions d'utilisation à tout moment. Les modifications seront publiées sur cette page, et il vous incombe de les consulter régulièrement.

## 5. Contact

### 5.1. Questions et préoccupations

Pour toute question ou préoccupation concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante : [Adresse de contact].
  `;
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="hero h-[640px]" style={{ backgroundImage: 'url(/images/hero-faaapu.webp)' }}></div>

      <div className="section-container gap-5">
        <div>
          <Link href={"/"}>{`< Acceuil`}</Link>
        </div>
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </main>
  );
}