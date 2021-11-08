let fullArray = ["media/bobrossparrot.gif", "media/explodyparrot.gif", "media/fiestaparrot.gif", "media/metalparrot.gif", "media/revertitparrot.gif", "media/tripletsparrot.gif", "media/unicornparrot.gif"];

// crio uma lista baseado no numero de cartas pedida
let gameArray = [];

let qntDeFinalizados = 0;
let contadorDeJogadas = 0;
let temporizador = 0;

let idInterval;

const timer = document.querySelector(".timer");

function inicioDoJogo() {

  fullArray.sort(comparador);
  const cards = document.querySelector(".cards");

  // reset das coisas pro proximo jogo
  qntDeFinalizados = 0;
  contadorDeJogadas = 0;
  cards.innerHTML = "";
  gameArray = [];
  timer.innerHTML = 0;
  temporizador = 0;

  let numero = 0;
  while (numero < 4 || numero > 14 || numero % 2 === 1) {
    numero = prompt("Digite o número de cartas (números pares entre 4 e 14)");
  }

  // defino quem é o gameArray
  for (let i = 0; i < numero / 2; i++) {
    gameArray[i] = fullArray[i];
  }

  // completo a outra metade da lista repetindo os termos
  for (let i = 0; i < numero / 2; i++) {
    gameArray.push(gameArray[i]);
  }

  // e embaralho tudo
  gameArray.sort(comparador);

  for (let i = 0; i < numero; i++) {
    cards.innerHTML += `
        <div class="card" data-identifier="card" onclick="turnCard(this)">
              <div class="back-face face" data-identifier="back-face">
                  <img class="images" src="media/front.png">
              </div>
              <div class="front-face face" data-identifier="front-face">
                  <img class="images" src=${gameArray[i]}>
              </div>
        </div> `;
  }

  idInterval = setInterval(contadorDeTempo, 1000);
}

const cards = document.querySelector(".cards");
let frentes = [];
// imagens dentro dos versos, para obter o verso eu uso parentNode
let imagens = [];

function turnCard(cartaAtual) {
  const frente = cartaAtual.querySelector(".back-face");
  const verso = cartaAtual.querySelector(".front-face");

  if (
    frente.classList.contains("finalizado") ||
    cards.classList.contains("espera")
  ) {
    // nao altera clicar em quem ja foi finalizado
    return;
  } else if (frentes[0] === undefined) {
    // responsavel pelo clique da primeira carta do par
    // contador ímpar e lista frentes sem nada dentro

    verso.classList.add("front-face-click");
    frente.classList.add("back-face-click");

    frentes[0] = frente;
    imagens[0] = verso.querySelector("img");

    contadorDeJogadas++;
  } else if (imagens[0].parentNode === verso) {
    // Se o pai da imagem anterior (verso da imagem anterior) for igual o verso atual n faz nada
    return;
  } else if (imagens[0].src === verso.querySelector("img").src) {
    // se a imagem for igual a anterior e o pai(verso) diferente da anterior

    verso.classList.add("front-face-click");
    frente.classList.add("back-face-click");

    frentes[0].classList.add("finalizado");
    frente.classList.add("finalizado");

    frentes = [];
    imagens = [];

    qntDeFinalizados++;
    contadorDeJogadas++;

    setTimeout(alertaFinal, 400);
    setTimeout(reset, 500);
  } else {
    //se for diferente da anterior

    // vira a "segunda" carta pra ver o conteudo
    verso.classList.add("front-face-click");
    frente.classList.add("back-face-click");

    // nao deixa nada ser clicado enquanto nao desvirar as cartas
    cards.classList.add("espera");

    setTimeout(desviraAsCartas, 1000, imagens[0], frentes[0], verso, frente);

    frentes = [];
    imagens = [];

    contadorDeJogadas++;
  }
}

function comparador() {
  return Math.random() - 0.5;
}

function desviraAsCartas(var1, var2, var3, var4) {
  // vira a carta anterior de volta
  var1.parentNode.classList.remove("front-face-click");
  var2.classList.remove("back-face-click");

  // vira a carta atual de volta
  var3.classList.remove("front-face-click");
  var4.classList.remove("back-face-click");

  // removo a espera
  cards.classList.remove("espera");
}

function contadorDeTempo() {
  temporizador++;
  timer.innerHTML = temporizador;
}

inicioDoJogo();

function alertaFinal() {
  if (qntDeFinalizados === gameArray.length / 2) {
    clearInterval(idInterval);
    let tempoFinal = timer.innerHTML;
    alert(`Você ganhou em ${contadorDeJogadas} jogadas e em ${tempoFinal} segundos!`);
  }
}

function reset() {
  let recomecar = "";
  if (qntDeFinalizados === gameArray.length / 2) {
    recomecar = prompt("Deseja recomeçar o jogo? (s ou n): ");

    if (recomecar === "n") {
      return;
    } else if (recomecar === "s") {
      inicioDoJogo();
    } else {
      reset();
    }
  }
}
