import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BRAND } from "../lib/brand";
import Logo from "./Logo";

const NAV = [
  { to: "/", label: "Beranda", end: true },
  { to: "/games", label: "Games" },
  { to: "/tentang", label: "Tentang" },
];

function CtaButtons({ stacked = false, onClick }) {
  const { register, login } = BRAND.cta;
  return (
    <div className={stacked ? "flex flex-col gap-3" : "flex items-center gap-2"}>
      <a href={login.href} target="_blank" rel="noopener noreferrer" onClick={onClick}
        className={`rounded-lg border border-edge bg-panel px-4 py-2 text-center font-display text-sm font-bold text-white transition-colors hover:border-neon/50 ${stacked ? "w-full py-3" : ""}`}>
        {login.label}
      </a>
      <a href={register.href} target="_blank" rel="noopener noreferrer" onClick={onClick}
        className={`rounded-lg bg-neon px-4 py-2 text-center font-display text-sm font-bold text-void transition-transform hover:scale-105 ${stacked ? "w-full py-3" : ""}`}>
        {register.label}
      </a>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // tutup drawer saat pindah halaman
  useEffect(() => { setOpen(false); }, [pathname]);
  // kunci scroll saat drawer terbuka
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-edge/70 bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo />
        </Link>

        {/* Desktop nav + CTA */}
        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-1">
            {NAV.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-panel text-neon ring-1 ring-edge" : "text-muted hover:text-white"
                  }`
                }>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="h-5 w-px bg-edge" />
          <CtaButtons />
        </div>

        {/* Tombol hamburger — hanya mobile */}
        <button onClick={() => setOpen(true)} aria-label="Buka menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-edge bg-panel text-white md:hidden">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Drawer mobile */}
      <div className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}>
        {/* overlay */}
        <div onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-void/90 backdrop-blur-md transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
        {/* panel */}
        <aside style={{ backgroundColor: "#13131f", height: "100vh" }} className={`absolute inset-y-0 right-0 z-10 flex w-72 max-w-[85%] flex-col border-l border-edge shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between border-b border-edge px-5 py-4">
            <Logo />
            <button onClick={() => setOpen(false)} aria-label="Tutup menu"
              className="grid h-9 w-9 place-items-center rounded-lg border border-edge text-white">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-3 py-4">
            {NAV.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 font-display text-base font-semibold transition-colors ${
                    isActive ? "bg-void text-neon ring-1 ring-edge" : "text-white hover:bg-void hover:text-neon"
                  }`
                }>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto border-t border-edge p-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Akun</p>
            <CtaButtons stacked onClick={() => setOpen(false)} />
          </div>
        </aside>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-edge/70">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-mono">
            HOTEL<span className="text-neon">BET</span> — Hak cipta dilindungi.
          </p>
          <p>Dibuat untuk seru-seruan. Tanpa iklan, tanpa unduhan.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }) {
  return (
    <div className="scanlines flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
