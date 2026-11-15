<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>CHESS MIND AI</title><meta name="color-scheme" content="dark">
<style>
:root{--bg:#1e1f22;--pn:#2a2c30;--tx:#e8e8e8;--mu:#9aa0a6;--g:#4caf50;color-scheme:dark;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
html{scroll-padding-top:env(safe-area-inset-top,0px)}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:15px/1.45 system-ui,sans-serif}
nav{display:flex;gap:6px;overflow-x:auto;padding:8px;background:var(--pn);position:sticky;top:env(safe-area-inset-top,0px);z-index:5}
nav b{color:var(--g);white-space:nowrap;align-self:center;margin-right:6px}
button,.btn{background:#3a3d42;color:var(--tx);border:0;border-radius:8px;padding:8px 12px;cursor:pointer;font:inherit;white-space:nowrap}
button.on,button.pri{background:var(--g);color:#06220a;font-weight:600}button:disabled{opacity:.5}
main{max-width:1000px;margin:auto;padding:10px}.v{display:none}.v.on{display:block}
.card{background:var(--pn);border-radius:12px;padding:12px;margin:10px 0}.mu{color:var(--mu)}
.row{display:flex;gap:12px;flex-wrap:wrap}.col{flex:1 1 320px;min-width:0}.tb{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px}.stats div{background:#34373c;border-radius:10px;padding:10px}.stats b{display:block;font-size:22px;color:var(--g)}
.bw{display:flex;gap:6px;max-width:520px}.bar{width:16px;background:#222;border-radius:4px;position:relative;overflow:hidden;flex:none}.bar i{position:absolute;left:0;right:0;bottom:0;background:#eee;transition:height .3s}
.bd{position:relative;flex:1;aspect-ratio:1}.grid{display:grid;grid-template-columns:repeat(8,1fr);height:100%}
.sq{display:flex;align-items:center;justify-content:center;position:relative}.lt{background:#ebecd0}.dk{background:#739552}
.lm{box-shadow:inset 0 0 0 100px #f6f66980}.sel{box-shadow:inset 0 0 0 100px #4caf5099}.lg::after{content:"";width:28%;height:28%;border-radius:50%;background:#0003;position:absolute}
.pc{cursor:grab;line-height:1}.pc.w{color:#fff;text-shadow:0 0 2px #000,0 0 2px #000,0 0 1px #000}.pc.b{color:#1a1a1a}.bd svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.badge{display:inline-block;padding:1px 9px;border-radius:10px;color:#111;font-weight:600;font-size:12px}
.mv{display:inline-block;margin:2px;padding:3px 7px;border-radius:6px;background:#34373c;cursor:pointer}.mv.on{outline:2px solid var(--g)}
textarea,input,select{background:#1a1b1e;color:var(--tx);border:1px solid #444;border-radius:8px;padding:8px;width:100%;font:inherit}textarea{min-height:110px}
.cg{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:6px}.cg span{background:#34373c;border-radius:8px;padding:6px 8px}
.err{color:#ff8a80}.gi{display:flex;justify-content:space-between;gap:8px;align-items:center;padding:6px 0;border-bottom:1px solid #3a3d42}
</style></head><body>
<nav><b>♞ CHESS MIND AI</b><button data-v="home" class="on">Home</button><button data-v="rev">Game Review</button><button data-v="live">Live Analysis</button><button data-v="set">Settings</button><span id="est" class="badge" style="background:#777;align-self:center;margin-left:auto">Engine: loading…</span></nav>
<main>
<div id="eerr" class="err"></div>
<section id="home" class="v on"><div class="card"><h2 style="margin:0">Analyse every move. Hindi style.</h2><p class="mu">Real Stockfish analysis, Mauj Kar Di to Hag Diya.</p><div class="tb"><button class="pri" data-go="rev">Game Review</button><button class="pri" data-go="live">Live Analysis</button></div></div>
<div class="stats" id="hst"></div><div class="card"><b>Recent Games</b><div id="hlist"></div></div></section>

<section id="rev" class="v"><div class="card"><textarea id="pgn" placeholder="Paste PGN here…"></textarea><div class="tb"><input type="file" id="pf" accept=".pgn,.txt" style="width:auto"><button class="pri" id="rgo">Analyse game</button><button id="rstop" disabled>Cancel</button></div><div id="rprog" class="mu"></div></div>
<div id="rout" style="display:none"><div class="card" id="rsum"></div><div class="card"><b>Evaluation graph</b> <span class="mu">(tap to jump)</span><svg id="rgr" viewBox="0 0 300 80" style="width:100%;height:90px;background:#1a1b1e;border-radius:8px"></svg></div>
<div class="row"><div class="col"><div class="bw"><div class="bar" id="rbar"><i></i></div><div class="bd" id="rb"></div></div>
<div class="tb"><button id="r0">⏮</button><button id="rp">◀</button><button id="rpl">▶ Play</button><button id="rn">▶|</button><button id="r9">⏭</button><button id="rf">Flip</button></div></div>
<div class="col"><div class="card" id="rdet"></div><div id="rex"></div></div></div>
<div class="card"><b>Moves</b><div id="rmoves"></div><div class="tb"><button id="rcopy">Show / copy PGN</button><button id="rrep">Show / copy report</button><button id="rsave">Delete this review</button></div><textarea id="rbox" style="display:none" readonly></textarea></div></div></section>

<section id="live" class="v"><div class="row"><div class="col"><div class="bw"><div class="bar" id="lbar"><i></i></div><div class="bd" id="lb"></div></div>
<div class="tb"><button id="lu">Undo</button><button id="lr">Redo</button><button id="ln">Restart</button><button id="lf">Flip</button><button id="le">Engine ON/OFF</button></div>
<div class="tb"><input id="fen" placeholder="FEN" style="flex:1"><button id="lfen">Load FEN</button></div><div id="ferr" class="err"></div></div>
<div class="col"><div class="card"><div id="lst" class="mu"></div><div id="lan">Make a move.</div></div><div class="card"><b>Moves</b><div id="lmoves"></div></div></div></div></section>

<section id="set" class="v"><div class="card"><label>Analysis depth <b id="dv"></b></label><input type="range" id="depth" min="6" max="18"><p class="mu">Higher is stronger but slower (this engine runs in your browser).</p><div class="tb"><button id="seng">Engine ON/OFF</button></div></div>
<div class="card"><b>Classification thresholds (centipawn loss, max)</b><div id="ths" class="cg"></div></div></section>
</main>
<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js"></script>
<script>
const $=s=>document.querySelector(s),START="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const NM={mauj:"Mauj Kar Di",great:"Bahut Badhiya Hai",best:"Badhiya Hai",exc:"Thik Thak Hai",good:"Thik Hai",inacc:"Kar Diya Miss",mist:"Kar Di Na Galti",blun:"Hag Diya"};
const CL={mauj:"#26c9c3",great:"#5b8bd9",best:"#4caf50",exc:"#8bc34a",good:"#b5c26a",inacc:"#f0b429",mist:"#f08a29",blun:"#e5534b"};
const GL={p:"♟",n:"♞",b:"♝",r:"♜",q:"♛",k:"♚"},V={p:1,n:3,b:3,r:5,q:9};
const BOOK=[["King’s Pawn Game","e4"],["Queen’s Pawn Game","d4"],["English Opening","c4"],["Réti Opening","Nf3"],["Open Game","e4 e5"],["Italian Game","e4 e5 Nf3 Nc6 Bc4"],["Giuoco Piano","e4 e5 Nf3 Nc6 Bc4 Bc5"],["Two Knights Defense","e4 e5 Nf3 Nc6 Bc4 Nf6"],["Ruy Lopez","e4 e5 Nf3 Nc6 Bb5"],["Ruy Lopez, Morphy Defense","e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O"],["Ruy Lopez, Berlin Defense","e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4"],["Scotch Game","e4 e5 Nf3 Nc6 d4 exd4 Nxd4"],["Petrov Defense","e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4"],["King’s Gambit","e4 e5 f4 exf4"],["Vienna Game","e4 e5 Nc3 Nf6"],["Sicilian Defense","e4 c5"],["Sicilian, Najdorf","e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6"],["Sicilian, Dragon","e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6"],["Sicilian, Sveshnikov","e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 e5"],["Sicilian, Alapin","e4 c5 c3 Nf6 e5 Nd5 d4 cxd4"],["French Defense","e4 e6 d4 d5"],["French, Advance","e4 e6 d4 d5 e5"],["French, Winawer","e4 e6 d4 d5 Nc3 Bb4"],["French, Tarrasch","e4 e6 d4 d5 Nd2"],["Caro-Kann Defense","e4 c6 d4 d5"],["Caro-Kann, Advance","e4 c6 d4 d5 e5 Bf5"],["Caro-Kann, Classical","e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6"],["Scandinavian Defense","e4 d5 exd5 Qxd5 Nc3 Qa5"],["Pirc Defense","e4 d6 d4 Nf6 Nc3 g6"],["Alekhine’s Defense","e4 Nf6 e5 Nd5 d4 d6"],["Queen’s Gambit","d4 d5 c4"],["Queen’s Gambit Declined","d4 d5 c4 e6 Nc3 Nf6 Bg5"],["Queen’s Gambit Accepted","d4 d5 c4 dxc4"],["Slav Defense","d4 d5 c4 c6 Nf3 Nf6 Nc3"],["Nimzo-Indian Defense","d4 Nf6 c4 e6 Nc3 Bb4"],["Queen’s Indian Defense","d4 Nf6 c4 e6 Nf3 b6"],["King’s Indian Defense","d4 Nf6 c4 g6 Nc3 Bg7 e4 d6"],["Grünfeld Defense","d4 Nf6 c4 g6 Nc3 d5"],["London System","d4 d5 Nf3 Nf6 Bf4"],["Dutch Defense","d4 f5"],["English, Symmetrical","c4 c5"],["English, Reversed Sicilian","c4 e5"],["King’s Indian Attack","Nf3 d5 g3"],["Réti, Queen’s Gambit","Nf3 d5 c4"],["Bird’s Opening","f4 d5"]].map(([n,s])=>[n,s.split(" ")]);
const theoryAt=(sans,k)=>BOOK.some(([n,l])=>l.length>k&&l.slice(0,k+1).every((x,j)=>x==sans[j]));
const openingAt=(sans,k)=>{let b="";let bl=0;for(const[n,l]of BOOK)if(l.length<=k+1&&l.length>bl&&l.every((x,j)=>x==sans[j])){b=n;bl=l.length}return b};
let TH={best:5,exc:20,good:50,inacc:100,mist:250},S={depth:10,on:true};
try{Object.assign(TH,JSON.parse(localStorage.cmi_th||"{}"));Object.assign(S,JSON.parse(localStorage.cmi_s||"{}"))}catch(e){}
const saveS=()=>{try{localStorage.cmi_th=JSON.stringify(TH);localStorage.cmi_s=JSON.stringify(S)}catch(e){}};
const cl1=x=>Math.max(-1000,Math.min(1000,x)),win=cp=>50+50*(2/(1+Math.exp(-.00368208*cl1(cp)))-1);
const accOf=(wb,wa)=>Math.max(0,Math.min(100,103.1668*Math.exp(-.04354*Math.max(0,wb-wa))-3.1669));
const fmt=cp=>cp==null?"–":Math.abs(cp)>=9000?(cp>0?"#":"-#")+(10000-Math.abs(cp)):(cp>0?"+":"")+(cp/100).toFixed(2);
const esc=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
const U=u=>u?{from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]}:null;
function sanOf(fen,u){if(!u)return"–";const m=new Chess(fen).move(U(u));return m?m.san:u}
function pvSan(fen,pv,n=6){const g=new Chess(fen),o=[];for(const u of(pv||[]).slice(0,n)){const m=u&&g.move(U(u));if(!m)break;o.push(m.san)}return o.join(" ")}

/* ---------- Engine (Stockfish.js in a Web Worker) ---------- */
const Eng={w:null,ready:false,q:Promise.resolve(),h:null,
init(){try{const url=URL.createObjectURL(new Blob(['importScripts("https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js")'],{type:"text/javascript"}));
 this.w=new Worker(url);this.w.onmessage=e=>{const l=String(e.data);if(l=="uciok")this.w.postMessage("isready");else if(l=="readyok"){this.ready=true;est("ready")}else if(this.h)this.h(l)};
 this.w.onerror=()=>est("error");this.w.postMessage("uci");setTimeout(()=>{if(!this.ready)est("error")},30000)}catch(e){est("error")}},
stop(){this.w&&this.ready&&this.w.postMessage("stop")},
analyze(fen,d){this.q=this.q.catch(()=>{}).then(()=>new Promise((res,rej)=>{if(!this.ready)return rej(new Error("Engine not ready"));
 let sc=null,pv="";const stm=fen.split(" ")[1];
 this.h=l=>{if(l.startsWith("info")&&/ score /.test(l)&&!/bound/.test(l)){const m=l.match(/score (cp|mate) (-?\d+)/);if(m){let v=+m[2];if(m[1]=="mate")v=(v>0?1:-1)*(10000-Math.abs(v));sc=stm=="w"?v:-v;const p=l.match(/ pv (.*)/);if(p)pv=p[1]}}
  else if(l.startsWith("bestmove")){this.h=null;res({cp:sc,best:l.split(" ")[1],pv:pv.split(" ").filter(Boolean)})}};
 this.w.postMessage("position fen "+fen);this.w.postMessage("go depth "+d)}));return this.q},
async evalFor(fen,d){const g=new Chess(fen);if(g.in_checkmate())return{cp:g.turn()=="w"?-10000:10000,best:null,pv:[]};if(g.game_over())return{cp:0,best:null,pv:[]};
 const r=await this.analyze(fen,d);if(r.cp==null)throw new Error("No evaluation");return r}};
function est(s){const e=$("#est");e.textContent="Engine: "+(s=="ready"?"ready":s=="error"?"failed":"loading…");e.style.background=s=="ready"?"#4caf50":s=="error"?"#e5534b":"#777";
 $("#eerr").textContent=s=="error"?"Stockfish could not start in this page. No analysis is shown (nothing is faked). The board still works for play.":""}

/* ---------- Grading ---------- */
function grade(fb,fa,pe,ev,mv,prev,k,sans){const s=mv.color=="w"?1:-1,cb=cl1(pe.cp)*s,ca=cl1(ev.cp)*s,cpl=Math.max(0,cb-ca),u=mv.from+mv.to+(mv.promotion||"");
 let c=u==pe.best||cpl<=TH.best?"best":cpl<=TH.exc?"exc":cpl<=TH.good?"good":cpl<=TH.inacc?"inacc":cpl<=TH.mist?"mist":"blun";
 if(c=="best"&&u==pe.best){const att=new Chess(fa).moves({verbose:true}).some(m=>m.to==mv.to&&m.captured);
  const sac=att&&V[mv.piece]>=3&&(V[mv.captured]||0)<V[mv.piece]-1&&!mv.promotion;
  if(sac&&ca>=-50&&cb<400)c="mauj";else if((prev=="mist"||prev=="blun")&&ca>=100)c="great"}
 return{san:mv.san,color:mv.color,uci:u,fb,fa,cls:c,cpl:Math.round(cpl),before:pe.cp,after:ev.cp,best:pe.best,bestSan:sanOf(fb,pe.best),pv:pvSan(fb,pe.pv),theory:theoryAt(sans,k),opening:openingAt(sans,k)}}
const EX={mauj:"Piece sacrifice that the engine confirms keeps the position sound.",great:"Strong move that punishes the opponent’s previous error.",best:"Matches the engine’s top choice (or loses almost nothing).",exc:"Very small evaluation loss.",good:"Reasonable, the position stays playable.",inacc:"Gives away a noticeable part of the advantage.",mist:"Clearly worsens the position.",blun:"Major error that seriously damages the position."};
const badge=c=>`<span class="badge" style="background:${CL[c]}">${NM[c]}</span>`,thb=`<span class="badge" style="background:#c9a227">Theory Move</span>`;
const detail=m=>`${badge(m.cls)} ${m.theory?thb:""}<div style="margin-top:6px"><b>${esc(m.san)}</b> (${m.color=="w"?"White":"Black"}) · Best: <b>${esc(m.bestSan)}</b></div>
<div>Eval ${fmt(m.before)} → ${fmt(m.after)} · CP loss <b>${m.cpl}</b></div><div class="mu">${EX[m.cls]}${m.theory?" Opening book: "+esc(m.opening)+".":""}</div>${m.pv?`<div class="mu">Line: ${esc(m.pv)}</div>`:""}`;

/* ---------- Board ---------- */
const boards=[];
function mkBoard(el,onMove){const B={flip:false,fen:START,sel:null,last:null,arrow:null,locked:false,render(){
 const g=new Chess(B.fen),bd=g.board(),leg=B.sel?g.moves({square:B.sel,verbose:true}).map(m=>m.to):[];let h="";
 for(let r=0;r<8;r++)for(let c=0;c<8;c++){const R=B.flip?7-r:r,C=B.flip?7-c:c,sq="abcdefgh"[C]+(8-R),p=bd[R][C],k=["sq",(R+C)%2?"dk":"lt"];
  if(B.last&&(sq==B.last[0]||sq==B.last[1]))k.push("lm");if(sq==B.sel)k.push("sel");if(leg.includes(sq))k.push("lg");
  h+=`<div class="${k.join(" ")}" data-sq="${sq}">${p?`<span class="pc ${p.color}" draggable="true" data-sq="${sq}">${GL[p.type]}</span>`:""}</div>`}
 let a="";if(B.arrow){const P=s=>{const f="abcdefgh".indexOf(s[0]),rk=+s[1];return[(B.flip?7-f:f)+.5,(B.flip?rk-1:8-rk)+.5]},[x1,y1]=P(B.arrow.slice(0,2)),[x2,y2]=P(B.arrow.slice(2,4));
  a=`<defs><marker id="${el.id}m" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0,0L4,2L0,4z" fill="#26c9c3"/></marker></defs><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#26c9c3" stroke-width=".16" opacity=".85" marker-end="url(#${el.id}m)"/>`}
 el.innerHTML=`<div class="grid">${h}</div><svg viewBox="0 0 8 8">${a}</svg>`;el.firstChild.style.fontSize=(el.clientWidth/10)+"px"}};
 const go=(f,t)=>{if(B.locked||f==t)return false;const ok=onMove({from:f,to:t,promotion:"q"});if(!ok)return false;return true};
 el.onclick=e=>{const q=e.target.closest(".sq");if(!q||B.locked)return;const sq=q.dataset.sq,g=new Chess(B.fen);
  if(B.sel&&sq!=B.sel&&go(B.sel,sq))return;const p=g.get(sq);B.sel=p&&p.color==g.turn()&&sq!=B.sel?sq:null;B.render()};
 el.ondragstart=e=>{const p=e.target.closest(".pc");if(!p||B.locked){e.preventDefault();return}B.sel=p.dataset.sq;e.dataTransfer.setData("text/plain",B.sel)};
 el.ondragover=e=>e.preventDefault();el.ondrop=e=>{e.preventDefault();const q=e.target.closest(".sq");if(q&&B.sel&&!go(B.sel,q.dataset.sq)){B.sel=null;B.render()}};
 boards.push(B);return B}
addEventListener("resize",()=>boards.forEach(b=>b.render()));
const setBar=(id,cp)=>{$(id+" i").style.height=win(cp)+"%"};

/* ---------- Navigation / settings / home ---------- */
function show(v){document.querySelectorAll(".v").forEach(e=>e.classList.toggle("on",e.id==v));document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.v==v));if(v=="home")home();boards.forEach(b=>b.render())}
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>show(b.dataset.v));document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>show(b.dataset.go));
const lib=()=>{try{return JSON.parse(localStorage.cmi_games||"[]")}catch(e){return[]}};
const putLib=a=>{try{localStorage.cmi_games=JSON.stringify(a)}catch(e){alert("Could not save (storage full or blocked).")}};
function home(){const L=lib(),acc=L.map(r=>(r.wAcc+r.bAcc)/2),best=L.reduce((b,r)=>Math.max(b,r.wAcc,r.bAcc),0);
 $("#hst").innerHTML=`<div>Games analysed<b>${L.length}</b></div><div>Average accuracy<b>${L.length?(acc.reduce((a,b)=>a+b,0)/L.length).toFixed(1)+"%":"–"}</b></div><div>Best performance<b>${L.length?best.toFixed(1)+"%":"–"}</b></div>`;
 $("#hlist").innerHTML=L.length?L.slice().reverse().map(r=>`<div class="gi"><span>${esc(r.white)} vs ${esc(r.black)} <span class="mu">${esc(r.result)} · ${r.wAcc.toFixed(0)}/${r.bAcc.toFixed(0)}%</span></span><span><button data-o="${r.id}">Open</button> <button data-d="${r.id}">Delete</button></span></div>`).join(""):'<p class="mu">No reviews yet.</p>'}
$("#hlist").onclick=e=>{const o=e.target.dataset.o,d=e.target.dataset.d;if(o){const r=lib().find(x=>x.id==o);if(r){show("rev");loadRec(r)}}if(d){putLib(lib().filter(x=>x.id!=d));home()}};
function setUI(){$("#depth").value=S.depth;$("#dv").textContent=S.depth;$("#ths").innerHTML=Object.keys(TH).map(k=>`<span>${k}<input type="number" data-k="${k}" value="${TH[k]}"></span>`).join("")}
$("#depth").oninput=e=>{S.depth=+e.target.value;$("#dv").textContent=S.depth;saveS()};
$("#ths").oninput=e=>{const v=+e.target.value;if(e.target.dataset.k&&v>=0){TH[e.target.dataset.k]=v;saveS()}};
const toggleEng=()=>{S.on=!S.on;saveS();if(!S.on)Eng.stop();alert("Engine "+(S.on?"ON":"OFF"));liveUpdate()};$("#seng").onclick=$("#le").onclick=toggleEng;

/* ---------- Live analysis ---------- */
const L={g:new Chess(),redo:[],fens:[START],cls:[],cache:{},tok:0};
L.B=mkBoard($("#lb"),m=>{const r=L.g.move(m);if(!r)return false;L.redo=[];L.fens.push(L.g.fen());liveUpdate();return true});
const stat=g=>g.in_checkmate()?"Checkmate – "+(g.turn()=="w"?"Black":"White")+" wins":g.in_stalemate()?"Stalemate":g.in_draw()?"Draw":(g.turn()=="w"?"White":"Black")+" to move"+(g.in_check()?" (check)":"");
async function liveUpdate(){const t=++L.tok,g=L.g,fen=g.fen(),h=g.history({verbose:true}),last=h[h.length-1];
 L.B.fen=fen;L.B.sel=null;L.B.last=last?[last.from,last.to]:null;L.B.arrow=null;L.B.render();$("#lst").textContent=stat(g);
 $("#lmoves").innerHTML=h.map((m,i)=>`<span class="mv">${i%2?"":(i/2+1)+". "}${esc(m.san)}${L.cls[i]?` <span style="color:${CL[L.cls[i].cls]}">●</span>`:""}</span>`).join("")||'<span class="mu">–</span>';
 if(!S.on){$("#lan").textContent="Engine is OFF.";return}Eng.stop();$("#lan").textContent="Analysing…";
 try{const ev=L.cache[fen]=L.cache[fen]||await Eng.evalFor(fen,S.depth);if(t!=L.tok)return;setBar("#lbar",ev.cp);L.B.arrow=ev.best;L.B.render();
  let o=`<div><b>Eval ${fmt(ev.cp)}</b> (White’s view, depth ${S.depth})</div><div>Best: <b>${esc(sanOf(fen,ev.best))}</b></div><div class="mu">Line: ${esc(pvSan(fen,ev.pv))}</div>`;
  if(last){const pf=L.fens[L.fens.length-2],pe=L.cache[pf]=L.cache[pf]||await Eng.evalFor(pf,S.depth);if(t!=L.tok)return;
   const sans=h.map(m=>m.san),k=h.length-1,r=grade(pf,fen,pe,ev,last,L.cls[k-1]&&L.cls[k-1].cls,k,sans);L.cls[k]=r;o=detail(r)+"<hr>"+o;
   $("#lmoves").children[k]&&($("#lmoves").children[k].innerHTML+=` <span style="color:${CL[r.cls]}">●</span>`)}
  $("#lan").innerHTML=o}catch(e){if(t==L.tok)$("#lan").innerHTML='<span class="err">Engine unavailable: '+esc(e.message)+"</span>"}}
$("#lu").onclick=()=>{const m=L.g.undo();if(m){L.redo.push({from:m.from,to:m.to,promotion:m.promotion});L.fens.pop();L.cls.length=L.g.history().length;liveUpdate()}};
$("#lr").oncli
