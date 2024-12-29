let currentPlayer = 1;
let currentRoll = 0;
let scores = { 1: 0, 2: 0 };
let rolls = { 1: [], 2: [] };
let isRolling = false;

const dice = document.getElementById("dice");
const saveRollBtn = document.getElementById("saveRoll");
const resetBtn = document.getElementById("reset");
const player1Div = document.getElementById("player1");
const player2Div = document.getElementById("player2");

function updateActivePlayer() {
  player1Div.classList.toggle("active", currentPlayer === 1);
  player2Div.classList.toggle("active", currentPlayer === 2);
}

async function rollDice() {
  if (isRolling) return;
  isRolling = true;
  saveRollBtn.disabled = true;

  dice.innerHTML = "🎲";
  dice.classList.add("rolling");

  const rollInterval = setInterval(() => {
    const tempRoll = Math.floor(Math.random() * 6) + 1;
    dice.innerHTML = `🎲<span class="dice-number">${tempRoll}</span>`;
  }, 50);

  await new Promise((resolve) => setTimeout(resolve, 600));

  clearInterval(rollInterval);
  dice.classList.remove("rolling");

  currentRoll = Math.floor(Math.random() * 6) + 1;
  dice.innerHTML = `🎲<span class="dice-number">${currentRoll}</span>`;

  isRolling = false;
  saveRollBtn.disabled = false;
}

function saveRoll() {
  if (currentRoll === 0 || isRolling) return;

  rolls[currentPlayer].push(currentRoll);
  scores[currentPlayer] += currentRoll;

  document.getElementById(`score${currentPlayer}`).textContent =
    scores[currentPlayer];
  document.getElementById(`rolls${currentPlayer}`).textContent =
    rolls[currentPlayer].join(", ");

  currentRoll = 0;
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateActivePlayer();
  dice.innerHTML = "🎲";
}

function resetGame() {
  currentPlayer = 1;
  currentRoll = 0;
  scores = { 1: 0, 2: 0 };
  rolls = { 1: [], 2: [] };
  isRolling = false;

  document.getElementById("score1").textContent = "0";
  document.getElementById("score2").textContent = "0";
  document.getElementById("rolls1").textContent = "";
  document.getElementById("rolls2").textContent = "";
  dice.innerHTML = "🎲";
  updateActivePlayer();
}

dice.addEventListener("click", rollDice);
saveRollBtn.addEventListener("click", saveRoll);
resetBtn.addEventListener("click", resetGame);

updateActivePlayer();
