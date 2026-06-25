// Banner Memory — grid kartu, sebagian terbuka memperlihatkan simbol, sepasang menyala cocok.
export default function MemoryBanner() {
  const cards = [
    {x:0,y:0,sym:"★",open:true,match:true},{x:1,y:0,sym:"◆",open:false},
    {x:2,y:0,sym:"●",open:false},{x:3,y:0,sym:"★",open:true,match:true},
    {x:0,y:1,sym:"▲",open:false},{x:1,y:1,sym:"⬢",open:true},
    {x:2,y:1,sym:"✦",open:false},{x:3,y:1,sym:"♥",open:false},
  ];
  const cw=78, ch=92, gx=18, gy=18, ox=42, oy=30;
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Game Memory Match">
      <defs>
        <linearGradient id="mb-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#16111f"/><stop offset="1" stopColor="#0a0a12"/>
        </linearGradient>
        <filter id="mb-glow"><feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="400" height="260" rx="16" fill="url(#mb-bg)"/>
      {cards.map((c,i)=>{
        const x=ox+c.x*(cw+gx), y=oy+c.y*(ch+gy);
        return (
          <g key={i}>
            <rect x={x} y={y} width={cw} height={ch} rx="12"
              fill={c.open ? (c.match ? "#9d6bff22" : "#13131f") : "#13131f"}
              stroke={c.match ? "#9d6bff" : "#23233a"} strokeWidth={c.match?2:1}
              filter={c.match ? "url(#mb-glow)" : undefined}/>
            {c.open
              ? <text x={x+cw/2} y={y+ch/2+10} fill={c.match?"#9d6bff":"#fff"} fontSize="30" textAnchor="middle">{c.sym}</text>
              : <text x={x+cw/2} y={y+ch/2+8} fill="#7a7a95" fontFamily="monospace" fontSize="24" textAnchor="middle">?</text>}
            {c.match && <animate attributeName="opacity" values="1;0.75;1" dur="1.6s" repeatCount="indefinite"/>}
          </g>
        );
      })}
    </svg>
  );
}
