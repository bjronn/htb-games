import { useEffect, useMemo, useState } from "react";
import { getBest, recordScore } from "../lib/scores";

const SYMBOLS = ["★", "◆", "●", "▲", "⬢", "✦", "♥", "❄"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck() {
  return shuffle([...SYMBOLS, ...SYMBOLS]).map((s, i) => ({ id: i, sym: s }));
}

export default function MemoryGame() {
  const [deck, setDeck] = useState(buildDeck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const [best, setBest] = useState(null);

  useEffect(() => { setBest(getBest("memory")); }, []);
  const won = matched.length === deck.length;

  useEffect(() => {
    if (won && moves > 0) {
      if (recordScore("memory", moves, "lower")) setBest(moves);
    }
  }, [won, moves]);

  const flip = (card) => {
    if (lock || flipped.includes(card.id) || matched.includes(card.id)) return;
    const next = [...flipped, card.id];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next.map((id) => deck.find((c) => c.id === id));
      if (a.sym === b.sym) {
        setMatched((m) => [...m, a.id, b.id]); setFlipped([]);
      } else {
        setLock(true);
        setTimeout(() => { setFlipped([]); setLock(false); }, 800);
      }
    }
  };

  const reset = () => {
    setDeck(buildDeck()); setFlipped([]); setMatched([]); setMoves(0); setLock(false);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full max-w-md items-center justify-between font-mono text-sm">
        <span className="text-muted">langkah <span className="text-violet">{moves}</span></span>
        <span className="text-muted">rekor <span className="text-amber">{best ?? "—"}</span></span>
      </div>

      <div className="grid w-full max-w-md grid-cols-4 gap-2.5">
        {deck.map((card) => {
          const show = flipped.includes(card.id) || matched.includes(card.id);
          const done = matched.includes(card.id);
          return (
            <button key={card.id} onClick={() => flip(card)} aria-label={show ? card.sym : "kartu tertutup"}
              className={`relative aspect-square rounded-xl text-2xl font-bold transition-all duration-300 ${
                show
                  ? done
                    ? "bg-violet/15 text-violet ring-1 ring-violet/50"
                    : "bg-panel text-white ring-1 ring-edge"
                  : "bg-panel ring-1 ring-edge hover:ring-violet/40"
              }`}
              style={{ transform: show ? "rotateY(0deg)" : "rotateY(0deg)" }}>
              <span className={`transition-opacity ${show ? "opacity-100" : "opacity-0"}`}>{card.sym}</span>
              {!show && <span className="absolute inset-0 grid place-items-center font-mono text-muted">?</span>}
            </button>
          );
        })}
      </div>

      {won && (
        <div className="animate-rise rounded-xl border border-violet/40 bg-violet/10 px-6 py-4 text-center">
          <p className="font-display text-xl font-bold text-violet">Selesai!</p>
          <p className="mt-1 font-mono text-sm text-muted">{moves} langkah</p>
        </div>
      )}

      <button onClick={reset}
        className="rounded-lg bg-violet px-6 py-2.5 font-display font-bold text-void transition-transform hover:scale-105">
        {won ? "Main lagi" : "Acak ulang"}
      </button>
    </div>
  );
}
