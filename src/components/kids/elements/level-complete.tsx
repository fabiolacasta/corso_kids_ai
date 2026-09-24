"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { completeLevel, getLevelProgress } from "@/lib/kids/progress";
import { getAdjacentLevels, getLevelBySlug, getAllLevels, worlds } from "@/lib/kids/levels";
import { analyticsKids } from "@/lib/analytics";
import { PixelRobot, PixelStar } from "./pixel-art";

interface LevelCompleteProps {
  levelSlug: string;
  stars?: number;
  message?: string;
}

export function LevelComplete({ 
  levelSlug, 
  stars = 3,
  message = "You did it!"
}: LevelCompleteProps) {
  const t = useTranslations("kids");
  const [showConfetti, setShowConfetti] = useState(false);
  const [savedStars, setSavedStars] = useState(0);
  const [worldMedal, setWorldMedal] = useState<number | null>(null);
  const [allDone, setAllDone] = useState(false);
  const { next } = getAdjacentLevels(levelSlug);

  useEffect(() => {
    const existingProgress = getLevelProgress(levelSlug);
    const existingStars = existingProgress?.stars || 0;
    
    if (stars > existingStars) {
      completeLevel(levelSlug, stars);
      setShowConfetti(true);
      
      // Track level completion
      const level = getLevelBySlug(levelSlug);
      if (level) {
        analyticsKids.completeLevel(levelSlug, level.world, stars);
      }
    }
    
    setSavedStars(Math.max(stars, existingStars));

    // Medal when this level completes its whole world; certificate when the course is done
    const level = getLevelBySlug(levelSlug);
    const world = worlds.find((w) => w.number === level?.world);
    if (world && world.levels.every((l) => l.slug === levelSlug || getLevelProgress(l.slug)?.completed)) {
      setWorldMedal(world.number);
    }
    setAllDone(getAllLevels().every((l) => l.slug === levelSlug || getLevelProgress(l.slug)?.completed));
    
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [levelSlug, stars]);

  return (
    <div className="my-8 relative">
      {/* Confetti falling over the whole screen */}
      {showConfetti && (
        <div className="pointer-events-none" aria-hidden="true">
          {Array.from({ length: 36 }).map((_, i) => (
            <span
              key={i}
              className="kids-confetti"
              style={{
                left: `${(i * 37) % 100}%`,
                background: CONFETTI[i % CONFETTI.length],
                animationDuration: `${2.2 + (i % 5) * 0.35}s`,
                animationDelay: `${(i % 9) * 0.12}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="pixel-panel pixel-panel-green overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <PixelRobot className="w-16 h-20 animate-bounce-slow" />
          </div>
          
          <h2 className="text-4xl font-bold mb-3 text-[#2C1810] pixel-text-shadow">
            {t("levelComplete.title")}
          </h2>
          <p className="text-xl text-[#5D4037] m-0">{message}</p>
        </div>

        {/* Pixel Stars */}
        <div className="flex justify-center gap-3 pb-6">
          {[1, 2, 3].map((star) => (
            <div
              key={star}
              className={cn(
                star <= savedStars ? "kids-pop" : "scale-75 opacity-30"
              )}
              style={{ animationDelay: `${0.2 + star * 0.25}s` }}
            >
              <PixelStar filled={star <= savedStars} className="w-12 h-12" />
            </div>
          ))}
        </div>

        {/* World medal */}
        {worldMedal !== null && (
          <div className="mx-4 mb-5 p-4 bg-[#2C1810] border-4 border-[#FFD700] text-center kids-pop" style={{ animationDelay: "1s" }}>
            <div className="relative inline-block">
              <PixelMedal className="w-20 h-24 mx-auto" />
              <span className="absolute inset-0 kids-medal-shine" aria-hidden="true" />
            </div>
            <p className="m-0 mt-2 text-2xl font-bold text-[#FFD700] font-pixel">{t("levelComplete.medalTitle")}</p>
            <p className="m-0 text-lg text-white">{t("levelComplete.medalText", { world: t(`worlds.${worldMedal}.title`) })}</p>
          </div>
        )}

        {allDone && (
          <div className="mx-4 mb-5 text-center">
            <Link href="/kids/attestato" className="pixel-btn pixel-btn-purple px-6 py-3 text-xl inline-block">
              🎓 {t("levelComplete.certificate")}
            </Link>
          </div>
        )}

        {/* Actions - pixel style */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center p-4 bg-[#4A3728] border-t-4 border-[#8B4513]">
          {next ? (
            <Link 
              href={`/kids/level/${next.slug}`}
              className="pixel-btn pixel-btn-green px-8 py-3 text-xl text-center"
            >
              <span className="flex items-center justify-center gap-2">
                {t("levelComplete.nextLevel")}
                <PixelArrowRight />
              </span>
            </Link>
          ) : (
            <Link 
              href="/kids/map"
              className="pixel-btn pixel-btn-green px-8 py-3 text-xl text-center"
            >
              {t("levelComplete.allDone")}
            </Link>
          )}
          
          <Link 
            href="/kids/map"
            className="pixel-btn pixel-btn-amber px-8 py-3 text-xl text-center"
          >
            <span className="flex items-center justify-center gap-2">
              <PixelMapIcon />
              {t("levelComplete.backToMap")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

const CONFETTI = ["#FFD700", "#3B82F6", "#F97316", "#A855F7", "#22C55E", "#EC4899", "#FFFFFF"];

function PixelMedal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: "pixelated" }} shapeRendering="crispEdges" aria-hidden="true">
      <rect x="3" y="0" width="4" height="8" fill="#2563EB" />
      <rect x="9" y="0" width="4" height="8" fill="#DC2626" />
      <rect x="5" y="7" width="6" height="2" fill="#B45309" />
      <rect x="4" y="9" width="8" height="2" fill="#F59E0B" />
      <rect x="2" y="11" width="12" height="6" fill="#FBBF24" />
      <rect x="4" y="17" width="8" height="2" fill="#F59E0B" />
      <rect x="3" y="10" width="10" height="1" fill="#FDE68A" />
      <rect x="7" y="12" width="2" height="1" fill="#B45309" />
      <rect x="6" y="13" width="4" height="1" fill="#B45309" />
      <rect x="5" y="14" width="6" height="1" fill="#B45309" />
      <rect x="6" y="15" width="1" height="1" fill="#B45309" />
      <rect x="9" y="15" width="1" height="1" fill="#B45309" />
    </svg>
  );
}

function PixelArrowRight() {
  return (
    <svg viewBox="0 0 12 12" className="w-4 h-4" style={{ imageRendering: "pixelated" }}>
      <rect x="2" y="5" width="6" height="2" fill="currentColor" />
      <rect x="8" y="5" width="2" height="2" fill="currentColor" />
      <rect x="6" y="3" width="2" height="2" fill="currentColor" />
      <rect x="6" y="7" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelMapIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4" style={{ imageRendering: "pixelated" }}>
      {/* Pin head - circle */}
      <rect x="5" y="1" width="6" height="2" fill="currentColor" />
      <rect x="4" y="2" width="8" height="2" fill="currentColor" />
      <rect x="3" y="3" width="10" height="4" fill="currentColor" />
      <rect x="4" y="7" width="8" height="2" fill="currentColor" />
      <rect x="5" y="9" width="6" height="2" fill="currentColor" />
      {/* Pin point */}
      <rect x="6" y="11" width="4" height="2" fill="currentColor" />
      <rect x="7" y="13" width="2" height="2" fill="currentColor" />
      {/* Inner highlight */}
      <rect x="5" y="4" width="2" height="2" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}
