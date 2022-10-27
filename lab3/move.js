var c = document.getElementById("circle");
var ctxGradient = c.getContext("2d");

var x = c.width/2;
var y = c.height-30;
var dx = 2;
var dy = -2;
let rightPressed = false;
let leftPressed = false;

var platformHeight = 10;
var platformWidth = 75;
var platformX = (c.width-platformWidth)/2;
var keyboardMoveSpeed=2;

function drawBall() {
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

function draw() {

    if(x>c.width || x<0 || y<0)
    {
        x = c.width/2;
        y = c.height-30;
    }

    ctxGradient.clearRect(0, 0, c.width, c.height);
    drawBall();
    drawPlayer();
    x += dx;
    y += dy;
}

setInterval(draw, 10);
