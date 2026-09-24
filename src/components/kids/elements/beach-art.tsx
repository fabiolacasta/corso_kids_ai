/**
 * Pixel-art scenery for world 6, "Spiaggia della Sicurezza" (Safety Shores):
 * sand, sea with waves, a lighthouse with a rotating beam, umbrella, lifebuoy.
 * Purely decorative (aria-hidden).
 */

const px = { imageRendering: "pixelated" as const };

export function PixelLighthouse({ className = "w-16 h-40" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 40" className={className} style={px} shapeRendering="crispEdges">
      {/* beam */}
      <polygon className="kids-lighthouse-beam" points="11,5 16,1 16,11" fill="#FFF7AE" />
      {/* lamp */}
      <rect x="5" y="2" width="6" height="2" fill="#B91C1C" />
      <rect x="4" y="4" width="8" height="3" fill="#FDE047" />
      <rect x="5" y="4" width="1" height="3" fill="#1F2937" />
      <rect x="10" y="4" width="1" height="3" fill="#1F2937" />
      <rect x="3" y="7" width="10" height="2" fill="#1F2937" />
      {/* tower with red/white stripes */}
      <rect x="5" y="9" width="6" height="6" fill="#F8FAFC" />
      <rect x="5" y="15" width="6" height="6" fill="#DC2626" />
      <rect x="4" y="21" width="8" height="6" fill="#F8FAFC" />
      <rect x="4" y="27" width="8" height="6" fill="#DC2626" />
      <rect x="3" y="33" width="10" height="5" fill="#F8FAFC" />
      <rect x="7" y="35" width="2" height="3" fill="#7C2D12" />
      <rect x="7" y="11" width="2" height="2" fill="#1E3A8A" />
      <rect x="2" y="38" width="12" height="2" fill="#78716C" />
    </svg>
  );
}

export function PixelUmbrella({ className = "w-14 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 16" className={className} style={px} shapeRendering="crispEdges">
      <rect x="3" y="1" width="8" height="1" fill="#F97316" />
      <rect x="1" y="2" width="12" height="2" fill="#F97316" />
      <rect x="0" y="4" width="14" height="2" fill="#F97316" />
      <rect x="3" y="2" width="2" height="4" fill="#FFF7ED" />
      <rect x="9" y="2" width="2" height="4" fill="#FFF7ED" />
      <rect x="6" y="6" width="2" height="10" fill="#78350F" />
    </svg>
  );
}

export function PixelLifebuoy({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 8" className={className} style={px} shapeRendering="crispEdges">
      <rect x="2" y="0" width="4" height="1" fill="#EF4444" />
      <rect x="1" y="1" width="6" height="1" fill="#FFFFFF" />
      <rect x="0" y="2" width="2" height="4" fill="#FFFFFF" />
      <rect x="6" y="2" width="2" height="4" fill="#EF4444" />
      <rect x="0" y="2" width="1" height="2" fill="#EF4444" />
      <rect x="1" y="6" width="6" height="1" fill="#EF4444" />
      <rect x="2" y="7" width="4" height="1" fill="#FFFFFF" />
    </svg>
  );
}

function PixelWave({ className = "w-16 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 4" className={className} style={px} shapeRendering="crispEdges">
      <rect x="0" y="2" width="4" height="1" fill="#E0F2FE" />
      <rect x="3" y="1" width="3" height="1" fill="#E0F2FE" />
      <rect x="8" y="2" width="4" height="1" fill="#E0F2FE" />
      <rect x="11" y="1" width="3" height="1" fill="#E0F2FE" />
    </svg>
  );
}

/** Full beach backdrop, placed at the bottom of the map from `left` for `width` px. */
export function BeachScene({ left, width }: { left: number; width: number }) {
  const waves = Math.max(3, Math.floor(width / 140));
  return (
    <div className="absolute bottom-0 pointer-events-none" style={{ left, width, height: 120 }} aria-hidden="true">
      {/* sea at the back */}
      <div className="absolute left-0 right-0 bottom-16 h-12" style={{ background: "linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)" }} />
      {Array.from({ length: waves }).map((_, i) => (
        <div
          key={i}
          className="absolute kids-sea-wave"
          style={{ left: 40 + i * 140, bottom: 70 + (i % 3) * 10, animationDelay: `${-i * 0.7}s` }}
        >
          <PixelWave />
        </div>
      ))}
      {/* sand */}
      <div className="absolute left-0 right-0 bottom-0 h-16" style={{ background: "linear-gradient(180deg, #FDE68A 0%, #F59E0B 100%)" }} />
      <div className="absolute left-0 right-0 bottom-16 h-2 bg-[#FEF3C7]" />
      {/* props */}
      <div className="absolute bottom-10" style={{ right: 20 }}><PixelLighthouse className="w-12 h-28" /></div>
      <div className="absolute bottom-6" style={{ left: Math.round(width * 0.42) }}><PixelUmbrella /></div>
      <div className="absolute bottom-4" style={{ left: Math.round(width * 0.42) + 70 }}><PixelLifebuoy /></div>
      <div className="absolute bottom-6" style={{ left: Math.round(width * 0.78) }}><PixelUmbrella className="w-12 h-14" /></div>
    </div>
  );
}
