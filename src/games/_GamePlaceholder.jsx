// Komponen tampilan sementara untuk game yang belum diisi.
// Dipakai oleh game-game baru sampai Anda menulis gameplay-nya sendiri.
export default function GamePlaceholder({ title = "Game" }) {
  return (
    <div className="flex flex-col items-center gap-5 py-6">
      <div className="grid aspect-square w-full max-w-md place-items-center rounded-xl border border-dashed border-edge bg-void/50 p-8 text-center">
        <div>
          <p className="font-mono text-5xl text-muted">🎮</p>
          <p className="mt-4 font-display text-lg font-bold">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Game ini belum diisi. Tulis logika permainannya di
            file komponen game ini.
          </p>
        </div>
      </div>
      <p className="text-center font-mono text-xs text-muted">
        Edit file di <span className="text-neon">src/games/</span> untuk membuat game ini.
      </p>
    </div>
  );
}
