import { GAMES } from "../data/games";
import GameCard from "../components/GameCard";

export default function Games() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="font-display text-4xl font-bold">Semua Game Hotelbet</h1>
      <p className="mt-3 max-w-xl text-muted">
        {GAMES.length} game siap dimainkan. Skor terbaikmu tersimpan otomatis di perangkat ini.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((g, i) => <GameCard key={g.slug} game={g} index={i} />)}
      </div>
    </section>
  );
}
