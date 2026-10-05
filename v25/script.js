// Temporary page state only. Feedback and history are always predefined.
const focusData={
 technical:{name:'Time & Space Analysis',reason:'You explained O(n) time, but left out O(n) extra space. Make both costs explicit in your next explanation.',gap:'Your single-pass approach was clear. The extra memory required by the hash map was missing.',prompt:'Explain why the hash map gives O(n) time and requires O(n) extra space.',steps:['Explain why each number is visited once.','State O(n) time and O(n) extra space.','Describe what the hash map stores as the input grows.']},
 reasoning:{name:'Edge-case Reasoning',reason:'The sample answer does not walk through duplicates. Make the order of operations visible in your next attempt.',gap:'You chose an efficient lookup, but did not show why the same index cannot be used twice.',prompt:'Retry Two Sum with [3, 3] and target 6. Explain why you check before inserting.',steps:['Walk through [3, 3] with target 6.','Check the complement before inserting the current value.','Explain why this avoids using the same index twice.']},
 communication:{name:'Clear Communication',reason:'The sample response moves straight into the solution. Clarify assumptions before explaining the loop.',gap:'The explanation has a useful sequence, but the assumptions and hash-map contents need to come first.',prompt:'Retry Two Sum. State your assumptions, explain the map, then walk through the loop.',steps:['Clarify whether to return indices or values.','Explain what the hash map contains and why it helps.','Use signposts: approach, example, then complexity.']}
};
const $=selector=>document.querySelector(selector);
const all=selector=>[...document.querySelectorAll(selector)];
let selectedFocus='technical',active=false,startedAt=0,timerId=null,currentView='home',cyclePhase='return';
const viewLabels={home:'Practice Home',rehearse:'Rehearse / Interview',reflect:'Reflect / Feedback',return:'Return / Next Practice',history:'Practice History'};
function showView(name,moveFocus=true){
 if(!Object.hasOwn(viewLabels,name))name='home';
 currentView=name;if(!active&&name==='return'&&cyclePhase==='reflect')cyclePhase='return';
 all('.workspace-view').forEach(view=>view.hidden=view.id!==name);
 all('[data-view]').forEach(link=>{const current=link.dataset.view===name;link.classList.toggle('is-active',current);if(current)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 $('#view-label').textContent=viewLabels[name];syncWorkspace();
 if(moveFocus)$('#'+name+' h1').focus();
 window.scrollTo(0,0);
}
function selectFocus(key){
 if(!Object.hasOwn(focusData,key))return;
 selectedFocus=key;const item=focusData[key];
 all('[data-focus-name]').forEach(node=>node.textContent=item.name);
 $('#home-gap').textContent=item.gap;$('#home-next').textContent=item.prompt;
 $('#focus-reason').textContent=item.reason;$('#return-prompt').textContent=item.prompt;
 $('#practice-plan').replaceChildren();item.steps.forEach(text=>{const li=document.createElement('li');li.textContent=text;$('#practice-plan').append(li);});
 all('[data-focus]').forEach(button=>{const chosen=button.dataset.focus===key;button.setAttribute('aria-pressed',String(chosen));button.closest('.feedback-detail').classList.toggle('selected',chosen);button.textContent=(chosen?'✓ Selected: ':'○ Choose: ')+focusData[button.dataset.focus].name;button.setAttribute('aria-label',button.textContent+(button.dataset.focus==='technical'?' (recommended)':''));});
 if(!active){$('#session-focus-name').textContent=item.name;$('#session-focus').textContent=item.prompt;}
 const comparisons={technical:['Named O(n) time','Left the map’s memory cost unexplained.','Explain both costs','Connect the lookup choice to time and memory.'],reasoning:['Described the lookup','Did not test duplicate values.','Walk through [3, 3]','Show why checking before insertion matters.'],communication:['Jumped into the loop','Left assumptions and map contents implicit.','Lead with assumptions','Explain the map before describing the loop.']};
 const comparison=comparisons[key];$('#home-objective').textContent=comparison[2]+'.';['last-attempt','last-detail','next-attempt','next-detail'].forEach((id,index)=>$('#'+id).textContent=comparison[index]);
 syncWorkspace();
}
function tick(){const elapsed=Math.floor((Date.now()-startedAt)/1000);$('#timer').textContent=String(Math.floor(elapsed/60)).padStart(2,'0')+':'+String(elapsed%60).padStart(2,'0');}
function startInterview(){
 showView('rehearse');
 if(active){$('#notes').focus();return;}
 active=true;cyclePhase='rehearse';const item=focusData[selectedFocus];startedAt=Date.now();tick();timerId=setInterval(tick,1000);
 $('#session-focus-name').textContent=item.name;$('#session-focus').textContent=item.prompt;
 $('#greeting').textContent='Welcome back. This attempt has one focus: '+item.name+'. Talk me through your reasoning.';
 $('#question-label').textContent='01 / QUESTION';$('#status').textContent='● Sample interview in progress';
 $('#notes').disabled=false;$('#notes').value='';$('#finish').disabled=false;$('#room-start').hidden=true;
 all('[data-start]').forEach(button=>button.textContent='Resume Interview →');syncWorkspace();
 $('#notes').focus();
}
all('[data-view]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();showView(link.dataset.view);}));
all('[data-start]').forEach(button=>button.addEventListener('click',startInterview));
all('[data-focus]').forEach(button=>button.addEventListener('click',()=>selectFocus(button.dataset.focus)));
$('#finish').addEventListener('click',()=>{
 if(!active)return;
 active=false;cyclePhase='reflect';clearInterval(timerId);timerId=null;$('#finish').disabled=true;$('#notes').disabled=true;$('#room-start').hidden=false;
 $('#status').textContent='✓ Sample session complete';$('#room-start').textContent='Start Focused Interview →';
 all('[data-start]').forEach(button=>button.textContent=button.classList.contains('new-interview')?'New Interview ＋':'Start Focused Interview →');
 $('#review-status').textContent='Sample finished. Choose one focus to bring into your next attempt.';
 showView('reflect');
});
function syncWorkspace(){
 const order=['rehearse','reflect','return'],index=order.indexOf(cyclePhase);
 all('[data-cycle]').forEach(link=>{const step=order.indexOf(link.dataset.cycle);const state=index<0?'next':step<index?'completed':step===index?'current':'next';link.dataset.state=state;link.querySelector('.cycle-marker').textContent={completed:'✓',current:'●',next:'○'}[state];link.setAttribute('aria-label',viewLabels[link.dataset.cycle]+': '+state);});
 const action=$('#sidebar-action');action.hidden=!active&&currentView!=='reflect';action.disabled=false;
 if(currentView==='rehearse'&&active){action.textContent='● Interview in progress';action.disabled=true;}
 else if(active)action.textContent='Resume Interview →';
 else action.textContent='Review Interview Room →';
}
$('#sidebar-action').addEventListener('click',()=>{if(active)startInterview();else showView('rehearse');});
selectFocus('technical');showView('home',false);
