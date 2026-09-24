import type { Metadata } from "next";
import { KidsHomeContent } from "@/components/kids/layout/kids-home-content";
import { KIDS_ONLY, kidsMetadata, HOME_TITLE, HOME_DESCRIPTION, courseJsonLd, jsonLdString } from "@/lib/kids/seo";

export const metadata: Metadata = KIDS_ONLY
  ? kidsMetadata(HOME_TITLE, HOME_DESCRIPTION, "/kids")
  : {
      title: "Learn Prompting for Kids | prompts.chat",
      description: "A fun, game-based way for kids to learn how to talk to AI. Join Promi the robot on an adventure through Prompt Land!",
    };

export default function KidsHomePage() {
  return (
    <>
      {KIDS_ONLY && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(courseJsonLd()) }} />
      )}
      <KidsHomeContent />
    </>
  );
}
