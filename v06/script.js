const notes={lookup:'Good starting point: name the structure and explain why fast lookups help. A strong interview answer connects the tool to the problem.',order:'Checking first avoids matching the current element with itself. Explaining this ordering makes your reasoning easy to follow.',complexity:'Make the analysis complete: O(n) time and O(n) extra space. Mention the space tradeoff, not just the speed.'};
document.querySelectorAll('[data-note]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-note]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.querySelector('#annotation-note p').textContent=notes[button.dataset.note];
}));
document.querySelector('#start').addEventListener('click',()=>{
 const sample=document.querySelector('#sample');sample.hidden=false;sample.setAttribute('tabindex','-1');sample.focus();
});
