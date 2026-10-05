const dialog = document.querySelector('#interview-dialog');
const questions = {
  coding: 'Given an array of integers and a target, return the indices of two numbers that add up to the target. How would you approach the problem, and what is the complexity of your solution?',
  system: 'Design a URL shortener. Start by clarifying the requirements, then talk through the main components and the tradeoffs you would make.',
  behavioral: 'Tell me about a time you got stuck on a technical problem. How did you move forward, and what did you learn?'
};
document.querySelectorAll('[data-start]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#sample-question').hidden = true;
    dialog.showModal();
  });
});
document.querySelector('.close').addEventListener('click', () => dialog.close());
document.querySelector('#begin-sample').addEventListener('click', () => {
  document.querySelector('#question-text').textContent = questions[document.querySelector('#interview-type').value];
  document.querySelector('#sample-question').hidden = false;
});
document.querySelector('#interview-type').addEventListener('change', () => {
  document.querySelector('#sample-question').hidden = true;
});
