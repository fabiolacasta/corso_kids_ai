import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getLevelBySlug, getAllLevels } from "@/lib/kids/levels";
import { LevelContentWrapper } from "@/components/kids/layout/level-content-wrapper";
import type { Metadata } from "next";
import { KIDS_ONLY, kidsMetadata, LEVEL_SEO, levelTitleIt, worldTitleIt, levelJsonLd, jsonLdString } from "@/lib/kids/seo";

interface LevelPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLevels().map((level) => ({
    slug: level.slug,
  }));
}

export async function generateMetadata({ params }: LevelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const level = getLevelBySlug(slug);

  if (!level) {
    return { title: "Level Not Found" };
  }

  if (KIDS_ONLY && LEVEL_SEO[slug]) {
    return kidsMetadata(LEVEL_SEO[slug].title, LEVEL_SEO[slug].description, `/kids/level/${slug}`);
  }

  return {
    title: `${level.title} | Learn Prompting for Kids`,
    description: level.description,
  };
}

export default async function LevelPage({ params }: LevelPageProps) {
  const { slug } = await params;
  const level = getLevelBySlug(slug);
  const locale = await getLocale();

  if (!level) {
    notFound();
  }

  // Try to load locale-specific content, fall back to English
  let Content;
  try {
    Content = (await import(`@/content/kids/${locale}/${slug}.mdx`)).default;
  } catch {
    try {
      Content = (await import(`@/content/kids/en/${slug}.mdx`)).default;
    } catch {
      Content = null;
    }
  }

  const jsonLd = KIDS_ONLY ? levelJsonLd(slug) : null;

  return (
    <>
    {KIDS_ONLY && (
      <>
        {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />}
        {/* Server-rendered heading and summary for search engines and screen readers */}
        <h1 className="sr-only">
          {levelTitleIt(slug)} – Mondo {level.world}: {worldTitleIt(level.world)}
        </h1>
        <noscript>
          <p>{LEVEL_SEO[slug]?.description}</p>
          <p><a href="/kids/insegnanti">Guida per insegnanti e elenco di tutti i livelli</a></p>
        </noscript>
      </>
    )}
    <LevelContentWrapper levelSlug={slug} levelNumber={`${level.world}-${level.levelNumber}`}>
      {Content ? <Content /> : null}
    </LevelContentWrapper>
    </>
  );
}
