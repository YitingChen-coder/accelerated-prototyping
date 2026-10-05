const spaces=[
 {title:'Take your seat',copy:'Start a mock interview to put your token in play. The sample board follows one coding question from first thoughts to reflection.'},
 {title:'Clarify the problem',copy:'Sample prompt: find two numbers in an array that sum to a target. Ask whether you return values or indices, and whether exactly one solution exists.'},
 {title:'Make your move',copy:'How would you approach the two-sum problem? Talk through a simple solution before writing any code.'},
 {title:'Think out loud',copy:'Explain why your approach works. A realistic AI mock interview practices the conversation alongside the solution.'},
 {title:'Your coach asks',copy:'Sample follow-up: can you remember numbers you have already seen to avoid checking every pair?'},
 {title:'Test your idea',copy:'Try [3, 3] with target 6. How do you ensure you use two distinct indices?'},
 {title:'Review the tradeoff',copy:'A hash-map approach uses O(n) time and O(n) extra space. Explain both parts of the tradeoff.'},
 {title:'Get your feedback',copy:'Illustrative feedback: clear reasoning is a strength; stating space complexity explicitly could make the answer stronger. The product gives personalized feedback after each interview.'},
 {title:'Pick one focus',copy:'Choose a concrete improvement: state complexity and walk through one edge case before you finish.'},
 {title:'Practice again',copy:'Explain the approach again with that focus in mind. Improvement comes from making the next attempt deliberate.'},
 {title:'Find your rhythm',copy:'Practice different coding, system design, and behavioral questions with your AI coach. Keep the habit of explaining and reflecting.'},
 {title:'The real interview',copy:'You have explored a practice-to-feedback loop. The board is a sample; the product prepares you for realistic SWE conversations, one mock interview at a time.'}
];
const buttons=[...document.querySelectorAll('[data-space]')];const token=document.querySelector('.token');let position=0,playing=false;
function inspect(index){document.querySelector('#space-label').textContent='SPACE '+String(index+1).padStart(2,'0');document.querySelector('#space-title').textContent=spaces[index].title;document.querySelector('#space-copy').textContent=spaces[index].copy;}
function move(index){buttons.forEach(b=>b.removeAttribute('aria-current'));position=index;buttons[index].setAttribute('aria-current','step');buttons[index].append(token);inspect(index);}
buttons.forEach(button=>button.addEventListener('click',()=>inspect(Number(button.dataset.space))));
document.querySelector('#start').addEventListener('click',()=>{playing=true;move(0);document.querySelector('#start').hidden=true;document.querySelector('#turn-controls').hidden=false;document.querySelector('#reset').hidden=false;document.querySelector('#roll').disabled=false;document.querySelector('#die').textContent='?';document.querySelector('#space-copy').textContent='Your sample interview begins: given an array and target, find the indices of two numbers that sum to the target. Roll to explore the practice loop.';document.querySelector('#turn-status').textContent='Your token is at Start.';document.querySelector('#roll').focus();});
document.querySelector('#roll').addEventListener('click',()=>{if(!playing||position===11)return;const roll=Math.floor(Math.random()*3)+1;document.querySelector('#die').textContent=roll;move(Math.min(11,position+roll));document.querySelector('#turn-status').textContent=position===11?'You reached the final space. Reset to try again.':'Moved '+roll+' spaces. Your token is on '+String(position+1).padStart(2,'0')+'.';if(position===11){playing=false;document.querySelector('#roll').disabled=true;}});
document.querySelector('#reset').addEventListener('click',()=>{playing=false;move(0);document.querySelector('#start').hidden=false;document.querySelector('#turn-controls').hidden=true;document.querySelector('#reset').hidden=true;document.querySelector('#start').focus();});
