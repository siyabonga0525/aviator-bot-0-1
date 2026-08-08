let state={balance:1000,rounds:0,wins:0,losses:0,pnl:0,history:[]};
const $=id=>document.getElementById(id);
function render(){
 $('balance').textContent=state.balance.toLocaleString();
 $('rounds').textContent=state.rounds;
 $('wins').textContent=state.wins;
 $('losses').textContent=state.losses;
 $('pnl').textContent=(state.pnl>=0?'+':'')+state.pnl.toFixed(0);
 $('rate').textContent=state.rounds?Math.round(state.wins/state.rounds*100)+'%':'0%';
 $('history').innerHTML=state.history.length?state.history.map(r=>`<div class="history-row"><span>#${r.id} • ${r.mult.toFixed(2)}x</span><span class="${r.win?'win':'loss'}">${r.win?'WIN':'LOSS'} ${r.change>=0?'+':''}${r.change}</span></div>`).join(''):'No rounds yet.';
}
function runRound(){
 let stake=Math.max(1,Math.min(1000,Number($('stake').value)||50));
 if(stake>state.balance){$('result').textContent='Not enough virtual credits.';return;}
 let mult=1.01+Math.random()*4.99;
 let cashout=2.0;
 let win=mult>=cashout;
 let change=win?Math.round(stake*(cashout-1)):-stake;
 state.balance+=change; state.pnl+=change; state.rounds++;
 win?state.wins++:state.losses++;
 state.history.unshift({id:state.rounds,mult,win,change});
 state.history=state.history.slice(0,12);
 $('result').textContent=`Demo multiplier: ${mult.toFixed(2)}x • Practice result: ${win?'WIN':'LOSS'} • ${change>=0?'+':''}${change} virtual credits`;
 render();
}
$('roundBtn').onclick=runRound;
$('startBtn').onclick=()=>document.querySelector('.card').scrollIntoView({behavior:'smooth'});
render();