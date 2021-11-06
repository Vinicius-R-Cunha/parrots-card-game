let fullArray = ["media/bobrossparrot.gif","media/explodyparrot.gif","media/fiestaparrot.gif","media/metalparrot.gif","media/revertitparrot.gif","media/tripletsparrot.gif","media/unicornparrot.gif"];
fullArray.sort(comparador);

// crio uma lista baseado no numero de cartas pedida
let gameArray = [];

function qtdDeCartas() {

    const cards = document.querySelector('.cards');
    let numero = 0;

    while (numero < 4 || numero > 14 || numero % 2 === 1) {
        // numero = prompt("Digite o número de cartas");
        numero = 6;
    }

    // defino quem é o gameArray
    let contador = 0;
    while (contador < numero/2) {
        gameArray[contador] = fullArray[contador];
        contador++;
    }

    // completo a outra metade da lista repetindo os termos
    contador = 0;
    while (contador < numero/2) {
        gameArray.push(gameArray[contador]);
        contador++;
    }

    // e embaralho tudo
    gameArray.sort(comparador);

    contador = 0;
    while (contador < numero) {

        cards.innerHTML += `
        <div class="card" data-identifier="card" onclick="turnCard(this)">
            <div class="front-face face" data-identifier="front-face">
                <img class="images" src="media/front.png">
            </div>
            <div class="back-face face" data-identifier="back-face">
                <img class="images" src=${gameArray[contador]}>
            </div>
        </div> `

        contador++;
    }
}

const cards = document.querySelector('.cards');
let frentes = [];
// imagens dentro dos versos, para obter o verso eu uso parentNode
let imagens = [];
let qntDeFinalizados = 0;
let contadorDeJogadas = 0;

function turnCard(cartaAtual) {

    const verso = cartaAtual.querySelector('.back-face');
    const frente = cartaAtual.querySelector('.front-face');

    if (frente.classList.contains('finalizado') || cards.classList.contains('espera')) {
        // nao altera clicar em quem ja foi finalizado
        return;

    } else if (frentes[0] === undefined) {
        // responsavel pelo clique da primeira carta do par
        // contador ímpar e lista frentes sem nada dentro

        verso.classList.add('back-face-click');
        frente.classList.add('front-face-click');

        frentes[0] = frente;
        imagens[0] = verso.querySelector('img');

        contadorDeJogadas++;

    } else if (imagens[0].parentNode === verso) {
        // Se o pai da imagem anterior (verso da imagem anterior) for igual o verso atual n faz nada
        return;

    } else if (imagens[0].src === verso.querySelector('img').src) { 
        // se a imagem for igual a anterior e o pai(verso) diferente da anterior
        
        verso.classList.add('back-face-click');
        frente.classList.add('front-face-click');


        frentes[0].classList.add('finalizado');
        frente.classList.add('finalizado');
        
        frentes = [];
        imagens = [];
        
        qntDeFinalizados++;
        contadorDeJogadas++;

        setTimeout(alertaFinal, 400);

    } else { //se for diferente da anterior
        
        // vira a "segunda" carta pra ver o conteudo
        verso.classList.add('back-face-click');
        frente.classList.add('front-face-click');

        // nao deixa nada ser clicado enquanto nao desvirar as cartas
        cards.classList.add('espera');


        setTimeout(desviraAsCartas, 1000, imagens[0], frentes[0], verso, frente);

        frentes = [];
        imagens = [];

        contadorDeJogadas++;
    }
}

function alertaFinal() {
    if (qntDeFinalizados === (gameArray.length /2)) {
        alert(`Você ganhou em ${contadorDeJogadas} jogadas!`)
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

function desviraAsCartas(var1,var2,var3,var4) {

    // vira a carta anterior de volta
    var1.parentNode.classList.remove('back-face-click')
    var2.classList.remove('front-face-click')

    // vira a carta atual de volta
    var3.classList.remove('back-face-click');
    var4.classList.remove('front-face-click');

    // removo a espera
    cards.classList.remove('espera');

}

qtdDeCartas()