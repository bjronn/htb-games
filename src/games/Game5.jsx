import { useState } from "react";
import { getBest, recordScore } from "../lib/scores";
import GamePlaceholder from "./_GamePlaceholder";

// ============================================================
//  GAME 5 — slug: "game-5"
//  Tulis logika & tampilan permainan Anda di komponen ini.
//
//  Helper skor yang bisa Anda pakai:
//    recordScore("game-5", nilai, "higher")  // simpan skor (higher/lower)
//    getBest("game-5")                        // ambil skor terbaik
//
//  Hapus <GamePlaceholder /> di bawah lalu ganti dengan game Anda.
// ============================================================

export default function Game5() {
  // Contoh state awal — silakan ubah/hapus:
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => getBest("poker-online") || 0);

  // TODO: tulis gameplay Anda di sini.
}
