import type { Metadata } from "next";
import { KIDS_ONLY, kidsMetadata } from "@/lib/kids/seo";
import { ClassChallenge } from "@/components/kids/layout/class-challenge";

export const metadata: Metadata = KIDS_ONLY
  ? kidsMetadata(
      "Sfida di classe: quiz a squadre sull'intelligenza artificiale",
      "Quiz a squadre per la LIM sull'uso corretto dell'IA: prompt, allucinazioni, privacy, deepfake, stereotipi e truffe. Gratuito, senza registrazione.",
      "/kids/sfida"
    )
  : { title: "Class challenge" };

export default function ChallengePage() {
  return <ClassChallenge />;
}
