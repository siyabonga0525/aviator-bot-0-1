const rounds=[1.08,1.21,1.45,1.67,2.05,2.31,3.87,5.10];
const $=id=>document.getElementById(id);
const canvas=$("chart"),ctx=canvas.getContext("2d");

function updateStats(){
 const total=rounds.reduce((a,b)=>a+b,0);
 $("count").textContent=rounds.length;
 $("avg").textContent=(total/rounds.length).toFixed(2)+"x";
 $("high").textContent=Math.max(...rounds).toFixed(2)+"x";
 $("low").textContent=Math.min(...rounds).toFixed(2)+"x";
}
function renderRounds(){
 $("rounds").innerHTML=rounds.slice().reverse().map((r,i)=>
 `<div class="round">Round ${rounds.length-i}<br><b>${r.toFixed(2)}x</b></div>`).join("");
}
function resizeCanvas(){
 const dpr=window.devicePixelRatio||1;
 const rect=canvas.getBoundingClientRect();
 canvas.width=Math.max(300,Math.floor(rect.width*dpr));
 canvas.height=Math.max(220,Math.floor(rect.height*dpr));
 ctx.setTransform(dpr,0,0,dpr,0,0);
 draw(rect.width,rect.height);
}
function draw(w,h){
 ctx.clearRect(0,0,w,h);
 const left=28,right=18,top=20,bottom=30;
 ctx.strokeStyle="#292929";ctx.lineWidth=1;
 for(let i=0;i<5;i++){
   const y=top+(h-top-bottom)*i/4;
   ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(w-right,y);ctx.stroke();
 }
 const max=Math.max(6,...rounds), span=Math.max(1,rounds.length-1);
 ctx.strokeStyle="#ed2525";ctx.lineWidth=3;ctx.beginPath();
 rounds.forEach((r,i)=>{
   const x=left+(w-left-right)*i/span;
   const y=h-bottom-(r/max)*(h-top-bottom);
   i?ctx.lineTo(x,y):ctx.moveTo(x,y);
 });
 ctx.stroke();
 rounds.forEach((r,i)=>{
   const x=left+(w-left-right)*i/span;
   const y=h-bottom-(r/max)*(h-top-bottom);
   ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();
 });
}
function refresh(){updateStats();renderRounds();resizeCanvas();}
$("addRound").onclick=()=>{
 const samples=[1.12,1.36,1.58,1.92,2.44,2.76,3.25,4.18,6.02];
 rounds.push(samples[Math.floor(Math.random()*samples.length)]);
 refresh();
};
$("alertBtn").onclick=()=>{
 const messages=["Demo notification: sample round recorded.","Demo notification: statistics updated.","Demo notification: simulated round added."];
 const box=$("alertBox");
 box.textContent=messages[Math.floor(Math.random()*messages.length)];
 box.classList.add("active");
};
$("openDashboard").onclick=()=>document.querySelector(".section-title").scrollIntoView({behavior:"smooth"});
window.addEventListener("resize",resizeCanvas);
refresh();
