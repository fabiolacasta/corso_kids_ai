/**
 * Pixel-art scenery for world 7, "Città Digitale": a city skyline at dusk
 * with lit windows, an antenna with a blinking light and a big phone screen.
 * Purely decorative (aria-hidden).
 */

const px = { imageRendering: "pixelated" as const };

function PixelBuilding({ w, h, color, seed }: { w: number; h: number; color: string; seed: number }) {
  // windows on a 3px grid; some lit, chosen deterministically from the seed
  const windows: { x: number; y: number; lit: boolean }[] = [];
  for (let y = 2; y < h - 2; y += 3) {
    for (let x = 1; x < w - 1; x += 3) {
      windows.push({ x, y, lit: ((x * 7 + y * 13 + seed * 5) % 5) < 2 });
    }
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ ...px, width: w * 4, height: h * 4 }} shapeRendering="crispEdges">
      <rect x="0" y="0" width={w} height={h} fill={color} />
      <rect x="0" y="0" width={w} height="1" fill="#0F172A" opacity="0.4" />
      {windows.map((win, i) => (
        <rect key={i} x={win.x} y={win.y} width="2" height="2" fill={win.lit ? "#FDE68A" : "#1E293B"} />
      ))}
    </svg>
  );
}

function PixelAntennaTower() {
  return (
    <svg viewBox="0 0 10 40" style={{ ...px, width: 40, height: 160 }} shapeRendering="crispEdges">
      <rect className="kids-city-blink" x="4" y="0" width="2" height="2" fill="#F43F5E" />
      <rect x="4" y="2" width="2" height="10" fill="#94A3B8" />
      <rect x="3" y="12" width="4" height="2" fill="#64748B" />
      <rect x="2" y="14" width="6" height="26" fill="#334155" />
      <rect x="3" y="17" width="1" height="1" fill="#FDE68A" />
      <rect x="6" y="21" width="1" height="1" fill="#FDE68A" />
      <rect x="3" y="27" width="1" height="1" fill="#FDE68A" />
      <rect x="6" y="33" width="1" height="1" fill="#FDE68A" />
    </svg>
  );
}

/** A billboard shaped like a phone, with a chat bubble and a warning sign. */
function PixelPhoneBillboard() {
  return (
    <svg viewBox="0 0 14 24" style={{ ...px, width: 56, height: 96 }} shapeRendering="crispEdges">
      <rect x="0" y="0" width="14" height="22" fill="#0F172A" />
      <rect x="1" y="2" width="12" height="17" fill="#38BDF8" />
      <rect x="2" y="4" width="7" height="3" fill="#F8FAFC" />
      <rect x="5" y="9" width="7" height="3" fill="#2563EB" />
      <rect x="2" y="14" width="5" height="3" fill="#FB923C" />
      <rect x="3" y="15" width="1" height="1" fill="#0F172A" />
      <rect x="6" y="20" width="2" height="1" fill="#475569" />
      <rect x="6" y="22" width="2" height="2" fill="#475569" />
    </svg>
  );
}

/** Full city backdrop, placed at the bottom of the map from `left` for `width` px. */
export function CityScene({ left, width }: { left: number; width: number }) {
  const palette = ["#4338CA", "#3730A3", "#5B21B6", "#1E3A8A", "#6D28D9"];
  const buildings: { x: number; w: number; h: number; color: string }[] = [];
  let x = 0;
  let i = 0;
  while (x < width - 40) {
    const w = 10 + ((i * 7) % 9);
    const h = 18 + ((i * 11) % 22);
    buildings.push({ x, w, h, color: palette[i % palette.length] });
    x += w * 4 + 18 + ((i * 13) % 30);
    i++;
  }
  return (
    <div className="absolute bottom-0 pointer-events-none" style={{ left, width, height: 220 }} aria-hidden="true">
      {/* dusk glow behind the skyline */}
      <div
        className="absolute left-0 right-0 bottom-12 h-40"
        style={{ background: "linear-gradient(180deg, rgba(76,29,149,0) 0%, rgba(76,29,149,0.35) 60%, rgba(30,27,75,0.55) 100%)" }}
      />
      {buildings.map((b, k) => (
        <div key={k} className="absolute" style={{ left: b.x, bottom: 48 }}>
          <PixelBuilding w={b.w} h={b.h} color={b.color} seed={k} />
        </div>
      ))}
      <div className="absolute" style={{ left: Math.round(width * 0.35), bottom: 48 }}>
        <PixelAntennaTower />
      </div>
      <div className="absolute" style={{ left: Math.round(width * 0.7), bottom: 48 }}>
        <PixelPhoneBillboard />
      </div>
      {/* sidewalk */}
      <div className="absolute left-0 right-0 bottom-12 h-2 bg-[#94A3B8]" />
    </div>
  );
}
