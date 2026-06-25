import { useCallback, useEffect, useRef, useState } from "react";
import { getBest, recordScore } from "../lib/scores";

const SIZE = 17;
const SPEED = 110;
const START = [{ x: 8, y: 8 }];

function randFood(snake) {
  while (true) {
    const f = { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) };
    if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f;
  }
}

export default function SnakeGame() {
  const [snake, setSnake] = useState(START);
  const [food, setFood] = useState(() => randFood(START));
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const dirRef = useRef(dir);
  const queueRef = useRef([]);

  useEffect(() => { setBest(getBest("snake") || 0); }, []);

  const reset = useCallback(() => {
    setSnake(START); setFood(randFood(START));
    setDir({ x: 1, y: 0 }); dirRef.current = { x: 1, y: 0 };
    queueRef.current = []; setScore(0); setOver(false); setRunning(true);
  }, []);

  const turn = useCallback((nd) => {
    const last = queueRef.current.length ? queueRef.current[queueRef.current.length - 1] : dirRef.current;
    if (nd.x === -last.x && nd.y === -last.y) return; // no 180°
    if (nd.x === last.x && nd.y === last.y) return;
    queueRef.current.push(nd);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const m = {
        ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 }, s: { x: 0, y: 1 }, a: { x: -1, y: 0 }, d: { x: 1, y: 0 },
      };
      const nd = m[e.key];
      if (nd) { e.preventDefault(); if (!running && !over) setRunning(true); turn(nd); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, over, turn]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSnake((prev) => {
        if (queueRef.current.length) {
          const nd = queueRef.current.shift();
          dirRef.current = nd; setDir(nd);
        }
        const d = dirRef.current;
        const head = { x: prev[0].x + d.x, y: prev[0].y + d.y };
        if (head.x < 0 || head.x >= SIZE || head.y < 0 || head.y >= SIZE ||
            prev.some((s) => s.x === head.x && s.y === head.y)) {
          setRunning(false); setOver(true);
          setScore((sc) => { if (recordScore("snake", sc, "higher")) setBest(sc); return sc; });
          return prev;
        }
        const next = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 1); setFood(randFood(next));
        } else next.pop();
        return next;
      });
    }, SPEED);
    return () => clearInterval(id);
  }, [running, food]);

  // touch swipe
  const touch = useRef(null);
  const onTouchStart = (e) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x, dy = t.clientY - touch.current.y;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
    if (!running && !over) setRunning(true);
    turn(Math.abs(dx) > Math.abs(dy) ? { x: dx > 0 ? 1 : -1, y: 0 } : { x: 0, y: dy > 0 ? 1 : -1 });
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full max-w-md items-center justify-between font-mono text-sm">
        <span className="text-muted">skor <span className="text-neon">{score}</span></span>
        <span className="text-muted">terbaik <span className="text-amber">{best}</span></span>
      </div>

      <div
        className="relative aspect-square w-full max-w-md touch-none rounded-xl border border-edge bg-void p-2"
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      >
        <div className="grid h-full w-full gap-px"
          style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)`, gridTemplateRows: `repeat(${SIZE}, 1fr)` }}>
          {Array.from({ length: SIZE * SIZE }).map((_, i) => {
            const x = i % SIZE, y = Math.floor(i / SIZE);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isBody = !isHead && snake.some((s) => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;
            return (
              <div key={i} className={`rounded-[2px] ${
                isHead ? "bg-neon shadow-glow shadow-neon" :
                isBody ? "bg-neon/55" :
                isFood ? "bg-plasma shadow-glow shadow-plasma animate-flicker" :
                "bg-panel/40"}`} />
            );
          })}
        </div>

        {(!running || over) && (
          <div className="absolute inset-0 grid place-items-center rounded-xl bg-void/85 backdrop-blur-sm">
            <div className="text-center">
              {over ? (
                <>
                  <p className="font-display text-2xl font-bold text-plasma">Tabrakan!</p>
                  <p className="mt-1 font-mono text-sm text-muted">Skor akhir: {score}</p>
                </>
              ) : (
                <p className="font-display text-xl font-bold">Siap?</p>
              )}
              <button onClick={reset}
                className="mt-4 rounded-lg bg-neon px-6 py-2.5 font-display font-bold text-void transition-transform hover:scale-105">
                {over ? "Main lagi" : "Mulai"}
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-center font-mono text-xs text-muted">Panah / WASD di desktop · swipe di ponsel</p>
    </div>
  );
}
