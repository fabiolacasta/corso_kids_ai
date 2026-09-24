import type { Metadata } from "next";
import { KIDS_ONLY, kidsMetadata } from "@/lib/kids/seo";
import { Certificate } from "@/components/kids/layout/certificate";

export const metadata: Metadata = KIDS_ONLY
  ? { ...kidsMetadata("Attestato del corso di intelligenza artificiale", "Stampa l'attestato di fine corso della Scuola di Prompt di Promi.", "/kids/attestato"), robots: { index: false, follow: true } }
  : { title: "Certificate", robots: { index: false } };

export default function CertificatePage() {
  return <Certificate />;
}
