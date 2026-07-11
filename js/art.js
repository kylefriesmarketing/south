/* =====================================================================
   SOUTH — art.js. Procedural SVG fallbacks (generated stills preferred).
   Lantern-lit polar dark: ink navy, bone ice, one amber warmth.
   ===================================================================== */
const ART = (() => {
const W=900, H=500;
function rng(s){ let h=1779033703^String(s).length;
  for(let i=0;i<String(s).length;i++){h=Math.imul(h^String(s).charCodeAt(i),3432918353);h=h<<13|h>>>19;}
  return function(){h=Math.imul(h^h>>>16,2246822507);h=Math.imul(h^h>>>13,3266489909);
    return ((h^=h>>>16)>>>0)/4294967296;};}
const G=(id,st)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">`+st.map(s=>`<stop offset="${s[0]}" stop-color="${s[1]}"/>`).join('')+`</linearGradient>`;
const RG=(id,st)=>`<radialGradient id="${id}">`+st.map(s=>`<stop offset="${s[0]}" stop-color="${s[1]}" stop-opacity="${s[2]!==undefined?s[2]:1}"/>`).join('')+`</radialGradient>`;
const rect=(x,y,w,h,f,o)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${o!==undefined?` opacity="${o}"`:''}/>`;
const circ=(x,y,r,f,o)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${o!==undefined?` opacity="${o}"`:''}/>`;
const path=(d,f,o,x)=>`<path d="${d}" fill="${f}"${o!==undefined?` opacity="${o}"`:''}${x||''}/>`;
function stars(r,n,maxY){ let s='';
  for(let i=0;i<n;i++) s+=circ(r()*W,r()*maxY,r()*1.3+.3,'#dfe6ee',.3+r()*.6);
  return s;}
function aurora(r){ let s='';
  for(let i=0;i<4;i++) s+=`<path d="M${-60+i*40},${80+i*26} q220,${-50-i*8} 440,${-6} t460,${16}" stroke="${['#4fd0a0','#6ae0b8','#7ad0e0','#9a8ae0'][i]}" stroke-width="${24-i*4}" fill="none" opacity="${.16-i*.02}"><animateTransform attributeName="transform" type="translate" values="0,0;30,8;0,0" dur="${14+i*4}s" repeatCount="indefinite"/></path>`;
  return s;}
function floe(r,y){ let s=rect(0,y,W,H-y,'#c8d4dc');
  for(let i=0;i<10;i++){ const x=r()*W,yy=y+10+r()*(H-y-20),w=50+r()*140;
    s+=`<path d="M${x},${yy} l${w},${-4-r()*8} l${8},${10} l${-w-10},${8} z" fill="#a9bcc8" opacity="${.4+r()*.4}"/>`; }
  return s;}
function ship(x,y,s,masts,lit){ let g=`<g transform="translate(${x},${y}) scale(${s})">`;
  g+=path(`M-70,0 q10,26 70,26 q60,0 72,-26 l-8,-6 l-128,0 z`,'#12181e');
  for(let i=0;i<masts;i++){ const mx=-40+i*40;
    g+=`<line x1="${mx}" y1="-6" x2="${mx}" y2="-96" stroke="#1a222a" stroke-width="4"/>`
      +`<line x1="${mx-24}" y1="-70" x2="${mx+24}" y2="-70" stroke="#1a222a" stroke-width="2.5"/>`
      +`<line x1="${mx-20}" y1="-40" x2="${mx+20}" y2="-40" stroke="#1a222a" stroke-width="2.5"/>`; }
  if(lit) for(let i=0;i<5;i++) g+=circ(-52+i*26,8,2.4,'#f2b24a',.95);
  return g+`</g>`;}
function men(r,y,n,c='#0a0e12',sp=W){ let s='';
  for(let i=0;i<n;i++){ const x=(W-sp)/2+r()*sp, h=7+r()*4;
    s+=`<ellipse cx="${x}" cy="${y+r()*8}" rx="${h*.34}" ry="${h}" fill="${c}" opacity="${.6+r()*.4}"/>`; }
  return s;}
function snowfall(r,n){ let s='<g>';
  for(let i=0;i<n;i++){ const x=r()*W,y=r()*H;
    s+=`<circle cx="${x}" cy="${y}" r="${.5+r()*1.4}" fill="#dfe8ee" opacity="${.3+r()*.5}"><animate attributeName="cy" values="${y};${y+H}" dur="${6+r()*7}s" repeatCount="indefinite"/></circle>`; }
  return s+'</g>';}
function sea(r,y,c1,c2){ let s=rect(0,y,W,H-y,c2);
  for(let i=0;i<8;i++){ const yy=y+i*((H-y)/8);
    s+=`<g opacity="${.5-i*.04}"><path d="M-40,${yy} q120,${-6-i} 240,0 t240,0 t240,0 t240,0" stroke="${c1}" stroke-width="${1.5+i*.3}" fill="none"/><animateTransform attributeName="transform" type="translate" values="0,0;${-50-i*6},0;0,0" dur="${7+i}s" repeatCount="indefinite"/></g>`; }
  return s;}

const P={
title(r){ return G('t',[[0,'#04060c'],[.6,'#0a1018'],[1,'#10161c']])+rect(0,0,W,H,'url(#t)')
  +stars(r,90,240)+aurora(r)+floe(r,340)
  +ship(450,338,1.15,3,true)
  +RG('gl',[[0,'#f2b24a',.35],[1,'#000',0]])+circ(450,340,120,'url(#gl)')
  +men(r,392,4,'#0a0e12',200)+snowfall(r,24);},
beset(r){ return this.title(r); },
crush(r){ return G('c',[[0,'#0c1016'],[.6,'#141a20'],[1,'#1a2028']])+rect(0,0,W,H,'url(#c)')
  +floe(r,330)
  +`<g transform="translate(430,330) rotate(-9)">`+path(`M-70,0 q10,26 70,26 q60,0 72,-26 l-8,-10 l-128,4 z`,'#10151a')
  +`<line x1="-40" y1="-4" x2="-64" y2="-84" stroke="#171e24" stroke-width="4"/>`
  +`<line x1="0" y1="-6" x2="28" y2="-70" stroke="#171e24" stroke-width="4"/>`
  +path(`M30,-4 l50,-40 l6,8 l-46,40 z`,'#141a20')+`</g>`
  +Array.from({length:6},(_,i)=>path(`M${350+i*24},${300+r()*20} l${10+r()*14},${-30-r()*30}`,'none',.8,` stroke="#22303a" stroke-width="3"`)).join('')
  +men(r,392,10,'#080c10',380)
  +RG('ln',[[0,'#f2b24a',.5],[1,'#000',0]])+circ(300,388,36,'url(#ln)')
  +snowfall(r,30);},
floecamp(r){ return G('f',[[0,'#0a1018'],[.55,'#16202a'],[1,'#22303a']])+rect(0,0,W,H,'url(#f)')
  +stars(r,50,180)+floe(r,320)
  +Array.from({length:5},(_,i)=>{const x=180+i*130+r()*30;
    return path(`M${x-34},420 L${x},368 L${x+34},420 Z`,'#d8d4c4',.92)+path(`M${x-34},420 L${x},368 L${x+6},374 L${x-24},420 Z`,'#b8b4a4',.9);}).join('')
  +RG('fg',[[0,'#f2b24a',.6],[1,'#000',0]])+circ(450,432,30,'url(#fg)')
  +path(`M444,436 l6,-12 l6,12 z`,'#f2c46a')+men(r,428,8,'#0a0e12',500)+snowfall(r,20);},
march(r){ return G('m',[[0,'#8a9aa8'],[.5,'#b4c2cc'],[1,'#d4dee4']])+rect(0,0,W,H,'url(#m)')
  +floe(r,300)
  +`<g transform="translate(430,380)">`+path(`M-60,0 q10,16 60,16 q50,0 60,-16 l-6,-6 l-108,0 z`,'#1a222a')+`</g>`
  +Array.from({length:8},(_,i)=>{const x=250+i*22;
    return `<line x1="${x}" y1="${372}" x2="${x-14}" y2="${384}" stroke="#10161c" stroke-width="2"/>`+circ(x,366,3.4,'#10161c');}).join('')
  +men(r,380,6,'#141c24',260)+snowfall(r,40)
  +`<line x1="310" y1="376" x2="370" y2="382" stroke="#2a343c" stroke-width="2"/>`;},
boats(r){ return G('b',[[0,'#1a2430'],[.5,'#0e161e'],[1,'#080e14']])+rect(0,0,W,H,'url(#b)')
  +sea(r,220,'#2a3c4a','#0c141c')
  +Array.from({length:3},(_,i)=>{const x=250+i*180,y=300+i*40;
    return `<g transform="translate(${x},${y})">`+path(`M-44,0 q8,14 44,14 q36,0 44,-14 l-5,-5 l-78,0 z`,'#141a20')
      +men(rng('b'+i),-6,5,'#0a0e12',60).replace(/cx="(\d+\.?\d*)"/g,(m,v)=>`cx="${(+v-W/2)*.16}"`)
      +`</g>`; }).join('')
  +path(`M60,80 L140,40 L200,90 L150,140 Z`,'#22303c',.8)+path(`M700,60 L800,30 L860,100 L760,130 Z`,'#1c2a36',.8)
  +snowfall(r,26);},
elephant(r){ return G('e',[[0,'#2a3038'],[.5,'#3a444e'],[1,'#12181e']])+rect(0,0,W,H,'url(#e)')
  +path(`M0,150 L180,60 L340,160 L520,40 L720,140 L900,90 L900,500 L0,500 Z`,'#171e26')
  +sea(r,330,'#31424e','#0f171e')
  +rect(0,400,W,100,'#242c34')
  +Array.from({length:2},(_,i)=>{const x=340+i*160;
    return path(`M${x-52},430 q8,-22 52,-22 q44,0 52,22 z`,'#0e1319');}).join('')
  +RG('eg',[[0,'#f2b24a',.5],[1,'#000',0]])+circ(450,442,26,'url(#eg)')
  +men(r,436,10,'#0a0e12',340)+snowfall(r,30);},
caird(r){ return G('k',[[0,'#232c36'],[.45,'#141c26'],[1,'#0a1118']])+rect(0,0,W,H,'url(#k)')
  +sea(r,180,'#31434f','#0d151d')
  +path(`M-80,260 Q300,180 500,300 T980,280 L980,520 L-80,520 Z`,'#101922',.9)
  +`<g transform="translate(470,268) rotate(-7)">`
  +path(`M-40,0 q8,13 40,13 q32,0 40,-13 l-5,-5 l-70,0 z`,'#161c22')
  +`<line x1="-6" y1="-4" x2="-2" y2="-46" stroke="#1c242c" stroke-width="3"/>`
  +path(`M-2,-46 l26,10 l-24,12 z`,'#8a8a7a',.9)+`</g>`
  +snowfall(r,36);},
georgia(r){ return G('g2',[[0,'#26303c'],[.5,'#54606c'],[1,'#8f9aa4']])+rect(0,0,W,H,'url(#g2)')
  +path(`M0,320 L140,120 L260,300 L420,70 L580,280 L720,120 L900,300 L900,500 L0,500 Z`,'#1c242e')
  +path(`M0,320 L140,120 L260,300 L420,70 L580,280 L720,120 L900,300`,'none',.6,` stroke="#dfe8ee" stroke-width="3"`)
  +path(`M0,400 Q450,360 900,400 L900,500 L0,500 Z`,'#cfdae2')
  +Array.from({length:3},(_,i)=>circ(430+i*14,398-i*4,3,'#10161c')).join('')
  +circ(860,80,20,'#f2e8c8',.7);},
stromness(r){ return G('s2',[[0,'#3a4650'],[.55,'#5a6870'],[1,'#2a343c']])+rect(0,0,W,H,'url(#s2)')
  +path(`M0,220 L200,90 L380,240 L620,80 L900,230 L900,500 L0,500 Z`,'#242e38')
  +sea(r,380,'#3a4c58','#141e26')
  +Array.from({length:4},(_,i)=>{const x=280+i*90;
    return rect(x,330,64,36,'#3c342c')+path(`M${x},330 l32,-18 l32,18 z`,'#2a241e')
      +rect(x+48,296,8,36,'#241e18');}).join('')
  +`<path d="M336,300 q4,-40 -2,-60 q12,24 8,60" fill="#c8ccd0" opacity=".6"/>`
  +Array.from({length:3},(_,i)=>circ(180+i*14,300+i*3,3.4,'#0c1014')).join('')
  +snowfall(r,14);},
rescueart(r){ return G('rr',[[0,'#2c3844'],[.5,'#4a5a66'],[1,'#1a242e']])+rect(0,0,W,H,'url(#rr)')
  +sea(r,300,'#3d5260','#101a22')
  +ship(300,320,.85,1,true)
  +`<path d="M300,240 q6,-30 -2,-48 q14,20 10,48" fill="#c8ccd0" opacity=".7"/>`
  +rect(0,420,W,80,'#242c34')
  +men(r,432,14,'#0a0e12',420)
  +RG('rg2',[[0,'#f2b24a',.7],[1,'#000',0]])+circ(620,440,34,'url(#rg2)')
  +path(`M612,446 l8,-16 l8,16 z`,'#f2c46a');},
};
function paint(container,key,seed){
  const r=rng(seed||key);
  const fn=P[key]||P.title;
  container.innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${fn.call(P,r)}</svg>`;
}
return { paint };
})();
