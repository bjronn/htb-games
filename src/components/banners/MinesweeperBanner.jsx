// Banner Minesweeper — papan dengan kotak terbuka berangka, bendera, dan satu ranjau menyala.
export default function MinesweeperBanner() {
  // 0=tertutup, n=angka, 'F'=bendera, 'M'=ranjau
  const grid = [
    [1,"o",2,"F","o"],
    ["o",1,2,3,"o"],
    [1,1,"o","M","o"],
    ["F","o",2,2,1],
    ["o","o",1,"o","o"],
  ];
  const num = {1:"#00f0c0",2:"#9d6bff",3:"#ff3d81"};
  const s=40, ox=100, oy=30;
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Game Minesweeper">
      <defs>
        <linearGradient id="msb-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1c1016"/><stop offset="1" stopColor="#0a0a12"/>
        </linearGradient>
        <filter id="msb-glow"><feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="400" height="260" rx="16" fill="url(#msb-bg)"/>
      {grid.map((row,r)=>row.map((c,cc)=>{
        const x=ox+cc*s, y=oy+r*s;
        const opened = c==="o" || typeof c==="number";
        return (
          <g key={`${r}-${cc}`}>
            <rect x={x+2} y={y+2} width={s-4} height={s-4} rx="6"
              fill={c==="M" ? "#ff3d81cc" : opened ? "#13131f99" : "#1a1a28"}
              stroke={c==="M" ? "#ff3d81" : "#23233a"} strokeWidth="1"
              filter={c==="M" ? "url(#msb-glow)" : undefined}/>
            {typeof c==="number" &&
              <text x={x+s/2} y={y+s/2+6} fill={num[c]} fontFamily="monospace" fontSize="18" fontWeight="700" textAnchor="middle">{c}</text>}
            {c==="F" && <text x={x+s/2} y={y+s/2+7} fill="#ffb800" fontSize="20" textAnchor="middle">⚑</text>}
            {c==="M" && <>
              <text x={x+s/2} y={y+s/2+7} fill="#0a0a12" fontSize="20" textAnchor="middle">✺</text>
              <animate attributeName="opacity" values="1;0.6;1" dur="1.1s" repeatCount="indefinite"/>
            </>}
          </g>
        );
      }))}
    </svg>
  );
}
