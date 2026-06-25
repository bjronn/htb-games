import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SnakeBanner from "./banners/SnakeBanner";
import MemoryBanner from "./banners/MemoryBanner";
import MinesweeperBanner from "./banners/MinesweeperBanner";

const SLIDES = [
  { slug: "snake", el: SnakeBanner, accent: "neon", label: "Snake" },
  { slug: "memory", el: MemoryBanner, accent: "violet", label: "Memory Match" },
  { slug: "minesweeper", el: MinesweeperBanner, accent: "plasma", label: "Minesweeper" },
];

const ring = { neon: "ring-neon/40", violet: "ring-violet/40", plasma: "ring-plasma/40" };
const dot = { neon: "bg-neon", violet: "bg-violet", plasma: "bg-plasma" };

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 3800);
    return () => clearInterval(id);
  }, [paused]);

  const Active = SLIDES[active].el;
  const a = SLIDES[active];

  return (
    <div className="w-full"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Link to={`/games/${a.slug}`}
        className={`group block overflow-hidden rounded-2xl border border-edge bg-panel ring-1 ${ring[a.accent]} transition-shadow`}>
        <div className="relative aspect-[400/260]">
          {SLIDES.map((s, i) => {
            const Slide = s.el;
            return (
              <div key={s.slug}
                className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}>
                <Slide />
              </div>
            );
          })}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-void/90 to-transparent px-4 pb-3 pt-8">
            <span className="font-display text-sm font-bold text-white">{a.label}</span>
            <span className="font-mono text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">main →</span>
          </div>
        </div>
      </Link>

      <div className="mt-4 flex items-center justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button key={s.slug} onClick={() => setActive(i)} aria-label={`Lihat ${s.label}`}
            className={`h-2 rounded-full transition-all ${i === active ? `w-7 ${dot[s.accent]}` : "w-2 bg-edge hover:bg-muted"}`} />
        ))}
      </div>
    </div>
  );
}
