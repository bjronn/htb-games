import { useState } from "react";

const FAQS = [
  {
    q: "Apakah saya perlu mengunduh atau memasang sesuatu?",
    a: "Tidak. Semua game berjalan langsung di dalam browser. Buka halaman game, dan permainan langsung dimulai — tanpa instalasi, tanpa plugin.",
  },
  {
    q: "Apakah harus daftar atau membuat akun?",
    a: "Tidak perlu. Tidak ada layar pendaftaran di antara kamu dan game pertama. Pilih game, lalu main.",
  },
  {
    q: "Apakah ada iklan?",
    a: "Tidak ada. Tidak ada banner, pop-up, maupun video iklan yang memotong permainan.",
  },
  {
    q: "Apakah gratis?",
    a: "Sepenuhnya gratis. Semua game di PlayZone bisa dimainkan tanpa biaya apa pun.",
  },
  {
    q: "Bisa dimainkan di ponsel?",
    a: "Bisa. Tampilan menyesuaikan layar, dan kontrol sentuh tersedia — misalnya swipe untuk Snake atau ketuk untuk Memory Match dan Minesweeper.",
  },
  {
    q: "Apakah skor saya tersimpan?",
    a: "Skor terbaik disimpan di perangkatmu sendiri lewat penyimpanan browser. Tidak ada data yang dikirim ke server atau dikaitkan dengan identitasmu.",
  },
];

function FaqItem({ item, isOpen, onToggle, index }) {
  const panelId = `faq-panel-${index}`;
  const btnId = `faq-button-${index}`;
  return (
    <div className="border-b border-edge/70">
      <h3>
        <button
          id={btnId}
          aria-controls={panelId}
          aria-expanded={isOpen}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-neon focus:outline-none focus-visible:text-neon"
        >
          <span className="font-display text-lg font-bold">{item.q}</span>
          <span
            className={`grid h-7 w-7 flex-none place-items-center rounded-md border border-edge font-mono text-neon transition-transform duration-300 ${
              isOpen ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <p className="pb-5 pr-11 leading-relaxed text-muted">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <div className="mb-8">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-neon">tanya jawab</p>
        <h2 className="mt-3 font-display text-2xl font-bold">Pertanyaan umum</h2>
      </div>
      <div className="rounded-xl border border-edge bg-panel px-6">
        {FAQS.map((item, i) => (
          <FaqItem
            key={i}
            item={item}
            index={i}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}
