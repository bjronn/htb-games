import { useState } from "react";
import { getBest, recordScore } from "../lib/scores";
import GamePlaceholder from "./_GamePlaceholder";

// ============================================================
//  GAME 2 — slug: "game-2"
//  Tulis logika & tampilan permainan Anda di komponen ini.
//
//  Helper skor yang bisa Anda pakai:
//    recordScore("game-2", nilai, "higher")  // simpan skor (higher/lower)
//    getBest("game-2")                        // ambil skor terbaik
//
//  Hapus <GamePlaceholder /> di bawah lalu ganti dengan game Anda.
// ============================================================

export default function Game2() {
  // Contoh state awal — silakan ubah/hapus:
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => getBest("sportsbook") || 0);

  // TODO: tulis gameplay Anda di sini.

}
