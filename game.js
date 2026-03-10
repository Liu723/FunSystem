const startBtn = document.getElementById('startBtn');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const missEl = document.getElementById('miss');
const arena = document.getElementById('arena');
const target = document.getElementById('target');
const overlay = document.getElementById('overlay');

let score = 0;
let miss = 0;
let timeLeft = 30;
let gameTimer = null;
let moveTimer = null;
let isRunning = false;

function randomPosition() {
  const maxX = arena.clientWidth - target.offsetWidth;
  const maxY = arena.clientHeight - target.offsetHeight;
  const x = Math.floor(Math.random() * Math.max(maxX, 1));
  const y = Math.floor(Math.random() * Math.max(maxY, 1));
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
}

function clearTimers() {
  clearInterval(gameTimer);
  clearInterval(moveTimer);
}

function rankMessage(finalScore) {
  if (finalScore >= 35) return '🔥 反应超神，手速王者！';
  if (finalScore >= 25) return '🚀 很强！继续冲击更高分。';
  if (finalScore >= 15) return '👍 表现不错，再练练会更稳。';
  return '🌱 别灰心，多来几局就能进步！';
}

function endGame() {
  isRunning = false;
  clearTimers();
  startBtn.textContent = '再来一局';
  overlay.hidden = false;
  overlay.innerHTML = `
    <div>
      <p><strong>时间到！</strong></p>
      <p>最终得分：<strong>${score}</strong>，失误：<strong>${miss}</strong></p>
      <p>${rankMessage(score)}</p>
    </div>
  `;
}

function tick() {
  timeLeft -= 1;
  timeEl.textContent = String(timeLeft);
  if (timeLeft <= 0) {
    endGame();
  }
}

function startGame() {
  score = 0;
  miss = 0;
  timeLeft = 30;
  isRunning = true;

  scoreEl.textContent = '0';
  missEl.textContent = '0';
  timeEl.textContent = '30';

  overlay.hidden = true;
  startBtn.textContent = '挑战中...';

  randomPosition();
  clearTimers();
  gameTimer = setInterval(tick, 1000);
  moveTimer = setInterval(randomPosition, 650);
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    startGame();
  }
});

target.addEventListener('click', (event) => {
  if (!isRunning) return;
  event.stopPropagation();
  score += 1;
  scoreEl.textContent = String(score);
  randomPosition();
});

arena.addEventListener('click', () => {
  if (!isRunning) return;
  miss += 1;
  missEl.textContent = String(miss);
});

window.addEventListener('resize', () => {
  if (isRunning) {
    randomPosition();
  }
});

overlay.hidden = false;
randomPosition();
