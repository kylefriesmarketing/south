/* =====================================================================
   SOUTH — audio.js. Generative WebAudio. No files.
   Wind, sea, ice-groan, and a lantern motif that only rings while Hope
   holds. At high hope, a faint banjo-plink — vital mental medicine.
   ===================================================================== */
const AUDIO = (() => {
let ctx=null, master=null, lp=null, current=null, muted=false;
let hope=4, motifTimer=null, pulseTimer=null;

const CFG = {
  title:    { noise:'wind', nf:['bandpass',420,.7], root:45, drone:[0,7],    motif:2 },
  beset:    { noise:'wind', nf:['bandpass',380,.7], root:45, drone:[0,7],    motif:2, creak:1 },
  crush:    { noise:'wind', nf:['bandpass',300,.5], root:41, drone:[0,1],    motif:0, creak:1 },
  floecamp: { noise:'wind', nf:['bandpass',450,.7], root:46, drone:[0,7],    motif:2, banjo:1 },
  march:    { noise:'wind', nf:['bandpass',700,.5], root:44, drone:[0,5],    motif:1 },
  boats:    { noise:'ocean',nf:['lowpass',500,.9],  root:43, drone:[0,5],    motif:1 },
  elephant: { noise:'ocean',nf:['lowpass',420,.9],  root:44, drone:[0,3,7],  motif:1, banjo:1 },
  caird:    { noise:'storm',nf:['bandpass',600,.4], root:40, drone:[0,1],    motif:1 },
  georgia:  { noise:'wind', nf:['bandpass',900,.4], root:48, drone:[0,7],    motif:2 },
  stromness:{ noise:'wind', nf:['bandpass',600,.5], root:52, drone:[0,7,12], motif:3, warm:1 },
};
const MOTIF=[0,7,12,14,12,7];   // the Boss's promise, rising and holding
const midiHz=m=>440*Math.pow(2,(m-69)/12);

function ensure(){ if(ctx) return true;
  try{ ctx=new (window.AudioContext||window.webkitAudioContext)();
    master=ctx.createGain(); master.gain.value=muted?0:.5;
    lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=2200;
    lp.connect(master); master.connect(ctx.destination); return true;
  }catch(e){ return false; } }
function noiseBuf(){ const b=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1; return b; }
function stopCurrent(){
  if(motifTimer){clearTimeout(motifTimer);motifTimer=null;}
  if(pulseTimer){clearInterval(pulseTimer);pulseTimer=null;}
  if(!current) return;
  const t=ctx.currentTime;
  current.gains.forEach(g=>{try{g.gain.setTargetAtTime(0,t,.6);}catch(e){}});
  const dead=current;
  setTimeout(()=>dead.nodes.forEach(n=>{try{n.stop?n.stop():n.disconnect();}catch(e){}}),2200);
  current=null;
}
function osc(type,f,g0,dest){ const o=ctx.createOscillator(),g=ctx.createGain();
  o.type=type;o.frequency.value=f;g.gain.value=0;
  g.gain.setTargetAtTime(g0,ctx.currentTime,1.6);
  o.connect(g);g.connect(dest);o.start(); return {o,g}; }
function bell(f,v=.12,d=2.2,t='sine'){ if(!ctx||muted) return;
  const o=ctx.createOscillator(),g=ctx.createGain(),now=ctx.currentTime;
  o.type=t;o.frequency.value=f;
  g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(v,now+.02);
  g.gain.exponentialRampToValueAtTime(.0001,now+d);
  o.connect(g);g.connect(lp);o.start(now);o.stop(now+d+.1); }
function plink(f){ bell(f,.05,.5,'triangle'); setTimeout(()=>bell(f*1.5,.03,.4,'triangle'),70); }
function scheduleMotif(cfg,root){
  if(motifTimer) clearTimeout(motifTimer);
  const go=()=>{ if(!current) return;
    const lvl=Math.max(0,hope);
    if(cfg.motif>0&&lvl>=2){
      MOTIF.slice(0,2+Math.min(4,lvl-1)).forEach((n,i)=>
        setTimeout(()=>bell(midiHz(root+12+n),.045+.011*lvl,2.4,cfg.warm?'triangle':'sine'),i*430));
    }
    if(cfg.banjo&&lvl>=5){ setTimeout(()=>{ [0,4,7,4].forEach((n,i)=>setTimeout(()=>plink(midiHz(root+24+n)),i*160)); },2600); }
    motifTimer=setTimeout(go,Math.max(4000,9500-lvl*900-cfg.motif*1300+Math.random()*4000));
  };
  motifTimer=setTimeout(go,1700);
}
function setScene(key,ch,hopeLvl){
  hope=hopeLvl;
  if(!ensure()) return;
  if(ctx.state==='suspended') ctx.resume();
  const cfg=CFG[key]||CFG.title;
  stopCurrent();
  const root=cfg.root;
  lp.frequency.setTargetAtTime(cfg.warm?3400:Math.max(380,1900-(ch||0)*120),ctx.currentTime,1.2);
  const nodes=[],gains=[];
  cfg.drone.forEach((iv,ix)=>{ const f=midiHz(root+iv);
    const a=osc(cfg.warm?'triangle':'sawtooth',f,(ix===0?.05:.026)*(cfg.warm?1.3:1),lp);
    a.o.detune.value=ix%2?5:-5; nodes.push(a.o); gains.push(a.g);
    if(!cfg.warm){ const b2=osc('sine',f/2,.038,lp); nodes.push(b2.o); gains.push(b2.g); } });
  const src=ctx.createBufferSource(); src.buffer=noiseBuf(); src.loop=true;
  const f=ctx.createBiquadFilter(),g=ctx.createGain(); g.gain.value=0;
  f.type=cfg.nf[0];f.frequency.value=cfg.nf[1];f.Q.value=cfg.nf[2];
  src.connect(f);f.connect(g);g.connect(lp);
  g.gain.setTargetAtTime({wind:.06,ocean:.1,storm:.14}[cfg.noise]||.06,ctx.currentTime,2);
  const lfo=ctx.createOscillator(),lg=ctx.createGain();
  lfo.frequency.value=cfg.noise==='storm'?.15:.06; lg.gain.value=cfg.nf[1]*.5;
  lfo.connect(lg);lg.connect(f.frequency);lfo.start();
  src.start(); nodes.push(src,lfo); gains.push(g);
  current={nodes,gains};
  if(pulseTimer) clearInterval(pulseTimer);
  if(cfg.creak) pulseTimer=setInterval(()=>{ if(muted)return;
    bell(midiHz(root+1),.06,2.2,'sawtooth'); },5600);
  scheduleMotif(cfg,root);
}
function sting(kind){
  if(!ctx||muted) return;
  if(kind==='death') bell(midiHz(31),.32,3.6);
  else if(kind==='survive') [0,4,7,12].forEach((n,i)=>setTimeout(()=>bell(midiHz(55+n),.11,2.2,'triangle'),i*170));
  else if(kind==='true') [0,4,7,12,16,19,24].forEach((n,i)=>setTimeout(()=>bell(midiHz(55+n),.1,2.8,'triangle'),i*210));
  else bell(midiHz(55),.06,.8);
}
function toggleMute(){ muted=!muted;
  if(master) master.gain.setTargetAtTime(muted?0:.5,ctx.currentTime,.2);
  return muted; }
return { setScene, sting, toggleMute };
})();
