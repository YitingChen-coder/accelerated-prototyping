const history=document.querySelector('#history');
const input=document.querySelector('#command-input');
const messages={
 tracks:'AVAILABLE TRACKS\n\n01  CODING         Algorithms, data structures, and thinking aloud\n02  SYSTEM DESIGN  Requirements, architecture, and tradeoffs\n03  BEHAVIORAL     Teamwork, learning, and telling your story\n\nEach track pairs realistic AI interview practice with personalized feedback.',
 feedback:'SAMPLE REVIEW / illustrative\n\n[+] Strength: You explained why a hash map helps.\n[!] Improve: State time and space complexity explicitly.\n[→] Next step: Walk through an edge case aloud.\n\nThe product’s personalized feedback helps turn practice into deliberate improvement.',
 about:'REHEARSE / your AI interview coach\n\nPractice → explain your reasoning → receive feedback → improve.\nBuilt for CS students and early-career SWE candidates.\nAn AI interviewer asks realistic questions and follow-ups; your review identifies strengths and gaps.\n\nThis page runs locally. No live AI evaluation or storage.',
 start:'MOCK INTERVIEW / local coding sample\n\nINTERVIEWER: Given an array of integers and a target, find the indices of two numbers that add up to the target.\n\nTalk through your approach aloud. What is the time complexity?\n\nNext: type “hint” for a follow-up or “review” for a self-review checklist.',
 hint:'INTERVIEWER / sample follow-up\n\nCould you remember numbers you have already seen?\nHow would you ensure the same array element is not used twice?',
 review:'SELF-REVIEW / predefined checklist\n\n[ ] Explain the hash-map lookup.\n[ ] Avoid reusing one index.\n[ ] Walk through duplicates or negative numbers.\n[ ] State O(n) time and O(n) space.\n\nThis is a sample checklist, not an evaluation of your answer.',
 help:'COMMANDS: tracks · feedback · about · start · clear\nDuring a sample interview: hint · review'
};
let session=false;
function run(raw){
 const command=raw.trim().toLowerCase().replace(/^rehearse\s+/,'').replace(/^--/,'');
 if(!command)return;
 if(command==='clear'){history.replaceChildren();session=false;input.value='';input.focus();return;}
 const block=document.createElement('div');block.className='history-block';
 const line=document.createElement('div');line.className='command';
 const prompt=document.createElement('span');prompt.className='prompt';prompt.textContent='candidate@rehearse ~ $';
 line.append(prompt,document.createTextNode(raw));
 const result=document.createElement('div');result.className='result';
 if((command==='hint'||command==='review')&&!session)result.textContent='No active sample interview. Run “start” first.';
 else result.textContent=messages[command]||'Command not found. Type “help” for available commands.';
 if(command==='start')session=true;
 block.append(line,result);history.append(block);input.value='';input.focus();block.scrollIntoView({block:'nearest'});
}
document.querySelector('#command-form').addEventListener('submit',event=>{event.preventDefault();run(input.value);});
document.querySelectorAll('[data-command]').forEach(button=>button.addEventListener('click',()=>run(button.dataset.command)));
document.querySelector('#start').addEventListener('click',()=>run('start'));
