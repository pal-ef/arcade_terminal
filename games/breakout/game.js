document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const ball = document.createElement('div');
    const scoreDisplay = document.getElementById('score');
    const message = document.createElement('div');
    const message_text = document.createElement('h3');
    const startButton = document.createElement('button');

    const blockWidth = 100;
    const blockHeight = 20;
    const boardWidth = 580;
    const boardHeight = 300;
    const userStartPosition = [230, 10];
    const ballStartPosition = [230 + (blockWidth/2) - 10, 20+blockHeight]; 
    const userSpeed = 25;
    let ballDiameter = 20;
    let currentPosition = userStartPosition;
    let ballCurrentPosition = ballStartPosition;
    let xDirection = 2;
    let yDirection = 2;

    let ballMovementSpeed;
    let score = 0;
    
    class Block {
        constructor(xAxis, yAxis) {
            this.bottomLeft = [xAxis, yAxis];
            this.bottomRight = [xAxis + blockWidth, yAxis];
            this.topLeft = [xAxis, yAxis + blockHeight];
            this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
        }
    }

    let blocks = []

    // Draw a block
    function drawBlocks() {
        for (let i = 0; i < blocks.length; i++) {
            const block = document.createElement('div');
            block.classList.add('block');
            block.style.left = `${blocks[i].bottomLeft[0]}px`;
            block.style.bottom = `${blocks[i].bottomLeft[1]}px`; 
            grid.appendChild(block);
        }
    }

    function removeBlocks() {
        const allBlocks = Array.from(document.querySelectorAll('.block'))
        for (let i = 0; i < allBlocks.length; i++) {
            allBlocks[i].classList.remove('block')
            grid.removeChild(allBlocks[i]);
        }
    }

    // Add user
    const user = document.createElement('div');
    user.classList.add('user');
    drawUser();
    grid.appendChild(user); 

    // Changes the style of user, it moves it
    function drawUser() {
        user.style.left = currentPosition[0] + 'px';
        user.style.bottom = currentPosition[1] + 'px'; 
    }

    // Draws a ball in the screen
    function drawBall() {
        ball.style.left = ballCurrentPosition[0] + 'px';
        ball.style.bottom = ballCurrentPosition[1] + 'px';
    }

    // Move User
    function moveUser(event) {
        switch(event.key) {
            case 'ArrowLeft':
                if(currentPosition[0] >= 20) {
                    currentPosition[0] -= userSpeed;
                    drawUser();
                }    
                
                break;
                
            case 'ArrowRight':
                if(currentPosition[0] <= boardWidth - blockWidth - 30) {
                    currentPosition[0] += userSpeed;
                    drawUser();
                }
                break;
        }
    }

    function moveBall() {
        ballCurrentPosition[0] += xDirection;
        ballCurrentPosition[1] += yDirection;
        drawBall();
        checkForCollision();
    }

    function checkForCollision() {
        //check for block collision
        for (let i = 0; i < blocks.length; i++){
          if
          (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) 
          )
            {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            console.log(blocks)
            changeDirection()  
            score++
            scoreDisplay.innerHTML = `Score: ${score}`
            if (blocks.length == 0) {
              scoreDisplay.innerHTML = 'You Win!'
              clearInterval(ballMovementSpeed)
              document.removeEventListener('keydown', moveUser)
              msg('You made it!')
            }
          }
        }
        // check for wall hits
        if (ballCurrentPosition[0] >= (boardWidth - ballDiameter - 10) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter -10))
        {
          changeDirection()
        }
      
        //check for user collision
        if
        (
          (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
          (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight ) 
        )
        {
          changeDirection()
        }
      
        //game over
        if (ballCurrentPosition[1] <= 10) {
          clearInterval(ballMovementSpeed)
          scoreDisplay.innerHTML = 'You lose!'
          document.removeEventListener('keydown', moveUser)
          msg('You lose')
        }
      }
    function changeDirection() {
        if(xDirection === 2 && yDirection === 2) {
            yDirection = -2; 
            return;
        } else if (xDirection === 2 && yDirection == -2) {
            xDirection = -2;
            return; 
        } else if (xDirection === -2 && yDirection == -2) {
            yDirection = 2;
            return; 
        } else {
            xDirection = 2;
            return; 
        }
    } 

    function startGame() {
        score = 0
        // Remake blocks
        blocks = [
            new Block(20,260),
            new Block(130,260),
            new Block(240,260),
            new Block(350,260),
            new Block(460,260),
            new Block(20,230),
            new Block(130,230),
            new Block(240,230),
            new Block(350,230),
            new Block(460,230),
            new Block(20,200),
            new Block(130,200),
            new Block(240,200),
            new Block(350,200),
            new Block(460,200)
        ]
        removeBlocks();
        drawBlocks();
        currentPosition = [230, 10];
        drawUser();

        ballCurrentPosition = [230 + (blockWidth/2) - 10, 20+blockHeight];
        changeDirection();
        document.body.removeChild(message);

        document.addEventListener('keydown', moveUser);
        ballMovementSpeed = setInterval(moveBall, 10);
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

    msg('Eliminate all the blocks')
    
    ball.classList.add('ball');
    grid.appendChild(ball);
    drawBlocks();
    drawBall();
})