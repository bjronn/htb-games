import { useState } from "react";
import { getBest, recordScore } from "../lib/scores";
import GamePlaceholder from "./_GamePlaceholder";

// ============================================================
//  GAME 1 — slug: "game-1"
//  Tulis logika & tampilan permainan Anda di komponen ini.
//
//  Helper skor yang bisa Anda pakai:
//    recordScore("game-1", nilai, "higher")  // simpan skor (higher/lower)
//    getBest("game-1")                        // ambil skor terbaik
//
//  Hapus <GamePlaceholder /> di bawah lalu ganti dengan game Anda.
// ============================================================

export default function Game1() {
  // Contoh state awal — silakan ubah/hapus:
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => getBest("slot-online") || 0);

}
