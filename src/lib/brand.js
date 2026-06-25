// ============================================================
//  KONFIGURASI SITUS — ganti nilai di sini saja.
//  Semua bagian situs (header, logo, tombol, footer) membaca dari file ini.
// ============================================================

export const BRAND = {
  name: "Hotelbet",

  // --- LOGO ---
  // Taruh file logo Anda di folder  public/  lalu tulis namanya di sini.
  // Contoh: simpan "public/logo.png" → tulis "/logo.png"
  // Jika dikosongkan (""), header memakai logo teks bawaan.
  logo: {
    src: "/logo.png",      // logo PlayZone (SVG, tajam di semua ukuran). Ganti dengan file Anda kapan saja.
    alt: "Hotelbet Games Online",
    height: 40,            // tinggi logo di header (px). Lebar menyesuaikan otomatis.
  },

  // --- Tombol CTA: ganti URL di bawah dengan link Anda sendiri ---
  cta: {
    register: {
      label: "Register",
      href: "https://hoki.blog/daftar",   // ← GANTI link daftar di sini
    },
    login: {
      label: "Login",
      href: "https://hoki.blog/login",       // ← GANTI link login di sini
    },
  },
};
