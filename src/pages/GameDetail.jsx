import { Link, useParams } from "react-router-dom";
import { getGame, GAMES } from "../data/games";
import { BRAND } from "../lib/brand";
import SnakeGame from "../games/SnakeGame";
import MemoryGame from "../games/MemoryGame";
import MinesweeperGame from "../games/MinesweeperGame";
import Game1 from "../games/Game1";
import Game2 from "../games/Game2";
import Game3 from "../games/Game3";
import Game4 from "../games/Game4";
import Game5 from "../games/Game5";

const REGISTRY = {
  snake: SnakeGame,
  memory: MemoryGame,
  minesweeper: MinesweeperGame,
  "game-1": Game1,
  "game-2": Game2,
  "game-3": Game3,
  "game-4": Game4,
  "game-5": Game5,
};
const accentText = { neon: "text-neon", violet: "text-violet", plasma: "text-plasma", amber: "text-amber" };

export default function GameDetail() {
  const { slug } = useParams();
  const game = getGame(slug);
  const GameComp = REGISTRY[slug];

  if (!game) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="font-mono text-6xl text-muted">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold">Game tidak ditemukan</h1>
        <Link to="/games" className="mt-6 inline-block font-mono text-neon hover:underline">← kembali ke daftar game</Link>
      </section>
    );
  }

  // ---- Mode INFO-ONLY: foto + info + 2 tombol CTA, tanpa game ----
  if (game.infoOnly) {
    const others = GAMES.filter((g) => g.slug !== slug);
    return (
      <section className="mx-auto max-w-6xl px-5 py-10">
        <Link to="/games" className="font-mono text-sm text-muted hover:text-neon">← semua game</Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-4xl font-bold">{game.title}</h1>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">{game.tag}</span>
            </div>
            <p className="mt-3 max-w-xl text-muted">{game.blurb}</p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-edge bg-panel/50">
              {game.image ? (
                <img
                  src={game.image}
                  alt={`Pratinjau ${game.title}`}
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <div className="grid aspect-video w-full place-items-center bg-void">
                  <span className="font-mono text-sm text-muted">Foto belum tersedia</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <a
                href={BRAND.cta.register.href}
                className="rounded-lg bg-neon px-6 py-3 font-display font-bold text-void transition-transform hover:scale-105"
              >
                {BRAND.cta.register.label}
              </a>
              <a
                href={BRAND.cta.login.href}
                className="rounded-lg border border-edge bg-panel px-6 py-3 font-display font-bold text-white transition-colors hover:border-neon/50"
              >
                {BRAND.cta.login.label}
              </a>
            </div>
          </div>

          <aside className="space-y-6">
            {Array.isArray(game.info) && game.info.length > 0 && (
              <div className="rounded-2xl border border-edge bg-panel p-6">
                <h2 className="font-display text-lg font-bold">Tentang game</h2>
                <ul className="mt-3 space-y-2">
                  {game.info.map((line, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span className="text-neon">›</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-2xl border border-edge bg-panel p-6">
              <h2 className="font-display text-lg font-bold">Game lain</h2>
              <div className="mt-3 space-y-2">
                {others.map((g) => (
                  <Link key={g.slug} to={`/games/${g.slug}`}
                    className="flex items-center justify-between rounded-lg bg-void px-4 py-3 ring-1 ring-edge transition-colors hover:ring-neon/40">
                    <span className="font-display font-medium">{g.title}</span>
                    <span className={`font-mono text-sm ${accentText[g.accent] || "text-neon"}`}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    );
  }

  if (!GameComp) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="font-mono text-6xl text-muted">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold">Game tidak ditemukan</h1>
        <Link to="/games" className="mt-6 inline-block font-mono text-neon hover:underline">← kembali ke daftar game</Link>
      </section>
    );
  }

  const others = GAMES.filter((g) => g.slug !== slug);

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <Link to="/games" className="font-mono text-sm text-muted hover:text-neon">← semua game</Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-4xl font-bold">{game.title}</h1>
            <span className="font-mono text-xs uppercase tracking-widest text-muted">{game.tag}</span>
          </div>
          <p className="mt-3 max-w-xl text-muted">{game.blurb}</p>

          <div className="mt-8 rounded-2xl border border-edge bg-panel/50 p-5 sm:p-8">
            <GameComp />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-edge bg-panel p-6">
            <h2 className="font-display text-lg font-bold">Cara main</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{game.how}</p>
          </div>
          <div className="rounded-2xl border border-edge bg-panel p-6">
            <h2 className="font-display text-lg font-bold">Game lain</h2>
            <div className="mt-3 space-y-2">
              {others.map((g) => (
                <Link key={g.slug} to={`/games/${g.slug}`}
                  className="flex items-center justify-between rounded-lg bg-void px-4 py-3 ring-1 ring-edge transition-colors hover:ring-neon/40">
                  <span className="font-display font-medium">{g.title}</span>
                  <span className={`font-mono text-sm ${accentText[g.accent]}`}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
