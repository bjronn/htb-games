// Best-score persistence per game. Cloudflare Pages is static, so we keep this
// client-side. "higher" = higher wins, "lower" = lower is better (moves/time).
const KEY = "hotelbet:best";

function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
}

export function getBest(slug) {
  return read()[slug] ?? null;
}

export function recordScore(slug, value, mode = "higher") {
  const all = read();
  const cur = all[slug];
  const better = cur == null || (mode === "higher" ? value > cur : value < cur);
  if (better) {
    all[slug] = value;
    try { localStorage.setItem(KEY, JSON.stringify(all)); } catch {}
    return true;
  }
  return false;
}
