const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');

menuBtn?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});
mainNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.quiz-block').forEach(block => {
  const correct = block.dataset.answer;
  const feedback = block.querySelector('.feedback');
  block.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.value === correct) {
        feedback.textContent = 'Correcto. El 24 de septiembre de 1810 inició una etapa decisiva, pero la lucha continuó hasta 1825.';
      } else {
        feedback.textContent = 'Revisá la idea clave: 1810 fue el inicio simbólico de la gesta, no la independencia definitiva.';
      }
    });
  });
});

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tabpanel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab)?.classList.add('active');
  });
});

const glossaryResult = document.getElementById('glossaryResult');
document.querySelectorAll('.glossary button').forEach(btn => {
  btn.addEventListener('click', () => {
    glossaryResult.innerHTML = `<strong>${btn.dataset.term}</strong><br>${btn.dataset.def}`;
  });
});

const wsDialog = document.getElementById('wordSearchDialog');
document.getElementById('openWordSearch')?.addEventListener('click', () => wsDialog.showModal());
document.getElementById('closeWordSearch')?.addEventListener('click', () => wsDialog.close());

const words = [
  'WARNES','PARI','SEOANE','CAÑOTO','IBANEZ','SAMAIPATA','VALLEGRANDE','CHIQUITOS','COTOCA',
  'CUÑAPE','MAJADITO','SONSO','AMBROSIA','TAQUIRARI','CARNAVALITO','CURICHI','JICHI','PATUJU','AMBORO','TOBOROCHI'
];

const size = 15;
const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
const grid = Array.from({length:size},()=>Array(size).fill(''));
const dirs = [[0,1],[1,0],[1,1],[-1,1]];

function canPlace(word,r,c,dr,dc){
  for(let i=0;i<word.length;i++){
    const rr=r+dr*i, cc=c+dc*i;
    if(rr<0||rr>=size||cc<0||cc>=size) return false;
    if(grid[rr][cc] && grid[rr][cc]!==word[i]) return false;
  }
  return true;
}
function placeWord(word){
  for(let tries=0;tries<500;tries++){
    const [dr,dc]=dirs[Math.floor(Math.random()*dirs.length)];
    const r=Math.floor(Math.random()*size), c=Math.floor(Math.random()*size);
    if(canPlace(word,r,c,dr,dc)){
      for(let i=0;i<word.length;i++) grid[r+dr*i][c+dc*i]=word[i];
      return true;
    }
  }
  return false;
}
words.slice().sort((a,b)=>b.length-a.length).forEach(placeWord);
for(let r=0;r<size;r++) for(let c=0;c<size;c++) if(!grid[r][c]) grid[r][c]=letters[Math.floor(Math.random()*letters.length)];

const wordGrid = document.getElementById('wordGrid');
const wordList = document.getElementById('wordList');
if(wordGrid){
  grid.flat().forEach(ch=>{
    const span=document.createElement('span');
    span.textContent=ch;
    wordGrid.appendChild(span);
  });
}
if(wordList){
  words.forEach(w=>{
    const span=document.createElement('span');
    span.textContent=w.replace('N','N');
    wordList.appendChild(span);
  });
}
