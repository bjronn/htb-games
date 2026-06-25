import { BRAND } from "../lib/brand";

// Menampilkan logo gambar bila BRAND.logo.src diisi, jika tidak fallback ke logo teks.
export default function Logo({ compact = false }) {
  const { logo, name } = BRAND;

  if (logo?.src) {
    return (
      <img
        src={logo.src}
        alt={logo.alt || name}
        style={{ height: logo.height || 36 }}
        className="w-auto select-none"
      />
    );
  }

  // Fallback: logo teks bawaan
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-panel ring-1 ring-edge">
        <span className="font-mono text-neon">▶</span>
      </span>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight">
          {name.replace(/Zone$/i, "")}
          <span className="text-neon">Zone</span>
        </span>
      )}
    </span>
  );
}
