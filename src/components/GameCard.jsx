import { Link } from "react-router-dom";

const accentMap = {
  neon: "text-neon shadow-neon ring-neon/30 group-hover:ring-neon/60",
  violet: "text-violet shadow-violet ring-violet/30 group-hover:ring-violet/60",
  plasma: "text-plasma shadow-plasma ring-plasma/30 group-hover:ring-plasma/60",
};

const glyph = { snake: "⬢", memory: "◈", minesweeper: "✦" };

export default function GameCard({ game, index = 0 }) {
  const a = accentMap[game.accent] || accentMap.neon;
  return (
    <Link
      to={`/games/${game.slug}`}
      className="group relative animate-rise overflow-hidden rounded-2xl border border-edge bg-panel p-6 transition-transform duration-200 hover:-translate-y-1"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative flex items-start justify-between">
        <span className={`grid h-14 w-14 place-items-center rounded-xl bg-void text-2xl ring-1 ${a}`}>
          {glyph[game.slug] || "●"}
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-muted">{game.tag}</span>
      </div>
      <h3 className="relative mt-5 font-display text-xl font-bold">{game.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted">{game.blurb}</p>
      <div className="relative mt-5 flex items-center justify-between">
        <span className="font-mono text-xs text-muted">
          rating <span className="text-white">{game.rating.toFixed(1)}</span>
        </span>
        <span className={`font-mono text-sm font-bold ${a.split(" ")[0]}`}>Main →</span>
      </div>
    </Link>
  );
}
