import { ProgressMap } from "@/components/kids/elements/progress-map";
import type { Metadata } from "next";
import { KIDS_ONLY, kidsMetadata, MAP_TITLE, MAP_DESCRIPTION, mapJsonLd, jsonLdString } from "@/lib/kids/seo";

export const metadata: Metadata = KIDS_ONLY
  ? kidsMetadata(MAP_TITLE, MAP_DESCRIPTION, "/kids/map")
  : {
      title: "World Map | Learn Prompting for Kids",
      description: "Choose your adventure! Pick a level and start learning how to talk to AI.",
    };

export default async function KidsMapPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {KIDS_ONLY && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(mapJsonLd()) }} />
      )}
      <ProgressMap />
    </div>
  );
}
