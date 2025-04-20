const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const endBtn = document.getElementById('endGame');

let score = 0;
let timeLeft = 10;
let ball = { x: 200, y: 200, radius: 20 };

function drawBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

function moveBallRandom() {
  ball.x = Math.random() * (canvas.width - 40) + 20;
  ball.y = Math.random() * (canvas.height - 40) + 20;
}

canvas.addEventListener('click', function (e) {
  const dx = e.offsetX - ball.x;
  const dy = e.offsetY - ball.y;
  if (dx * dx + dy * dy <= ball.radius * ball.radius) {
    score++;
    scoreEl.textContent = `Score: ${score}`;
    moveBallRandom();
  }
});

function startGame() {
  drawBall();
  let interval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  alert(`Game Over! Your score is ${score}`);
  // позже тут будет отправка результата
}

endBtn.addEventListener('click', endGame);

startGame();
