const levels = [
  { letter: "ب", instruction: "BAŞTA nasıl yazılır?", correct: "بـ", options: ["ـب", "ـبـ", "بـ"] },
  { letter: "ج", instruction: "ORTADA nasıl yazılır?", correct: "ـجـ", options: ["جـ", "ـجـ", "ـج"] },
  { letter: "ع", instruction: "SONDA nasıl yazılır?", correct: "ـع", options: ["ـع", "ـعـ", "عـ"] }
];

let currentLevel = 0;
let score = 0;

function loadLevel() {
  if (currentLevel >= levels.length) {
    document.querySelector('.game-container').innerHTML = `
      <h2>Tebrikler! 🎉</h2>
      <p>Bölümü tamamladın. Skorun: ${score}</p>
      <a href="../index.html" class="back-link">← Ana Menüye Dön</a>
    `;
    return;
  }
  
  const levelData = levels[currentLevel];
  document.getElementById('mainLetter').innerText = levelData.letter;
  document.getElementById('instruction').innerText = levelData.instruction;
  
  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';
  
  // Şıkları karıştırarak ekleme
  levelData.options.sort(() => Math.random() - 0.5).forEach(opt => {
    const btn = document.createElement('div');
    btn.className = 'option';
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(btn, opt, levelData.correct);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(btn, selected, correct) {
  const allBtns = document.querySelectorAll('.option');
  
  // Tıklandıktan sonra diğer butonları pasif yap
  allBtns.forEach(b => b.style.pointerEvents = 'none');
  
  if (selected === correct) {
    btn.classList.add('correct');
    score += 10;
    document.getElementById('score').innerText = score;
    currentLevel++;
    setTimeout(loadLevel, 1000);
  } else {
    btn.classList.add('wrong');
    setTimeout(() => { 
        btn.classList.remove('wrong'); 
        allBtns.forEach(b => b.style.pointerEvents = 'auto'); 
    }, 500);
  }
}

// Oyunu ilk kez başlat
loadLevel();
