const levels = [
  { letter: "ا", instruction: "SONDA nasıl yazılır?", correct: "ـا", options: ["اـ", "ـاـ", "ـا"] },
  { letter: "ب", instruction: "BAŞTA nasıl yazılır?", correct: "بـ", options: ["ـب", "ـبـ", "بـ"] },
  { letter: "ت", instruction: "ORTADA nasıl yazılır?", correct: "ـتـ", options: ["تـ", "ـتـ", "ـت"] },
  { letter: "ث", instruction: "SONDA nasıl yazılır?", correct: "ـث", options: ["ـث", "ـثـ", "ثـ"] },
  { letter: "ج", instruction: "BAŞTA nasıl yazılır?", correct: "جـ", options: ["ـج", "ـجـ", "جـ"] },
  { letter: "ح", instruction: "ORTADA nasıl yazılır?", correct: "ـحـ", options: ["حـ", "ـحـ", "ـح"] },
  { letter: "خ", instruction: "SONDA nasıl yazılır?", correct: "ـخ", options: ["ـخ", "ـخـ", "خـ"] },
  // Dal, Zäl, Ra, Zay, Vav harfleri kendinden sonrakine birleşmez.
  { letter: "د", instruction: "SONDA nasıl yazılır?", correct: "ـد", options: ["دـ", "ـدـ", "ـد"] }, 
  { letter: "ذ", instruction: "SONDA nasıl yazılır?", correct: "ـذ", options: ["ذـ", "ـذـ", "ـذ"] },
  { letter: "ر", instruction: "SONDA nasıl yazılır?", correct: "ـر", options: ["رـ", "ـرـ", "ـر"] },
  { letter: "ز", instruction: "SONDA nasıl yazılır?", correct: "ـز", options: ["زـ", "ـزـ", "ـز"] },
  { letter: "س", instruction: "BAŞTA nasıl yazılır?", correct: "سـ", options: ["ـس", "ـسـ", "سـ"] },
  { letter: "ش", instruction: "ORTADA nasıl yazılır?", correct: "ـشـ", options: ["شـ", "ـشـ", "ـش"] },
  { letter: "ص", instruction: "BAŞTA nasıl yazılır?", correct: "صـ", options: ["ـص", "ـصـ", "صـ"] },
  { letter: "ض", instruction: "ORTADA nasıl yazılır?", correct: "ـضـ", options: ["ضـ", "ـضـ", "ـض"] },
  { letter: "ط", instruction: "SONDA nasıl yazılır?", correct: "ـط", options: ["ـط", "ـطـ", "طـ"] },
  { letter: "ظ", instruction: "BAŞTA nasıl yazılır?", correct: "ظـ", options: ["ـظ", "ـظـ", "ظـ"] },
  { letter: "ع", instruction: "ORTADA nasıl yazılır?", correct: "ـعـ", options: ["عـ", "ـعـ", "ـع"] },
  { letter: "غ", instruction: "SONDA nasıl yazılır?", correct: "ـغ", options: ["ـغ", "ـغـ", "غـ"] },
  { letter: "ف", instruction: "BAŞTA nasıl yazılır?", correct: "فـ", options: ["ـف", "ـفـ", "فـ"] },
  { letter: "ق", instruction: "ORTADA nasıl yazılır?", correct: "ـقـ", options: ["قـ", "ـقـ", "ـق"] },
  { letter: "ك", instruction: "BAŞTA nasıl yazılır?", correct: "كـ", options: ["ـك", "ـكـ", "كـ"] },
  { letter: "ل", instruction: "ORTADA nasıl yazılır?", correct: "ـلـ", options: ["لـ", "ـلـ", "ـل"] },
  { letter: "م", instruction: "SONDA nasıl yazılır?", correct: "ـم", options: ["ـم", "ـمـ", "مـ"] },
  { letter: "ن", instruction: "BAŞTA nasıl yazılır?", correct: "نـ", options: ["ـن", "ـنـ", "نـ"] },
  { letter: "و", instruction: "SONDA nasıl yazılır?", correct: "ـو", options: ["وـ", "ـوـ", "ـو"] },
  { letter: "ه", instruction: "ORTADA nasıl yazılır?", correct: "ـهـ", options: ["هـ", "ـهـ", "ـه"] },
  { letter: "ي", instruction: "BAŞTA nasıl yazılır?", correct: "يـ", options: ["ـي", "ـيـ", "يـ"] }
];

let currentLevel = 0;
let score = 0;
const maxScore = levels.length * 10; 

function loadLevel() {
  // Skor tablosunu dinamik olarak güncelle (Artık HTML'deki sayıyı elle değiştirmene gerek yok)
  document.getElementById('score-board').innerHTML = `Skor: <span id="score">${score}</span> / ${maxScore}`;

  if (currentLevel >= levels.length) {
    document.querySelector('.game-container').innerHTML = `
      <h2>Tebrikler! 🎉</h2>
      <p>Tüm harfleri başarıyla tamamladın.</p>
      <p>Toplam Skorun: <strong>${score}</strong></p>
      <a href="../index.html" class="back-link">← Ana Menüye Dön</a>
    `;
    return;
  }
  
  const levelData = levels[currentLevel];
  document.getElementById('mainLetter').innerText = levelData.letter;
  document.getElementById('instruction').innerText = levelData.instruction;
  
  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';
  
  // Şıkları her soruda rastgele karıştırıyoruz
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
  
  // Aynı anda birden fazla butona tıklanmasını engelle
  allBtns.forEach(b => b.style.pointerEvents = 'none');
  
  if (selected === correct) {
    btn.classList.add('correct');
    score += 10;
    currentLevel++;
    setTimeout(loadLevel, 1000); // 1 saniye bekle, yeni soruya geç
  } else {
    btn.classList.add('wrong');
    // Hatalı cevapta titreme efekti bitince tekrar tıklama hakkı ver
    setTimeout(() => { 
        btn.classList.remove('wrong'); 
        allBtns.forEach(b => b.style.pointerEvents = 'auto'); 
    }, 500);
  }
}

// Oyunu başlat
loadLevel();
