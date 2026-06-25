import { useEffect, useState } from "react";
import { getBest, recordScore } from "../lib/scores";

const ROWS = 9, COLS = 9, MINES = 10;

function build() {
  const grid = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, open: false, flag: false, n: 0 }))
  );
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS), c = Math.floor(Math.random() * COLS);
    if (!grid[r][c].mine) { grid[r][c].mine = true; placed++; }
  }
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c].mine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc].mine) n++;
        }
      grid[r][c].n = n;
    }
  return grid;
}

const numColor = ["", "text-neon", "text-violet", "text-plasma", "text-amber", "text-plasma", "text-violet", "text-white", "text-muted"];

export default function MinesweeperGame() {
  const [grid, setGrid] = useState(build);
  const [over, setOver] = useState(false);
  const [won, setWon] = useState(false);
  const [flags, setFlags] = useState(0);
  const [start, setStart] = useState(null);
  const [time, setTime] = useState(0);
  const [best, setBest] = useState(null);

  useEffect(() => { setBest(getBest("minesweeper")); }, []);

  useEffect(() => {
    if (!start || over || won) return;
    const id = setInterval(() => setTime(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(id);
  }, [start, over, won]);

  const reset = () => {
    setGrid(build()); setOver(false); setWon(false); setFlags(0); setStart(null); setTime(0);
  };

  const flood = (g, r, c) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    const cell = g[r][c];
    if (cell.open || cell.flag) return;
    cell.open = true;
    if (cell.n === 0 && !cell.mine)
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) flood(g, r + dr, c + dc);
  };

  const open = (r, c) => {
    if (over || won) return;
    if (!start) setStart(Date.now());
    const g = grid.map((row) => row.map((cell) => ({ ...cell })));
    const cell = g[r][c];
    if (cell.flag || cell.open) return;
    if (cell.mine) {
      g.forEach((row) => row.forEach((x) => { if (x.mine) x.open = true; }));
      setGrid(g); setOver(true); return;
    }
    flood(g, r, c);
    setGrid(g);
    const safe = g.flat().filter((x) => !x.mine);
    if (safe.every((x) => x.open)) {
      setWon(true);
      const t = Math.floor((Date.now() - (start || Date.now())) / 1000);
      if (recordScore("minesweeper", t, "lower")) setBest(t);
    }
  };

  const flag = (e, r, c) => {
    e.preventDefault();
    if (over || won || grid[r][c].open) return;
    const g = grid.map((row) => row.map((cell) => ({ ...cell })));
    g[r][c].flag = !g[r][c].flag;
    setFlags(g.flat().filter((x) => x.flag).length);
    setGrid(g);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full max-w-md items-center justify-between font-mono text-sm">
        <span className="text-muted">ranjau <span className="text-plasma">{MINES - flags}</span></span>
        <span className="text-muted">waktu <span className="text-neon">{time}s</span></span>
        <span className="text-muted">rekor <span className="text-amber">{best != null ? best + "s" : "—"}</span></span>
      </div>

      <div className="rounded-xl border border-edge bg-void p-2">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0,1fr))` }}>
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <button key={`${r}-${c}`}
                onClick={() => open(r, c)} onContextMenu={(e) => flag(e, r, c)}
                className={`grid h-9 w-9 place-items-center rounded-[3px] font-mono text-sm font-bold transition-colors ${
                  cell.open
                    ? cell.mine
                      ? "bg-plasma/80 text-void"
                      : `bg-panel/60 ${numColor[cell.n]}`
                    : "bg-panel ring-1 ring-edge hover:bg-edge"
                }`}>
                {cell.open ? (cell.mine ? "✺" : cell.n || "") : cell.flag ? <span className="text-amber">⚑</span> : ""}
              </button>
            ))
          )}
        </div>
      </div>

      {(over || won) && (
        <div className={`animate-rise rounded-xl border px-6 py-4 text-center ${
          won ? "border-neon/40 bg-neon/10" : "border-plasma/40 bg-plasma/10"}`}>
          <p className={`font-display text-xl font-bold ${won ? "text-neon" : "text-plasma"}`}>
            {won ? "Papan bersih!" : "Kena ranjau!"}
          </p>
          {won && <p className="mt-1 font-mono text-sm text-muted">{time} detik</p>}
        </div>
      )}

      <button onClick={reset}
        className="rounded-lg bg-plasma px-6 py-2.5 font-display font-bold text-void transition-transform hover:scale-105">
        Papan baru
      </button>
      <p className="text-center font-mono text-xs text-muted">Klik kiri membuka · klik kanan menandai bendera</p>
    </div>
  );
}
