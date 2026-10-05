const quests={
 algorithms:{badge:'ALGORITHMS',title:'The Two-Sum Trial',description:'Think aloud through a coding problem. Build a clear approach, then analyze its complexity.',objectives:['Clarify the problem','Explain your approach','State time and space complexity'],question:'Given an array and a target, find two numbers that sum to the target. How would you approach this?',hint:'Consider a hash map of values you have already seen. Explain why this makes lookups efficient.'},
 structures:{badge:'DATA STRUCTURES',title:'The Cache Keeper',description:'Choose a structure that fits the problem. Balance lookup speed, ordering, and memory.',objectives:['Compare candidate structures','Explain the operations needed','Consider memory tradeoffs'],question:'How would you implement a cache that removes the least recently used item when full?',hint:'Think about combining fast key lookup with a structure that maintains access order.'},
 system:{badge:'SYSTEM DESIGN',title:'The Architect’s Gate',description:'Turn requirements into a system. Practice explaining components and tradeoffs to your AI interviewer.',objectives:['Clarify functional requirements','Sketch the main components','Explain scaling tradeoffs'],question:'Design a URL shortener. What requirements would you clarify before describing the architecture?',hint:'Ask about read/write volume, link expiration, and whether custom aliases are needed.'},
 backend:{badge:'BACKEND',title:'The Reliability Quest',description:'Reason about services under pressure. Diagnose failure and explain your recovery strategy.',objectives:['Identify failure modes','Protect data consistency','Describe your recovery plan'],question:'A client retries a payment request after a timeout. How would you prevent charging twice?',hint:'Explore idempotency keys and how the server tracks requests that already completed.'},
 behavioral:{badge:'BEHAVIORAL',title:'The Storyteller’s Trial',description:'Make your experience understandable. Show how you collaborate, learn, and take ownership.',objectives:['Set the context briefly','Describe your contribution','Reflect on what you learned'],question:'Tell me about a time you were stuck on a technical problem. How did you make progress?',hint:'Structure your answer around situation, action, outcome, and what you would do differently.'}
};
let selected='algorithms';
const encounter=document.querySelector('#encounter');
const start=document.querySelector('#start');
document.querySelectorAll('[data-skill]').forEach(button=>button.addEventListener('click',()=>{
 selected=button.dataset.skill;const quest=quests[selected];
 document.querySelectorAll('[data-skill]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});
 document.querySelector('#quest-badge').textContent=quest.badge;
 document.querySelector('#quest-title').textContent=quest.title;
 document.querySelector('#quest-description').textContent=quest.description;
 const objectives=document.querySelector('#objectives');objectives.replaceChildren();
 quest.objectives.forEach(text=>{const li=document.createElement('li');li.textContent=text;objectives.append(li);});
 document.querySelector('.quest-meta').firstElementChild.textContent=selected==='system'?'DESIGN ENCOUNTER':selected==='behavioral'?'STORY ENCOUNTER':'TECHNICAL ENCOUNTER';
 encounter.hidden=true;start.hidden=false;
}));
start.addEventListener('click',()=>{document.querySelector('#quest-question').textContent=quests[selected].question;document.querySelector('#quest-hint').hidden=true;encounter.hidden=false;start.hidden=true;document.querySelector('#hint').focus();});
document.querySelector('#hint').addEventListener('click',()=>{const hint=document.querySelector('#quest-hint');hint.textContent=quests[selected].hint;hint.hidden=false;});
document.querySelector('#dismiss').addEventListener('click',()=>{encounter.hidden=true;start.hidden=false;start.focus();});
