# PlayZone — Arcade Mini-Games

Portal mini-game browser: **Snake**, **Memory Match**, **Minesweeper**.
React + Vite + Tailwind CSS. Tiap game punya halaman sendiri, skor terbaik tersimpan di browser.

## Jalankan lokal
```bash
npm install
npm run dev
```

## Build produksi
```bash
npm run build      # output ke folder dist/
npm run preview    # cek hasil build
```

## Deploy ke Cloudflare Pages
1. Push repo ini ke GitHub.
2. Di Cloudflare Pages → Create project → connect repo.
3. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
4. File `public/_redirects` sudah disertakan agar routing SPA (`/games/snake`, dll) tidak kena 404.

## Struktur
```
src/
  components/   Layout, GameCard
  data/         games.js  ← katalog game (tambah game baru di sini)
  games/        SnakeGame, MemoryGame, MinesweeperGame
  lib/          scores.js ← penyimpanan skor terbaik (localStorage)
  pages/        Home, Games, GameDetail, About
```

## Menambah game baru
1. Buat komponen di `src/games/NamaGame.jsx`.
2. Daftarkan di `src/data/games.js` (slug, judul, blurb, dll).
3. Tambahkan ke `REGISTRY` di `src/pages/GameDetail.jsx`.
