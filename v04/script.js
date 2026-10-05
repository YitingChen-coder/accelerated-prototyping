const start=document.querySelector('#start');
const end=document.querySelector('#end');
const status=document.querySelector('#status');
const timer=document.querySelector('#timer');
let interval=null,startedAt=0;
function tick(){const seconds=Math.floor((Date.now()-startedAt)/1000);timer.textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');}
start.addEventListener('click',()=>{
 start.hidden=true;end.hidden=false;document.querySelector('#review').hidden=true;
 status.textContent='● Sample interview in progress';document.querySelector('#question-label').textContent='YOUR FIRST QUESTION';
 document.querySelector('#greeting').textContent='Let’s begin. Talk me through your approach to the problem on the right. What assumptions would you clarify first?';
 startedAt=Date.now();tick();interval=setInterval(tick,1000);document.querySelector('#notes').focus();
});
end.addEventListener('click',()=>{
 clearInterval(interval);interval=null;end.hidden=true;status.textContent='✓ Sample session complete';
 document.querySelector('#greeting').textContent='Nice work making time to practice. Use the self-review checklist to choose one thing to improve next time.';
 document.querySelector('#review').hidden=false;
});
document.querySelector('#again').addEventListener('click',()=>{
 clearInterval(interval);interval=null;start.hidden=false;end.hidden=true;document.querySelector('#review').hidden=true;
 status.textContent='● Ready when you are';timer.textContent='00:00';document.querySelector('#notes').value='';
 document.querySelector('#question-label').textContent='QUESTION PREVIEW';
 document.querySelector('#greeting').textContent='We’ll practice a realistic SWE interview, then review your reasoning, communication, and next steps.';
});
