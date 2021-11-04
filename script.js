let fullArray = ["media/bobrossparrot.gif","media/explodyparrot.gif","media/fiestaparrot.gif","media/metalparrot.gif","media/revertitparrot.gif","media/tripletsparrot.gif","media/unicornparrot.gif"];
fullArray.sort(comparador);

// crio uma lista baseado no numero de cartas pedida
let gameArray = [];

function qtdDeCartas() {

    const cards = document.querySelector('.cards');
    let numero = 0;

    while (numero < 4 || numero > 14 || numero % 2 === 1) {
        // numero = prompt("Digite o número de cartas");
        numero = 8
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
        <div class="card card-${contador}" data-identifier="card" onclick="turnCard(this)">
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

let cont = 0;

function turnCard(cartaAtual) {
    
    cont++;

    const verso = cartaAtual.querySelector('.back-face');
    const frente = cartaAtual.querySelector('.front-face');

    if (cont % 2 === 1) {
        verso.classList.add('back-face-click');
        frente.classList.add('front-face-click');
    } 
    // else if () { // se for igual a anterior

    //     // verso.classList.remove('back-face');
    //     // frente.classList.remove('front-face');

    // } else { // se for diferente da anterior

    //     // aguardo 1 segundo
    //     verso.classList.remove('back-face-click');
    //     frente.classList.remove('front-face-click');
    // }
        
        

    console.log(cont);
    console.log(verso.querySelector('img').src);
}



function comparador() { 
	return Math.random() - 0.5; 
}


qtdDeCartas()