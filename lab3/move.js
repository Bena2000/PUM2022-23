var c = document.getElementById("circle");
var ctxGradient = c.getContext("2d");
//keyboard
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
//platform
var platformHeight = 10;
var platformWidth = 75;
var platformX = (c.width-platformWidth)/2;
var keyboardMoveSpeed=5;

let balls = [
    [platformX+platformWidth/2, c.height-platformHeight]
  ];
var dx = 0;
var dy = -4;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }else if(e.key == " ")
    {
        if(spacePressed==false)
        {
            onSpaceClick();
        }
        spacePressed=true;
    }
}

function onSpaceClick()
{
    console.log("shoot");
    // balls[i][0] = platformX+platformWidth/2;
    //         balls[i][1] = c.height-platformHeight;
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }else if(e.key == " ") {
        spacePressed = false;
    }
}
function drawBalls()
{
    for(var i = 0; i < balls.length; i++) {
        drawBall(balls[i][0],balls[i][1]);
    }
}

function drawBall(x,y) {
    ctxGradient.beginPath();
    ctxGradient.arc(x, y, 10, 0, Math.PI*2);
    ctxGradient.fillStyle = "#0095DD";
    ctxGradient.fill();
    ctxGradient.closePath();
}

function drawPlayer() {
    ctxGradient.beginPath();
    ctxGradient.rect(platformX, c.height-platformHeight, platformWidth, platformHeight);
    ctxGradient.fillStyle = "#0095DD";
    ctxGradient.fill();
    ctxGradient.closePath();
}

function moveBalls()
{
    for(var i = 0; i < balls.length; i++) {
        balls[i][0]+=dx;
        balls[i][1]+=dy;

        if(balls[i][0]>c.width || balls[i][0]<0 || balls[i][1]<0)
        {
            balls[i][0] = platformX+platformWidth/2;
            balls[i][1] = c.height-platformHeight;
        }
    }
}

function draw() {
    ctxGradient.clearRect(0, 0, c.width, c.height);
    drawBalls();
    drawPlayer();
    moveBalls();

    if(rightPressed)
    {
        platformX+=keyboardMoveSpeed;
    }else if(leftPressed){
        platformX-=keyboardMoveSpeed;
    }
}

setInterval(draw, 10);
