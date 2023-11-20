import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function PrivacyPolicy() {
  const content = `
  # Politique de Confidentialité

Dernière mise à jour : 19/11/2023

Chez Fa'a'apu, nous nous engageons à protéger votre vie privée et à garantir la confidentialité de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web et notre application mobile. Veuillez lire attentivement cette politique pour comprendre comment nous traitons vos données.

## 1. Informations Collectées

### 1.1. Données d'Inscription

Lorsque vous créez un compte utilisateur sur Fa'a'apu, nous collectons les informations suivantes :
- Votre pseudonyme
- Votre adresse e-mail
- Votre mot de passe (chiffré)

### 1.2. Contributions

Lorsque vous contribuez en créant ou en modifiant du contenu, nous collectons les informations que vous fournissez, y compris les données sur les plantes et guides que vous ajoutez.

### 1.3. Données de Navigation

Nous ne collectons ni vos données de navigation, ni les actions que vous effectuez sur le site web ou sur l'application mobile.

## 2. Utilisation des Données

Nous utilisons vos données personnelles aux fins suivantes :

- Vous permettre de créer et gérer votre compte utilisateur
- Vous permettre de contribuer au projet Fa'a'apu
- Vous envoyer des notifications liées à votre compte (par exemple, les rappels concernant les saisons des plantes de vos fa'a'apu)
- Répondre à vos demandes de support ou de service client
- Respecter nos obligations légales et réglementaires

## 3. Partage des Données

Nous ne partageons pas vos données personnelles avec des tiers sauf dans les cas suivants :

- Pour répondre à une obligation légale ou réglementaire
- Pour protéger nos droits, notre confidentialité, notre sécurité ou notre propriété, ainsi que ceux de nos utilisateurs et du public
- En cas de fusion, acquisition ou cession d'actifs de Fa'a'apu, vos données personnelles peuvent être transférées aux parties impliquées dans la transaction, sous réserve du respect de cette politique de confidentialité.

## 4. Sécurité des Données

Nous mettons en place des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, toute modification, toute divulgation ou toute destruction.

## 5. Vos Droits

Vous avez le droit de :

- Accéder à vos données personnelles
- Rectifier vos données personnelles inexactes
- Supprimer vos données personnelles
- Vous opposer au traitement de vos données personnelles
- Demander la portabilité de vos données personnelles
- Retirer votre consentement (le cas échéant)

Pour exercer ces droits ou poser des questions sur notre politique de confidentialité, veuillez nous contacter à l'adresse suivante : faaapu@gmail.com.

## 6. Modifications de la Politique

Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page, et la date de la dernière mise à jour sera mise à jour.

Nous vous encourageons à consulter régulièrement cette politique de confidentialité pour rester informé de la manière dont nous traitons vos données personnelles.
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