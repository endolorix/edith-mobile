const $=s=>document.querySelector(s);
const openChat=()=>{ 
  $(".status").textContent="Ouverture de ChatGPT…";
  // iOS décidera d'ouvrir l'app ChatGPT si son Universal Link est associé,
  // sinon Safari ouvre le site. Aucun faux clic vocal n'est simulé.
  window.location.href="https://chatgpt.com/";
};
$("#talk").addEventListener("click",openChat);
$("#chat").addEventListener("click",openChat);
$("#install").addEventListener("click",()=>$("#sheet").hidden=false);
$("#closeSheet").addEventListener("click",()=>$("#sheet").hidden=true);

const standalone=matchMedia("(display-mode: standalone)").matches || navigator.standalone;
const isiOS=/iPhone|iPad|iPod/.test(navigator.userAgent);
if(isiOS && !standalone) $("#install").style.display="inline-block";
if("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(()=>{});

const canvas=$("#orb"),ctx=canvas.getContext("2d");
let w=1,h=1,dpr=1,frame;
const points=[],count=720,links=[];
for(let i=0;i<count;i++){
  const phi=Math.acos(1-2*(i+.5)/count),theta=i*2.399963229728653;
  points.push({phi,theta,x:Math.sin(phi)*Math.cos(theta),y:Math.cos(phi),z:Math.sin(phi)*Math.sin(theta)});
}
for(let i=0;i<count;i++){
  const near=[],p=points[i];
  for(let j=0;j<count;j++){if(i===j)continue;const q=points[j],d=(p.x-q.x)**2+(p.y-q.y)**2+(p.z-q.z)**2;
    if(near.length<3||d<near[near.length-1].d){near.push({j,d});near.sort((a,b)=>a.d-b.d);if(near.length>3)near.pop();}}
  for(const n of near) if(n.j>i) links.push([i,n.j]);
}
function resize(){const r=canvas.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);dpr=Math.min(devicePixelRatio,1.5);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
new ResizeObserver(resize).observe(canvas);resize();
function render(now){
  frame=requestAnimationFrame(render);ctx.clearRect(0,0,w,h);
  const t=now*.00022,r=Math.min(w*.40,h*.36),cx=w*.5,cy=h*.52;
  const glow=ctx.createRadialGradient(cx,cy,r*.15,cx,cy,r*1.55);glow.addColorStop(0,"rgba(0,126,167,.05)");glow.addColorStop(.65,"rgba(0,112,147,.025)");glow.addColorStop(1,"rgba(0,0,0,0)");ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
  const pp=points.map(p=>{const th=p.theta+t*.6,ph=p.phi,ripple=1+.075*Math.sin(ph*6+th*3+t*2)+.035*Math.sin(th*7-ph*4-t*3);
    let x=Math.sin(ph)*Math.cos(th),y=Math.cos(ph),z=Math.sin(ph)*Math.sin(th);const tilt=.22,yy=y*Math.cos(tilt)-z*Math.sin(tilt);z=y*Math.sin(tilt)+z*Math.cos(tilt);y=yy;const sc=1+z*.15;
    return{x:cx+x*r*ripple*sc,y:cy+y*r*ripple*sc,z,a:.12+(z+1)*.32};});
  ctx.lineWidth=.65;for(const [a,b] of links){const p=pp[a],q=pp[b];ctx.strokeStyle=`rgba(83,195,237,${Math.min(p.a,q.a)*.58})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}
  for(let k=0;k<pp.length;k++){const p=pp[k],bright=k%7===0,s=bright?1.8:1.05;if(bright){ctx.shadowColor="rgba(92,219,255,.9)";ctx.shadowBlur=6}ctx.fillStyle=`rgba(140,227,255,${Math.min(1,p.a*(bright?1.55:1.1))})`;ctx.fillRect(p.x-s/2,p.y-s/2,s,s);ctx.shadowBlur=0}
}
frame=requestAnimationFrame(render);