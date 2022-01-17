let fullArray = [
  "media/bobrossparrot.gif",
  "media/explodyparrot.gif",
  "media/fiestaparrot.gif",
  "media/metalparrot.gif",
  "media/revertitparrot.gif",
  "media/tripletsparrot.gif",
  "media/unicornparrot.gif"
];
let gameArray = [];
let finishedNumber = 0;
let playCounter = 0;
let timerCounter = 0;
let idInterval;
let numberOfCards = 0;
const timer = document.querySelector(".timer");

function beginGame() {
  fullArray.sort(randomizer);
  const cards = document.querySelector(".cards");

  resetVariables();
  setGameArray();

  for (let i = 0; i < numberOfCards; i++) {
    cards.innerHTML += `
        <div class="card" data-identifier="card" onclick="handleTurns(this)">
              <div class="back-face face" data-identifier="back-face">
                  <img class="images" src="media/front.png">
              </div>
              <div class="front-face face" data-identifier="front-face">
                  <img class="images" src=${gameArray[i]}>
              </div>
        </div> `;
  }

  idInterval = setInterval(handleTimer, 1000);
}

function resetVariables() {
  finishedNumber = 0;
  playCounter = 0;
  cards.innerHTML = "";
  gameArray = [];
  timer.innerHTML = 0;
  timerCounter = 0;
}

function setGameArray() {
  while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 === 1 || isNaN(parseInt(numberOfCards))) {
    numberOfCards = prompt("Digite o número de cartas (números pares entre 4 e 14)");
  }
  for (let i = 0; i < numberOfCards / 2; i++) {
    gameArray[i] = fullArray[i];
  }
  for (let i = 0; i < numberOfCards / 2; i++) {
    gameArray.push(gameArray[i]);
  }
  gameArray.sort(randomizer);
}

const cards = document.querySelector(".cards");
let frontArray = [];
let imagesArray = [];

function handleTurns(currentCard) {
  const front = currentCard.querySelector(".back-face");
  const verse = currentCard.querySelector(".front-face");

  if (front.classList.contains("finished") || cards.classList.contains("wait")) {
    return;

  } else if (frontArray[0] === undefined) {
    turnCard(front, verse);

    frontArray[0] = front;
    imagesArray[0] = verse.querySelector("img");

    playCounter++;
  } else if (imagesArray[0].parentNode === verse) {
    return;

  } else if (imagesArray[0].src === verse.querySelector("img").src) {
    turnCard(front, verse);

    frontArray[0].classList.add("finished");
    front.classList.add("finished");

    resetArrays();

    finishedNumber++;
    playCounter++;

    setTimeout(finalAlert, 400);
    setTimeout(reset, 500);

  } else {
    turnCard(front, verse);
    cards.classList.add("wait");

    setTimeout(unturnCards, 1000, imagesArray[0], frontArray[0], verse, front);

    resetArrays();

    playCounter++;
  }
}

function turnCard(front, verse) {
  verse.classList.add("front-face-click");
  front.classList.add("back-face-click");
}

function resetArrays() {
  frontArray = [];
  imagesArray = [];
}

function randomizer() {
  return Math.random() - 0.5;
}

function unturnCards(var1, var2, var3, var4) {
  var1.parentNode.classList.remove("front-face-click");
  var2.classList.remove("back-face-click");
  var3.classList.remove("front-face-click");
  var4.classList.remove("back-face-click");
  cards.classList.remove("wait");
}

function handleTimer() {
  timerCounter++;
  timer.innerHTML = timerCounter;
}

beginGame();

function finalAlert() {
  if (finishedNumber === gameArray.length / 2) {
    clearInterval(idInterval);
    let finalTime = timer.innerHTML;
    alert(`Você ganhou em ${playCounter} jogadas e em ${finalTime} segundos!`);
  }
}

function reset() {
  let restartPrompt = "";
  if (finishedNumber === gameArray.length / 2) {
    restartPrompt = prompt("Deseja recomeçar o jogo? (s ou n): ");

    if (restartPrompt === "n") {
      return;
    } else if (restartPrompt === "s") {
      beginGame();
    } else {
      reset();
    }
  }
}
