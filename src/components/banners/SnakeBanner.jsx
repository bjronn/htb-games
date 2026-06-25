// Banner Snake — ular neon meliuk di grid arcade, food berdenyut.
export default function SnakeBanner() {
  const cells = [
    [3,4],[4,4],[5,4],[6,4],[6,3],[6,2],[7,2],[8,2],[8,3],[8,4],[8,5],[9,5],[10,5],
  ];
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Game Snake">
      <defs>
        <linearGradient id="sb-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d1a16"/><stop offset="1" stopColor="#0a0a12"/>
        </linearGradient>
        <filter id="sb-glow"><feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="400" height="260" rx="16" fill="url(#sb-bg)"/>
      {/* grid */}
      <g stroke="#1c2b26" strokeWidth="1">
        {Array.from({length:13}).map((_,i)=><line key={'v'+i} x1={i*32} y1="0" x2={i*32} y2="260"/>)}
        {Array.from({length:9}).map((_,i)=><line key={'h'+i} x1="0" y1={i*32} x2="400" y2={i*32}/>)}
      </g>
      {/* snake body */}
      {cells.map(([x,y],i)=>(
        <rect key={i} x={x*32+3} y={y*16+3} width="26" height="26" rx="6"
          fill="#00f0c0" opacity={0.45 + (i/cells.length)*0.55}
          filter={i===cells.length-1 ? "url(#sb-glow)" : undefined}>
          {i===cells.length-1 && <animate attributeName="opacity" values="1;0.7;1" dur="1.4s" repeatCount="indefinite"/>}
        </rect>
      ))}
      {/* food */}
      <circle cx="356" cy="120" r="10" fill="#ff3d81" filter="url(#sb-glow)">
        <animate attributeName="r" values="8;11;8" dur="1.2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}
