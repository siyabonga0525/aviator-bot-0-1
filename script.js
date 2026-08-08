let balance=1000,rounds=0,wins=0,losses=0,profit=0,best=0;
const $=id=>document.getElementById(id);
function render(){
 $('balance').textContent=balance.toLocaleString();
 $('rounds').textContent=rounds;
 $('wins').textContent=wins;
 $('losses').textContent=losses;
 $('profit').textContent=(profit>=0?'+':'')+profit;
 const rate=rounds?Math.round(wins/rounds*100):0;
 $('winRate').textContent=rate+'%';
 $('perfRate').textContent=rate+'%';
 $('bar').style.width=rate+'%';
 $('best').textContent=best?best.toFixed(2)+'x':'—';
}
function runRound(){
 let stake=Math.floor(Number($('stake').value));
 if(!Number.isFinite(stake)||stake<1) stake=1;
 if(stake>balance){$('status').textContent='Not enough virtual credits.';return}
 balance-=stake;
 const multiplier=+(1.01+Math.random()*5.49).toFixed(2);
 const cashout=2.00;
 const won=multiplier>=cashout;
 const result=won?Math.floor(stake*cashout):0;
 if(won){balance+=result;wins++;profit+=result-stake}
 else{losses++;profit-=stake}
 rounds++; if(multiplier>best)best=multiplier;
 $('cashout').textContent=cashout.toFixed(2)+'x';
 $('status').textContent=`Round ${rounds}: ${multiplier.toFixed(2)}x — ${won?'WIN':'LOSS'} (demo only)`;
 const row=document.createElement('div');
 row.innerHTML=`<span>#${rounds} • ${multiplier.toFixed(2)}x</span><b>${won?'WIN':'LOSS'}</b>`;
 const history=$('history'); if(history.textContent==='No rounds yet.')history.textContent='';
 history.prepend(row); render();
}
$('runBtn').addEventListener('click',runRound);
$('startBtn').addEventListener('click',()=>{ $('status').textContent='Practice mode started. Choose a virtual stake and run a demo round.'; window.scrollTo({top:document.querySelector('.card').offsetTop-20,behavior:'smooth'});});
$('alertBtn').addEventListener('click',()=>{
 const messages=['Demo alert: practice round available.','Demo alert: virtual round generated.','Demo alert: remember, past rounds do not predict future outcomes.'];
 $('alert').textContent=messages[Math.floor(Math.random()*messages.length)];
});
$('menu').addEventListener('click',()=>alert('Aviator Bot 0.6 — Educational demo only.'));
render();
