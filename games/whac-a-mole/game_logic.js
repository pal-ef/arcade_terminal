document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.square');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const message = document.createElement('div');
    const message_text = document.createElement('h3');
    const startButton = document.createElement('button');


    let changeMolePosition;
    let molePosition;

    let score = 0;
    let time = 20;
    let timer;

    var hitSound;
    let audioHelper = 0;

    function soundEffect(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.id = 'soundEffect'
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);

        this.play = function(){
          this.sound.play();
        }
        this.stop = function(){
          this.sound.pause();
        }
    }

    hitSound = [new soundEffect("punch.mp3"),new soundEffect("punch.mp3"),new soundEffect("punch.mp3"),new soundEffect("punch.mp3")];


    function menu() {
        msg('Objective: hit the doushiqui at least 30 times');
        
        startButton.textContent = '< START GAME >'
        startButton.classList.add('start-button');
        startButton.addEventListener('click', startGame)
        message.appendChild(startButton);
    }

    function startGame() {
        score = 0;
        time = 20;

        scoreDisplay.textContent = `Score: ${score}`;
        document.body.removeChild(message);
        changeMolePosition = setInterval(moveMole, 500);
        startTimer()
    }

    function moveMole() {
        clearGrid();

        // Get random position and color that position
        molePosition = Math.floor(Math.random() * 9);
        squares[molePosition].classList.add('mole');

        // Add hit event
        squares[molePosition].addEventListener('mousedown', hit);
    }

    function clearGrid() {
        squares.forEach(square => {
            square.classList.remove('mole', 'mole-hit');
            square.removeEventListener('mousedown', hit);
        });
    }

    function hit() {
        this.classList.add('mole-hit');
        
        // Sound Effect
        hitSound[audioHelper].play();
        if(audioHelper < 3) {
            audioHelper++;
        } else {
            audioHelper = 0;
        }

        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    function countDown() {
        time--;
        timerDisplay.textContent = `Time left: ${time}`;
        if(time == 0) {
            stopTimer();
            endGame();
        }
    }

    function startTimer() {
        timer = setInterval(countDown,1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function endGame() {
        startButton.textContent = `< RESTART GAME >`;
        clearInterval(changeMolePosition);
        clearGrid();
        if (score < 30) {
            msg('YOU LOSE');
        } else {
            msg('YOU WIN');
        }
        
    }

    function msg(text) {
        message_text.textContent = `${text}`;
        message.classList.add('message');

        message.appendChild(message_text);
        document.body.appendChild(message);
    }

    menu();
})
