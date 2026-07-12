/* =====================================================================
   SOUTH — engine.js
   You are the Boss. Vitals are the nation's: HOPE (the master), UNITY,
   STRENGTH, STORES — plus the only number that matters: the men.
   ===================================================================== */
(() => {
const NODES=STORY.nodes, ENDINGS=STORY.endings, REGIONS=STORY.regions;
const VITALS=['hope','unity','strength','stores'];
const DEATHS={ hope:'e_dark', unity:'e_split', strength:'e_frozen', stores:'e_hunger' };
const K_P='south_persist', K_R='south_run';
const $=id=>document.getElementById(id);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

function loadP(){ try{ const p=JSON.parse(localStorage.getItem(K_P)); if(p) return Object.assign(defP(),p); }catch(e){}
  return defP(); }
function defP(){ return { runs:0, endings:{}, best:0, allHands:false, lastTitle:null, lastKind:null }; }
function saveP(){ localStorage.setItem(K_P, JSON.stringify(P)); }
let P=loadP();

function newRun(){ return { node:'n_beset', v:{hope:4,unity:4,strength:4,stores:4},
  men:27, months:0, flags:{} }; }
let S=null;
function saveRun(){ if(S) localStorage.setItem(K_R, JSON.stringify(S)); }
function clearRun(){ localStorage.removeItem(K_R); }
function loadRun(){ try{ return JSON.parse(localStorage.getItem(K_R)); }catch(e){ return null; } }

const fmt=t=>String(typeof t==='function'?t(S,P):t);

function show(id){ ['title-screen','game-screen','ending-screen','gallery']
  .forEach(s=>$(s).classList.toggle('hidden', s!==id)); }

/* ---------------- scene painter: image first, SVG fallback ------------ */
function paintScene(el, key, seed){
  if (typeof IMAGES!=='undefined' && IMAGES.has(key)){
    const cur=el.querySelector('img.scene-img');
    if(cur && cur.dataset.key===key) return;
    const img=document.createElement('img');
    img.className='scene-img'; img.dataset.key=key; img.alt='';
    img.style.opacity='0';
    img.onerror=()=>ART.paint(el,key,seed);
    const reveal=()=>{ setTimeout(()=>{img.style.opacity='1';},30);
      // only the still-current image may clean house — stale timers must not delete newer scenes
      setTimeout(()=>{ if(el.lastElementChild===img)
        [...el.children].forEach(c=>{if(c!==img)c.remove();}); },1000); };
    img.onload=reveal; img.src=IMAGES.url(key); el.appendChild(img);
    if(img.complete&&img.naturalWidth>0) reveal();
  } else ART.paint(el, key, seed);
}

/* ---------------- title ---------------- */
function titleScreen(){
  show('title-screen');
  paintScene($('title-art'),'title','r'+P.runs);
  AUDIO.setScene('title',0,4);
  $('btn-continue').classList.toggle('hidden', !loadRun());
  $('title-residue').innerHTML = P.runs
    ? (P.allHands ? 'All safe, all well — you have done the impossible thing. It is still there to do again.'
       : (P.lastTitle?`Last expedition: “${P.lastTitle}.” The best you have brought home: ${P.best} of 27.`:''))
    : '';
}
$('btn-begin').onclick=()=>{ S=newRun(); show('game-screen'); render(S.node); };
$('btn-continue').onclick=()=>{ const r=loadRun(); if(!r) return titleScreen();
  S=r; show('game-screen'); render(S.node); };

/* ---------------- galleries ---------------- */
$('gallery-close').onclick=titleScreen;
$('btn-outcomes').onclick=()=>{
  const ids=Object.keys(ENDINGS);
  $('gallery-title').textContent='How the Ice Wrote It';
  $('gallery-body').innerHTML=`<div class="gallery-sub">${ids.filter(i=>P.endings[i]).length} of ${ids.length} outcomes witnessed</div>
    <div class="grid-cells">`+ids.map(i=>{ const e=ENDINGS[i];
      return P.endings[i]
        ? `<div class="cell k-${e.kind}"><span class="ek">${e.kind==='true'?'all hands':e.kind==='survive'?'survived':'lost'}</span>${typeof e.title==='function'?'Worn Through':e.title}</div>`
        : `<div class="cell locked">— unwritten —</div>`; }).join('')+`</div>`;
  show('gallery');
};
$('btn-crew').onclick=()=>{
  $('gallery-title').textContent='All Hands';
  $('gallery-body').innerHTML=`<div class="gallery-sub">The men you are carrying. Every one of them real; every one of them, historically, came home.</div>`
    +Object.values(STORY.crew).map(c=>
      `<div class="crew-entry"><div class="crew-name">${c.name}</div><div class="crew-role">${c.role}</div><div class="crew-note">${c.note}</div></div>`).join('');
  show('gallery');
};

/* ---------------- rail: the drift of months + chapter ---------------- */
function paintRail(){
  const reg=REGIONS[NODES[S.node].region];
  let s=`<svg viewBox="0 0 42 500" preserveAspectRatio="xMidYMin meet">`;
  s+=`<text x="21" y="26" text-anchor="middle" font-size="8" fill="#5f6a72" font-family="sans-serif" letter-spacing="2">CH</text>`;
  s+=`<text x="21" y="46" text-anchor="middle" font-size="17" fill="#e0a84a" font-family="sans-serif" font-weight="800">${reg.ch}</text>`;
  STORY.CHAPTERS.forEach((c,i)=>{
    const y=80+i*44, on=i+1===reg.ch, done=i+1<reg.ch;
    s+=`<circle cx="21" cy="${y}" r="${on?6:4}" fill="${on?'#e0a84a':done?'#4a5560':'none'}" stroke="${on?'#e0a84a':'#2a3540'}" stroke-width="1.5"/>`;
    if(i<STORY.CHAPTERS.length-1) s+=`<line x1="21" y1="${y+8}" x2="21" y2="${y+36}" stroke="#1d2833" stroke-width="1.5"/>`;
    if(on) s+=`<circle cx="21" cy="${y}" r="10" fill="none" stroke="#e0a84a" stroke-width="1" opacity=".4"><animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite"/></circle>`;
  });
  $('clock-rail').innerHTML=s+`</svg>`;
}

/* ---------------- HUD ---------------- */
const VMETA={ hope:['#e0a84a','Hope — the nation believes what it reads on your face. This is the master supply, and only you issue it.'],
  unity:['#7cc47a','Unity — one nation or two. Mutiny is not a shout; it is one tired sentence agreed with silently.'],
  strength:['#8fb8d6','Strength — the bodies. You can spend them like stores, and the cold keeps perfect books.'],
  stores:['#c9a35c','Stores — seal, blubber, pemmican. Every mouth you keep is a bet placed on the future.'] };
function paintHUD(){
  let h='<div class="hud-panel">';
  VITALS.forEach(k=>{ const v=clamp(S.v[k],0,6), c=VMETA[k][0];
    h+=`<div class="vital${v<=1?' low':''}${k==='hope'?' master':''}" title="${VMETA[k][1]}" style="color:${c}">
      <span class="v-name">${k}</span><div class="v-segs">${Array.from({length:6},(_,i)=>
        `<i class="${i<v?'on':''}"${i<v?` style="background:${c};box-shadow:0 0 5px ${c}66"`:''}></i>`).join('')}</div></div>`; });
  h+=`<div class="hud-sep"></div>
    <div class="men-count" title="The men. The only number history will ask you about."><b>${S.men}</b><span>of 27 men</span></div></div>`;
  $('hud').innerHTML=h;
}

/* ---------------- render ---------------- */
function render(nodeId){
  const n=NODES[nodeId];
  if(!n){ console.error('missing node',nodeId); return titleScreen(); }
  S.node=nodeId;
  const reg=REGIONS[n.region];
  paintScene($('scene-art'), n.region, nodeId+P.runs);
  AUDIO.setScene(n.region, reg.ch, S.v.hope);
  paintRail(); paintHUD();
  $('region-name').textContent=reg.name;
  $('node-title').textContent=fmt(n.title);
  $('node-text').innerHTML=fmt(n.text);
  const box=$('choices'); box.innerHTML='';
  n.choices.forEach(c=>{
    if(c.req && !c.req(S,P)) return;
    const b=document.createElement('button'); b.className='choice';
    b.innerHTML=(c.pre?`<span class="c-pre">${c.pre}</span>`:'')+fmt(c.t);
    b.onclick=()=>choose(c);
    box.appendChild(b);
  });
  $('text-panel').scrollTop=0;
  saveRun();
}

function choose(c){
  VITALS.forEach(k=>{ if(c[k]!==undefined) S.v[k]=clamp(S.v[k]+c[k],0,6); });
  if(c.men) S.men=clamp(S.men+c.men,0,27);
  if(c.month) S.months+=c.month;
  if(c.fx) c.fx(S,P);
  const endId=typeof c.end==='function'?c.end(S,P):c.end;
  if(endId) return ending(endId);
  for(const k of VITALS) if(S.v[k]<=0) return ending(DEATHS[k]);
  if(c.go) render(typeof c.go==='function'?c.go(S,P):c.go);
  else titleScreen();
}

/* ---------------- endings ---------------- */
function ending(id){
  const e=ENDINGS[id];
  if(!e){ console.error('missing ending',id); return titleScreen(); }
  P.runs++; P.endings[id]=(P.endings[id]||0)+1;
  P.lastTitle=fmt(e.title); P.lastKind=e.kind;
  if(e.kind!=='death') P.best=Math.max(P.best, S?S.men:0);
  if(e.kind==='true') P.allHands=true;
  saveP(); clearRun();
  AUDIO.sting(e.kind==='death'?'death':e.kind==='true'?'true':'survive');
  paintScene($('ending-art'), e.art, id+P.runs);
  AUDIO.setScene(e.art==='rescueart'?'stromness':e.art, 9, e.kind==='death'?0:6);
  $('ending-kind').textContent = e.kind==='death'?'the ice wrote the ending':(e.kind==='true'?'the boast of the age':'you came back');
  $('ending-kind').className='k-'+e.kind;
  $('ending-title').textContent=fmt(e.title);
  $('ending-text').innerHTML=fmt(e.text);
  $('ending-men').textContent = e.kind==='death' ? '' :
    (S ? `${S.men} of 27 men brought home · ${S.months+20} months on the ice` : '');
  show('ending-screen');
}
$('btn-again').onclick=titleScreen;

/* ---------------- debug (~) & mute (m) ---------------- */
document.addEventListener('keydown',e=>{
  const inField=e.target&&e.target.matches&&e.target.matches('input,select,textarea');
  if(!inField){
    if(!$('game-screen').classList.contains('hidden') && /^[1-9]$/.test(e.key)){
      const b=[...document.querySelectorAll('#choices .choice')][+e.key-1];
      if(b){ b.focus(); b.click(); return; }
    } else if(!$('ending-screen').classList.contains('hidden') && e.key==='Enter'){
      return $('btn-again').click();
    }
  }
  if(e.key==='`'||e.key==='~'){
    const d=$('debug-panel'); d.classList.toggle('hidden');
    if(d.classList.contains('hidden')) return;
    d.innerHTML=`<b>~ the boss’s lantern</b>
      <div class="dbg-row">node <select id="dbg-node">${Object.keys(NODES).map(k=>`<option ${S&&S.node===k?'selected':''}>${k}</option>`).join('')}</select>
      <button id="dbg-go">go</button></div>
      <div class="dbg-row">${VITALS.map(k=>`${k.slice(0,4)} <input id="dbg-${k}" size="1" value="${S?S.v[k]:4}">`).join(' ')}
      men <input id="dbg-men" size="2" value="${S?S.men:27}"> <button id="dbg-apply">apply</button></div>`;
    $('dbg-go').onclick=()=>{ if(!S){S=newRun();show('game-screen');} render($('dbg-node').value); };
    $('dbg-apply').onclick=()=>{ if(!S)return;
      VITALS.forEach(k=>S.v[k]=clamp(+$('dbg-'+k).value||0,0,6));
      S.men=clamp(+$('dbg-men').value||27,0,27); render(S.node); };
  } else if(e.key==='m' && !e.target.matches('input,select')) AUDIO.toggleMute();
});

titleScreen();
})();
