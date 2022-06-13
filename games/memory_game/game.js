document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const timerDisplay = document.getElementById('timer');
    const message = document.createElement('div');
    const message_text = document.createElement('h3');
    const startButton = document.createElement('button');

    const maxTime = 30;
    let time = maxTime;
    let countdown;
    let pairsFound = []

    const delay = ms => new Promise(res => setTimeout(res, ms));

    // Images
    let cardImages = [
        'dash', 'duck','turtle', 'pig',
        'rock', 'ghost','chicken', 'bunny',
        'dash', 'duck','turtle', 'pig',
        'rock', 'ghost','chicken', 'bunny'
    ]

    let flippedCards = []

    function startGame() {
        countdown = setInterval(startTimer, 1000);
        shuffleCards();
    }

    function startTimer() {
        time--;
        timerDisplay.textContent = `Time left: ${time}`;
        if (time == 0) {
            stopTimer()
            gameOver()
        }
    }

    function stopTimer() {
        clearInterval(countdown);
    }

    function shuffleCards() {
        cardImages.sort((a,b) => 0.5 - Math.random());
        for(let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', flipCard);
            cards[i].id = cardImages[i];
        }
    }

    async function flipCard() {
        // Add to flipped cards
        flippedCards.push(this.id);

        // Change appearance
        this.removeEventListener('click', flipCard)
        this.classList.add('selectedCard');
        this.style = `background-image:url('${this.id}.gif');`;
    
        // Check if there's more than two cards flipped
        if (flippedCards.length == 2) {
            disableClick();
            await delay(600);
            if(flippedCards[0] == flippedCards[1]) {
                pairFound();
            }
            unflipCards()
        }
        enableClick();
        checkWin();
    }

    function unflipCards() {
        for(let i = 0; i < cards.length; i++) {
            if ((cards[i].id == flippedCards[0] || cards[i].id == flippedCards[1]) && !cards[i].pairFound) {
                cards[i].style = `background-image:;`;
                cards[i].classList.remove('selectedCard');
                cards[i].addEventListener('click', flipCard);
            }
        } 
        flippedCards = []
    }

    function forceUnflipCards() {
        for(let i = 0; i < cards.length; i++) {
            cards[i].style = `background-image:;`;
            cards[i].classList.remove('selectedCard');
            cards[i].addEventListener('click', flipCard);
            cards[i].pairFound = false;
        }
    }

    function pairFound() {
        for(let i = 0; i < cards.length; i++) {
            if (cards[i].id == flippedCards[0]) {
                cards[i].pairFound = true;
                cards[i].removeEventListener('click', flipCard);
            }
        }
        pairsFound.push(flippedCards[0])
        flippedCards = []
    }

    function disableClick() {
        for(let i = 0; i < cards.length; i++) {
            cards[i].removeEventListener('click', flipCard);
        } 
    }

    function enableClick() {
        for(let i = 0; i < cards.length; i++) {
            if  (!cards[i].pairFound) {
                cards[i].addEventListener('click', flipCard);
            }
        } 
    }

    function checkWin() {
        if(pairsFound.length == (cards.length/2)) {
            gameOver();
            msg("You win");
        }
    }

    function restartGame() {
        pairsFound = [];
        time = maxTime;
        document.body.removeChild(message);
        startGame();
    }

    function gameOver() {
        forceUnflipCards();
        disableClick();
        stopTimer();
        startButton.textContent = `< RESTART GAME >`;
        startButton.classList.add('start-button');
        startButton.addEventListener('click', restartGame);
        msg("Time's up. You failed");
        message.appendChild(startButton);
    }

    function msg(text) {
        message_text.textContent = `${text}`;
        message.classList.add('message');

        message.appendChild(message_text);
        document.body.appendChild(message);
    }

    startGame();
})

