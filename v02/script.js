const docs = {
 welcome: {name:'welcome.md', title:'Your interview prep,<br>in your element.', body:'An AI-powered mock interview coach for software engineers. Realistic conversations, personalized feedback, and a clearer path to your next interview.'},
 coding: {name:'coding.py',title:'Think aloud.<br>Then write the code.',body:'Practice algorithms and data structures with an AI interviewer. Explain your approach, work through follow-ups, and learn where your reasoning or complexity analysis needs work.'},
 system: {name:'system-design.md',title:'Build the system.<br>Explain the tradeoffs.',body:'Rehearse requirements, architecture, and scaling decisions with an AI interviewer. Get feedback on how clearly you connect your design choices to the problem.'},
 behavioral: {name:'behavioral.md',title:'Your experience.<br>A clearer story.',body:'Practice telling stories about teamwork, debugging, and learning. The AI coach helps you spot gaps in structure and make your contribution easier to understand.'},
 feedback: {name:'feedback.json',title:'A review you can<br>actually use.',body:'After a realistic mock interview, personalized feedback highlights your strengths, gaps, and next practice focus. Improve your reasoning, communication, and solution one session at a time.'}
};
const doc = document.querySelector('#document');
const original = doc.innerHTML;
function bindStart(){doc.querySelector('[data-start]').addEventListener('click',start);}
document.querySelectorAll('[data-file]').forEach(button=>button.addEventListener('click',()=>{
 const info=docs[button.dataset.file];
 document.querySelectorAll('[data-file]').forEach(b=>b.classList.toggle('selected',b===button));
 doc.innerHTML=original;
 doc.querySelector('h1').innerHTML=info.title;
 doc.querySelector('.intro').textContent=info.body;
 document.querySelector('#tab-name').textContent='◇ '+info.name;
 document.querySelector('#crumb').textContent=info.name;
 document.querySelector('#output').textContent='[ready] '+info.name+' opened. Start a session when you’re ready.';
 bindStart();
}));
function start(){
 doc.innerHTML='<p class="comment">// Local sample interview — coding</p><h1>Let’s talk through<br>your approach.</h1><p>Given an array of integers, find two numbers that add up to a target. What would you try first, and why?</p><label class="practice-label" for="answer">Your approach</label><textarea class="practice-answer" id="answer" placeholder="Explain your reasoning..."></textarea><button class="secondary" id="review">Show feedback checklist</button><div id="checklist" role="status"></div>';
 document.querySelector('#output').textContent='[session] Sample question loaded. No live AI or data storage.';
 document.querySelector('#coach-message').innerHTML='<span class="label">INTERVIEWER</span><p>Before writing code, ask about edge cases. Then explain how you would track numbers you have already seen.</p>';
 document.querySelector('#review').addEventListener('click',()=>{
 const answer=document.querySelector('#answer');
 if(!answer.value.trim()){document.querySelector('#checklist').textContent='Write your approach first so you can review it against the checklist.';answer.focus();return;}
 document.querySelector('#checklist').innerHTML='<div class="feedback-note"><strong>Self-review checklist · sample</strong><p>Did you explain the hash-map lookup, avoid reusing the same index, and state O(n) time and O(n) space? This checklist is predefined, not an AI evaluation.</p></div>';
 });
 document.querySelector('#answer').focus();
}
bindStart();
