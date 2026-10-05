import type { Metadata } from "next";
import { KIDS_ONLY, SITE_URL, SITE_NAME, kidsMetadata, jsonLdString } from "@/lib/kids/seo";
import { ClassChallenge } from "@/components/kids/layout/class-challenge";

export const metadata: Metadata = KIDS_ONLY
  ? kidsMetadata(
      "Sfida di classe: quiz a squadre sull'intelligenza artificiale",
      "Quiz a squadre per la LIM sull'uso corretto dell'IA: prompt, allucinazioni, privacy, deepfake, stereotipi e truffe. Gratuito, senza registrazione.",
      "/kids/sfida"
    )
  : { title: "Class challenge" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "Sfida di classe sull'intelligenza artificiale",
  description: "Quiz a squadre per la LIM sull'uso corretto dell'IA.",
  inLanguage: "it",
  educationalLevel: "Scuola secondaria di primo grado",
  isAccessibleForFree: true,
  url: `${SITE_URL}/kids/sfida`,
  isPartOf: { "@type": "Course", name: SITE_NAME, url: `${SITE_URL}/kids` },
};

export default function ChallengePage() {
  return (
    <>
      {KIDS_ONLY && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />}
      <ClassChallenge />
    </>
  );
}
