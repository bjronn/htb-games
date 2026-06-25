import { useState } from "react";
import { getBest, recordScore } from "../lib/scores";
import GamePlaceholder from "./_GamePlaceholder";

// ============================================================
//  GAME 4 — slug: "game-4"
//  Tulis logika & tampilan permainan Anda di komponen ini.
//
//  Helper skor yang bisa Anda pakai:
//    recordScore("game-4", nilai, "higher")  // simpan skor (higher/lower)
//    getBest("game-4")                        // ambil skor terbaik
//
//  Hapus <GamePlaceholder /> di bawah lalu ganti dengan game Anda.
// ============================================================

export default function Game4() {
  // Contoh state awal — silakan ubah/hapus:
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => getBest("sabung-ayam") || 0);

  // TODO: tulis gameplay Anda di sini.
}
