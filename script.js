const state={balance:1000,rounds:0,wins:0,losses:0,pnl:0,best:0,history:[]};
const $=id=>document.getElementById(id);
function render(){
 $('balance').textContent=state.balance.toLocaleString();
 $('rounds').textContent=state.rounds;
 $('wins').textContent=state.wins;
 $('losses').textContent=state.losses;
 const rate=state.rounds?Math.round(state.wins/state.rounds*100):0;
 $('rate').textContent=rate+'%'; $('rate2').textContent=rate+'%';
 $('pnl').textContent=(state.pnl>=0?'+':'')+state.pnl;
 $('best').textContent=state.best?state.best.toFixed(2)+'x':'—';
 $('barFill').style.width=rate+'%';
 $('history').innerHTML=state.history.length?state.history.map(r=>`<div class="history-row"><span>#${r.id} • ${r.mult.toFixed(2)}x</span><span class="${r.win?'win':'loss'}">${r.win?'WIN':'LOSS'} ${r.change>=0?'+':''}${r.change}</span></div>`).join(''):'No rounds yet.';
}
function run(){
 const stake=Math.max(1,Math.min(1000,Number($('stake').value)||50));
 if(stake>state.balance){$('result').textContent='Not enough virtual credits.';return;}
 const mult=1.01+Math.random()*4.99, cash=2;
 const win=mult>=cash, change=win?Math.round(stake*(cash-1)):-stake;
 state.balance+=change;state.pnl+=change;state.rounds++;
 if(win)state.wins++;else state.losses++;
 state.best=Math.max(state.best,mult);
 state.history.unshift({id:state.rounds,mult,win,change});
 state.history=state.history.slice(0,15);
 $('result').textContent=`Demo result: ${mult.toFixed(2)}x • ${win?'WIN':'LOSS'} • ${change>=0?'+':''}${change} virtual credits`;
 render();
}
$('run').onclick=run;
$('start').onclick=()=>document.querySelector('.card').scrollIntoView({behavior:'smooth'});
$('alertBtn').onclick=()=>{$('alert').textContent='Demo alert: a simulated round notification was generated. It is not a prediction.'};
render();