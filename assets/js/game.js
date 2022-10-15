/* REFERENCE FOR THE CARDS */
/* 2C= TWO OF CLUBS */
/* 2D= TWO OF DIAMONDS */
/* 2H= TWO OF HEARTS */
/* 2S= TWO OF SPADES */

//Module Pattern
(()=>{
    'use strict'

    let deck = [];
    const typeOfCards = ['C','D','H','S'], specialCards = ['A','J','Q','K'];
    let playerPoints;


    //References to HTML
    const btnNewGame = document.querySelector('#btnNew'),
          btnAskCard = document.querySelector('#btnGive'),
          btnStopGame = document.querySelector('#btnStop');

    const pointsHTML =  document.querySelectorAll('small'),
          divCardsPlayers = document.querySelectorAll('.divCards');
          
    const newGame = (numPlayers = 2) => {
        playerPoints = [];
        deck = createDeck();
        for (let i = 0; i < numPlayers; i++) {
            playerPoints.push(0);
        }
        console.log({playerPoints})
        pointsHTML.forEach(elem=> elem.innerHTML = 0);
        divCardsPlayers.forEach(elem=>elem.innerHTML = '');
        btnAskCard.disabled = false;
        btnStopGame.disabled = false;
    }

    //This function creates a new deck
    const createDeck = ()=>{
        deck = [];
        for(let i = 2; i <= 10; i++){
            for(let type of typeOfCards){
                deck.push(i+type);
            }
        }

        for(let type of typeOfCards){
            for(let special of specialCards){
                deck.push(special + type);
            }
        }
        return _.shuffle(deck);
    }


    //This function allows me to ask a card
    const askCard = ()=>{
        if(deck.length === 0){
            throw 'There are any cards left in the deck';
        }
        return deck.pop();
    }


    const valueCard = (card)=>{
        const valueNumber = card.substring(0, card.length - 1);
        return ((isNaN(valueNumber))? ((valueNumber === 'A')? 11 : 10) : valueNumber*1);
    }


    const makePoints = (card, turnPlayer)=>{
        playerPoints[turnPlayer] = playerPoints[turnPlayer] + valueCard(card);
        pointsHTML[turnPlayer].innerText = playerPoints[turnPlayer];
        return playerPoints[turnPlayer];
    }


    const createCard = (card, turnPlayer) => {
        const imgCard = document.createElement('img');
        imgCard.src = `/assets/cartas/${card}.png`;
        imgCard.classList.add('cardbj');
        divCardsPlayers[turnPlayer].append(imgCard);
    }

    const placeTheWinner = () => {
        const [pointsPlayer, pointsPC] = playerPoints;

        setTimeout(() => {
            if(pointsPC === pointsPlayer){
                alert('No one wins');
            } else if(pointsPlayer > 21){
                alert('PC wins, you lose');
            } else if(pointsPC > 21){
                alert('You win');
            } else{
                alert('PC wins, you lose');
            }
        }, 10);
    }

    //PC TURN, PC HAS TO WIN THE PLAYER
    const turnPC = (pointsPlayer) => {
        let pointsPC = 0;
        do{
            const card = askCard();
            pointsPC = makePoints(card, playerPoints.length-1);
            createCard(card, playerPoints.length-1);
        }while((pointsPC < pointsPlayer) && (pointsPlayer <= 21));        
        placeTheWinner();
    }


    //EVENTS
    btnAskCard.addEventListener('click', () => {
        const card = askCard();
        let pointsPlayer = makePoints(card, 0);
        createCard(card,0);

        if(pointsPlayer > 21)
        {
            console.warn('Lose')
            btnAskCard.disabled = true;
            turnPC(pointsPlayer);
        } else if (pointsPlayer === 21){
            console.warn('Win');
        }
    });

    btnStop.addEventListener('click', ()=>{
        btnAskCard.disabled = true;
        btnStopGame.disabled = true;
        turnPC(playerPoints[0]);
    });

    btnNewGame.addEventListener('click', ()=>{
        newGame();        
    });

    return {
        newGame : newGame()
    };
})();