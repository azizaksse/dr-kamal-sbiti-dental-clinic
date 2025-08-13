export const metadata = { title: "Politique de confidentialité" };

import type { ReactElement } from "react";

export default function PrivacyPage(): ReactElement {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 prose prose-neutral">
      <h1>Politique de confidentialité</h1>
      <p>
        Nous respectons votre vie privée. Les informations soumises via le formulaire de contact sont utilisées
        uniquement pour répondre à votre demande. Aucune donnée n’est revendue à des tiers.
      </p>
      <h2>Données collectées</h2>
      <ul>
        <li>Nom, email, téléphone (facultatif)</li>
        <li>Lieu de prise en charge, destination, date/heure</li>
        <li>Message libre</li>
      </ul>
      <h2>Conservation</h2>
      <p>Les données sont conservées le temps nécessaire au traitement de votre demande et à son suivi.</p>
      <h2>Contact</h2>
      <p>Pour toute question liée à vos données personnelles, contactez‑nous via la page Contact.</p>
    </div>
  );
}


