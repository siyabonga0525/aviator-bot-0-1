const rounds=[1.08,1.21,1.45,1.67,2.05,2.31,3.87,5.10];
const countEl=document.getElementById('count'),avgEl=document.getElementById('avg'),highEl=document.getElementById('high'),lowEl=document.getElementById('low');
const roundsEl=document.getElementById('rounds'), canvas=document.getElementById('chart'), ctx=canvas.getContext('2d');

function stats(){const sum=rounds.reduce((a,b)=>a+b,0);countEl.textContent=rounds.length;avgEl.textContent=(sum/rounds.length).toFixed(2)+'x';highEl.textContent=Math.max(...rounds).toFixed(2)+'x';lowEl.textContent=Math.min(...rounds).toFixed(2)+'x';}
function renderRounds(){roundsEl.innerHTML=rounds.slice().reverse().map((r,i)=>`<div class="round">#${rounds.length-i}<br>${r.toFixed(2)}x</div>`).join('');}
function draw(){const w=canvas.width,h=canvas.height,p=35;ctx.clearRect(0,0,w,h);ctx.strokeStyle='#333';ctx.lineWidth=1;for(let i=0;i<5;i++){const y=p+(h-2*p)*i/4;ctx.beginPath();ctx.moveTo(p,y);ctx.lineTo(w-p,y);ctx.stroke();}const max=Math.max(...rounds,6);ctx.strokeStyle='#e52b27';ctx.lineWidth=4;ctx.beginPath();rounds.forEach((r,i)=>{const x=p+(w-2*p)*i/Math.max(rounds.length-1,1);const y=h-p-(r/max)*(h-2*p);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();rounds.forEach((r,i)=>{const x=p+(w-2*p)*i/Math.max(rounds.length-1,1);const y=h-p-(r/max)*(h-2*p);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill()});}
function refresh(){stats();renderRounds();draw();}
document.getElementById('addRound').onclick=()=>{const demo=[1.12,1.36,1.58,1.92,2.44,2.76,3.25,4.18,6.02];rounds.push(demo[Math.floor(Math.random()*demo.length)]);refresh();};
document.getElementById('alertBtn').onclick=()=>{const box=document.getElementById('alertBox');const labels=['Demo notification: sample round recorded.','Demo notification: statistics updated.','Demo notification: new simulated round available.'];box.textContent=labels[Math.floor(Math.random()*labels.length)];box.classList.add('active');};
document.getElementById('openDashboard').onclick=()=>document.querySelector('h2').scrollIntoView({behavior:'smooth'});
refresh();
