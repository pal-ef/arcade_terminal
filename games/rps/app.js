document.addEventListener('DOMContentLoaded', () => {
    let computerChoice;
    let userChoice;

    const choices = ['rock', 'paper', 'scissors'];

    const message = document.querySelector('.message-box');
    const hands = app.querySelectorAll('.hand');
    const computerSelectionDisplay = app.querySelector('.computer-selection h2');
    const threeDots = app.querySelector('.dot-pulse');
    const result = app.querySelector('.result h1');

    for (let i = 0; i < hands.length; i++) {
        hands[i].addEventListener('click', selectHand);
        hands[i].style = `background-image:url(images/${choices[i]}.svg);`;
        hands[i].id = i;
    }

    function selectHand() {
        userChoice = this.id
        message.textContent = `You selected ${choices[userChoice]}`;
        threeDots.style = `display:none;`
        computerSelection();
    }

    function computerSelection() {
        computerChoice = Math.floor(Math.random() * 3);
        computerSelectionDisplay.textContent = `Computer selected ${choices[computerChoice]}`;
        determineWinner();
    }

    function determineWinner() {
        console.log('cpu:',computerChoice);
        console.log('user:', userChoice);
        if (computerChoice == userChoice) {
            result.textContent = "It's a drawn";
        } else if (computerChoice == 0 && userChoice == 2) {
            result.textContent = "Computer wins";
        } else if (computerChoice == 1 && userChoice == 0) {
            result.textContent = "Computer wins";
        } else if (computerChoice == 2 && userChoice == 1) {
            result.textContent = "Computer wins";
        } else {
            result.textContent = 'User wins';
        }
    }

})