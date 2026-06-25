import { Link } from "react-router-dom";
import { GAMES } from "../data/games";
import GameCard from "../components/GameCard";
import HeroBanner from "../components/HeroBanner";
import Faq from "../components/Faq";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-edge/70">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:py-24 lg:grid-cols-[1fr_440px]">
          <div>
            <p className="animate-rise font-mono text-sm uppercase tracking-[0.3em] text-neon">
              Buka · main · Gratis
            </p>
            <h1 className="mt-4 animate-rise font-display text-5xl font-bold leading-[1.05] sm:text-6xl"
              style={{ animationDelay: "60ms" }}>
              Tekan main.<br />
              <span className="text-neon">Langsung jalan.</span>
            </h1>
            <p className="mt-6 max-w-xl animate-rise text-lg leading-relaxed text-muted"
              style={{ animationDelay: "120ms" }}>
              Kumpulan mini-game slot klasik yang dibangun ulang untuk browser modern. Tanpa unduhan,
              tanpa akun, tanpa iklan — buka tinggal main.
            </p>
            <div className="mt-8 flex animate-rise flex-wrap gap-3" style={{ animationDelay: "180ms" }}>
              <Link to="/games"
                className="rounded-lg bg-neon px-6 py-3 font-display font-bold text-void transition-transform hover:scale-105">
                Lihat semua game
              </Link>
              <Link to="//t.me/hotelbetbot"
                className="rounded-lg border border-edge bg-panel px-6 py-3 font-display font-bold text-white transition-colors hover:border-neon/50">
                Join Bot Telegram →
              </Link>
            </div>
          </div>
          <div className="animate-rise" style={{ animationDelay: "240ms" }}>
            <HeroBanner />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold">Pilih game</h2>
          <Link to="/games" className="font-mono text-sm text-muted hover:text-neon">semua →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((g, i) => <GameCard key={g.slug} game={g} index={i} />)}
        </div>
      </section>

      <Faq />
    </>
  );
}
