document.addEventListener('DOMContentLoaded', () => {
    const timeLeftDisplay = document.querySelector('#time-left');
    const message = document.createElement('div');
    const message_text = document.createElement('h3');
    const startButton = document.createElement('button');
    const squares = document.querySelectorAll('.grid div');
    const logsLeft = document.querySelectorAll('.log-left');
    const logsRight = document.querySelectorAll('.log-right');
    const carsLeft = document.querySelectorAll('.car-left');
    const carsRight = document.querySelectorAll('.car-right');


    let currentIndex = 76;
    let currentTime;
    const gridWidth = 9;

    // Intervals
    let timerId;
    let outcomeTimerId;

    function moveFrog(event) {
        squares[currentIndex].classList.remove('frog');
        squares[currentIndex].classList.remove('frog-log1');
        squares[currentIndex].classList.remove('frog-log2');
        squares[currentIndex].classList.remove('frog-log3');
        switch(event.key) {
            case 'ArrowLeft':
                if (currentIndex % gridWidth !== 0) currentIndex -= 1;
                break;
            case 'ArrowRight':
                if (currentIndex % gridWidth < gridWidth - 1) currentIndex += 1;
                break;
            case 'ArrowUp':
                if (currentIndex - gridWidth >= 0) currentIndex -= gridWidth;
                break;
            case 'ArrowDown':
                if (currentIndex + gridWidth < gridWidth * gridWidth) currentIndex += gridWidth;
                break;
        }
        squares[currentIndex].classList.add('frog');
    }

    function autoMoveElements() {
        currentTime--;
        timeLeftDisplay.textContent = `Seconds left: ${currentTime}`;
        logsLeft.forEach(log => moveLogLeft(log));
        logsRight.forEach(log => moveLogRight(log));
        carsLeft.forEach(car => moveCarLeft(car));
        carsRight.forEach(car => moveCarRight(car));
    }

    function moveLogLeft(log) {
        switch(true) {
            case log.classList.contains('l1'):
                log.classList.remove('l1');
                log.classList.add('l2');
                break;
            case log.classList.contains('l2'):
                log.classList.remove('l2');
                log.classList.add('l3');
                break;
            case log.classList.contains('l3'):
                log.classList.remove('l3');
                log.classList.add('l4');
                break;
            case log.classList.contains('l4'):
                log.classList.remove('l4');
                log.classList.add('l5');
                break;
            case log.classList.contains('l5'):
                log.classList.remove('l5');
                log.classList.add('l1');
                break;
        }
    }

    function moveLogRight(log) {
        switch(true) {
            case log.classList.contains('l1'):
                log.classList.remove('l1');
                log.classList.add('l5');
                break;
            case log.classList.contains('l2'):
                log.classList.remove('l2');
                log.classList.add('l1');
                break;
            case log.classList.contains('l3'):
                log.classList.remove('l3');
                log.classList.add('l2');
                break;
            case log.classList.contains('l4'):
                log.classList.remove('l4');
                log.classList.add('l3');
                break;
            case log.classList.contains('l5'):
                log.classList.remove('l5');
                log.classList.add('l4');
                break;
        }
    }

    function moveCarLeft(car) {
        switch(true) {
            case car.classList.contains('c1'):
                car.classList.remove('c1');
                car.classList.add('c2');
                break;
            case car.classList.contains('c2'):
                car.classList.remove('c2');
                car.classList.add('c3');
                break;
            case car.classList.contains('c3'):
                car.classList.remove('c3');
                car.classList.add('c1');
                break;
        }
    }

    function moveCarRight(car) {
        switch(true) {
            case car.classList.contains('c1'):
                car.classList.remove('c1');
                car.classList.add('c3');
                break;
            case car.classList.contains('c2'):
                car.classList.remove('c2');
                car.classList.add('c1');
                break;
            case car.classList.contains('c3'):
                car.classList.remove('c3');
                car.classList.add('c2');
                break;
        }
    }

    function lose() {
        if (
            squares[currentIndex].classList.contains('c1') ||
            squares[currentIndex].classList.contains('l4') ||
            squares[currentIndex].classList.contains('l5') ||
            currentTime <= 0
            ) {
            clearInterval(timerId);
            timerId = null;
            clearInterval(checkOutcome);
            outcomeTimerId = null;
            squares[currentIndex].classList.remove('frog');
            window.removeEventListener('keyup', moveFrog)
        } else if(squares[currentIndex].classList.contains('l1')) {
            squares[currentIndex].classList.remove('frog');
            squares[currentIndex].classList.remove('frog-log2');
            squares[currentIndex].classList.remove('frog-log3');
            squares[currentIndex].classList.add('frog-log1');
        } else if(squares[currentIndex].classList.contains('l2')) {
            squares[currentIndex].classList.remove('frog');
            squares[currentIndex].classList.remove('frog-log1');
            squares[currentIndex].classList.remove('frog-log3');
            squares[currentIndex].classList.add('frog-log2');
        } else if(squares[currentIndex].classList.contains('l3')) {
            squares[currentIndex].classList.remove('frog');
            squares[currentIndex].classList.remove('frog-log1');
            squares[currentIndex].classList.remove('frog-log2');
            squares[currentIndex].classList.add('frog-log3');
        }
    }

    function win() {
        if(squares[currentIndex].classList.contains('ending-block')) {
            clearInterval(timerId);
            timerId = null;
            clearInterval(checkOutcome);
            outcomeTimerId = null;
            window.removeEventListener('keyup', moveFrog)
            msg('Win')
        }
    }

    function checkOutcome() {
        lose();
        win();
    }

    function startGame() {
        document.body.removeChild(message);
        if (timerId) {
            clearInterval(timerId);
            clearInterval(checkOutcome);
            outcomeTimerId = null;
            timerId = null;
            window.removeEventListener('keyup', moveFrog);

        } else {
            currentTime = 20;
            squares[4].classList.remove('frog');
            currentIndex = 76;
            squares[currentIndex].classList.add('frog');
            timerId = setInterval(autoMoveElements, 1000);
            outcomeTimerId = setInterval(checkOutcome, 50);
            window.addEventListener('keyup', moveFrog);
        }
    }

    function msg(text) {
        message_text.textContent = `${text}`;
        message.classList.add('message');
        message.appendChild(message_text);
        
        startButton.textContent = ` NEW GAME `;
        startButton.classList.add('start-button');
        
        message.appendChild(startButton);
        document.body.appendChild(message);
        startButton.addEventListener('click', startGame);
    }
    msg('Objective: Get to the flag as quick as possible!')
})