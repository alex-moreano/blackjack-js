/* REFERENCE FOR THE CARDS */
/* 2C= TWO OF CLUBS */
/* 2D= TWO OF DIAMONDS */
/* 2H= TWO OF HEARTS */
/* 2S= TWO OF SPADES */

//Module Pattern
(()=>{
    'use strict'

    let deck = [];
    const tipos = ['C','D','H','S'], especiales = ['A','J','Q','K'];
    let puntosJugadores = [];


    //References to HTML
    const btnNuevo = document.querySelector('#btnNew'),
          btnPedir = document.querySelector('#btnGive'),
          btnParar = document.querySelector('#btnStop');

    const smalls =  document.querySelectorAll('small'),
          divCardsPlayers = document.querySelectorAll('.divCards');
          
    const iniciarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        
        smalls.forEach(elem=> elem.innerHTML = 0);
        divCardsPlayers.forEach(elem=>elem.innerHTML = '');
        btnPedir.disabled = false;
        btnParar.disabled = false;
    }

    //This function creates a new deck
    const crearDeck = ()=>{
        deck = [];
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
        return _.shuffle(deck);
    }


    //This function allows me to ask a card
    const pedirCarta = ()=>{
        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }


    const valorCarta = (carta)=>{
        const valor = carta.substring(0, carta.length - 1);
        return ((isNaN(valor))? ((valor === 'A')? 11 : 10) : valor*1);
    }


    const acumularPuntos = (carta, turno)=>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        smalls[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `/assets/cartas/${carta}.png`;
        imgCarta.classList.add('cardbj');
        divCardsPlayers[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [puntosJugador, puntosPC] = puntosJugadores;

        setTimeout(() => {
            if(puntosPC === puntosJugador){
                alert('Nadie gana');
            } else if(puntosJugador > 21){
                alert('PC gana');
            } else if(puntosPC > 21){
                alert('Jugador gana');
            } else{
                alert('PC gana');
            }
        }, 10);
    }

    //PC TURN, PC HAS TO WIN THE PLAYER
    const turnoPC = (puntosJugador) => {
        let puntosPC = 0;
        do{
            const carta = pedirCarta();
            puntosPC = acumularPuntos(carta, puntosJugadores.length-1);
            crearCarta(carta, puntosJugadores.length-1);
        }while((puntosPC < puntosJugador) && (puntosJugador <= 21));        
        determinarGanador();
    }


    //EVENTS
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        let puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta,0);

        if(puntosJugador > 21)
        {
            console.warn('Lose')
            btnPedir.disabled = true;
            turnoPC(puntosJugador);
        } else if (puntosJugador === 21){
            console.warn('Win');
        }
    });

    btnStop.addEventListener('click', ()=>{
        btnPedir.disabled = true;
        btnParar.disabled = true;
        turnoPC(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', ()=>{
        iniciarJuego();        
    });

    return {
        newGame : iniciarJuego()
    };
})();