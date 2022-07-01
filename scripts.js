const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

//Create brick props
const brickInfo = {
    w: 70,
    h:20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}
//Create bricks
const bricks = [];
for(let i = 0; i < brickRowCount; i++){
    bricks[i] = [];
    for(let j = 0; j < brickColumnCount; j++){
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo}
    }
}


//Create paddle props
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

//Create ball drops
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

//Draw ball on canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2,);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

//Draw paddle on canvas
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}


//Draw score on canvas
function drawScore(){
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

//Draw bricks on canvas
function drawBricks(){
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent'
            ctx.fill();
            ctx.closePath();        
        })
    })
}

//Move paddle on canvas
function movePaddle() {
    paddle.x += paddle.dx;
    
    //Wall detection
    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
    }
    if(paddle.x < 0){
        paddle.x = 0;
    }
}


//Draw everything
function draw() {
    //Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}


//Update canvas drawing and animation
function update(){
    movePaddle();
    //Draw everything
    draw();
    requestAnimationFrame(update);
}

update()

//Keydown event
function keyDown(e){
    if(e.key === 'Right' || e.key === 'ArrowRight'){
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
}

//KeyUp event
function keyUp(e){
    if(
        e.key === 'Right' || 
        e.key === 'ArrowRight' || 
        e.key === 'Left' || 
        e.key === 'ArrowLeft'
        ){
        paddle.dx = 0;
    }
}
//Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);



// Rules and close event handlers
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
})

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
})