/* REFERENCE FOR THE CARDS */
/* 2C= TWO OF CLUBS */
/* 2D= TWO OF DIAMONDS */
/* 2H= TWO OF HEARTS */
/* 2S= TWO OF SPADES */

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
let puntosJugador = 0, puntosPC = 0;

//References to HTML
const btnPedir = document.querySelector('#btnGive');
const btnParar = document.querySelector('#btnStop');
const smalls =  document.querySelectorAll('small');
const cardsPlayer = document.querySelector('#player-cards');
const cardsPC = document.querySelector('#pc-cards');

//This function creates a new deck
const crearDeck = ()=>{
    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i+tipo);
        }
    }

    for(let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial + tipo);
        }
    }
    deck = _.shuffle(deck);
}

crearDeck();

//This function allows me to ask a card
const pedirCarta = ()=>{
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}


const valorCarta = (carta)=>{
    const valor = carta.substring(0, carta.length - 1);
    return ((isNaN(valor))? ((valor === 'A')? 11 : 10) : valor*1);
}

//PC TURN, PC HAS TO WIN THE PLAYER
const turnoPC = (puntosJugador) => {
    do{
        const carta = pedirCarta();

        puntosPC = puntosPC + valorCarta(carta);
        smalls[1].innerText = puntosPC;

        const imgCarta = document.createElement('img');
        imgCarta.src = `/assets/cartas/${carta}.png`;
        imgCarta.classList.add('cardbj');
        cardsPC.append(imgCarta);
        if(puntosJugador > 21)
        {
            break;
        }
    }while((puntosPC <= puntosJugador) && (puntosJugador <= 21));
}


//EVENTS
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    smalls[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `/assets/cartas/${carta}.png`;
    imgCarta.classList.add('cardbj');
    cardsPlayer.append(imgCarta);

    if(puntosJugador > 21)
    {
        console.warn('Lose')
        btnPedir.disabled = true;
        turnoPC(puntosJugador);
    } else if (puntosJugador === 21){
        console.warn('Win')
    }
});

btnStop.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    btnParar.disabled = true;
    turnoPC(puntosJugador);
});