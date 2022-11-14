var c = document.getElementById("circle");
var ctxGradient = c.getContext("2d");
//keyboard
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
//platform
var carHeight = 70;
var carWidth = 75;
var carX = (c.width-carWidth)/2;
var keyboardMoveSpeed=6;

var canvasWidth = 800;
var canvasHeight = 600;

var roadWidth = 400;

var obstacleWidth = 60;
var obstacleHeight = 60;

let roadLines = [
    [canvasWidth/2, 0]
  ];

let balls = [];
let obstacles = [];

var ballX = 0;
var ballY = -7;

var playerSpeed = 5;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

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
    balls.push([carX+carWidth/2, c.height-carHeight]);
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

function addLine()
{
    if(roadLines.length>0 && roadLines[0][1]%100===0)
    {
        roadLines.push([canvasWidth/2, 0]);
    }
}

function moveLines()
{
    var removeFront=false;
    for(var i = 0; i < roadLines.length; i++) {
        roadLines[i][1]+=playerSpeed;

        if(roadLines[i][1]>canvasHeight)
        {
            removeFront = true;
        }
    }

    if(removeFront)
    {
        roadLines.shift();
    }
}

function moveBalls()
{
    var removeFront=false;
    for(var i = 0; i < balls.length; i++) {
        balls[i][0]+=ballX;
        balls[i][1]+=ballY;

        if(balls[i][0]>c.width || balls[i][0]<0 || balls[i][1]<0)
        {
            removeFront = true;
        }
    }
    if(removeFront)
    {
        balls.shift();
    }
}

function moveObstacles()
{
    var removeFront=false;
    for(var i = 0; i < obstacles.length; i++) {
        obstacles[i][1]+=playerSpeed;

        if(obstacles[i][1]>canvasHeight)
        {
            removeFront = true;
        }
    }
    if(removeFront)
    {
        obstacles.shift();
    }
}

function drawObstacles()
{
    for(var i = 0; i < obstacles.length; i++) {
        drawObstacle(obstacles[i][0],obstacles[i][1]);
    }
}

function drawObstacle(x,y) {
    ctxGradient.beginPath();
    ctxGradient.rect(x, y, obstacleWidth, obstacleHeight);
    ctxGradient.fillStyle = "#8B4513";
    ctxGradient.fill();
    ctxGradient.closePath();
}

function addObstacle()
{
    var spaceForGrass = (canvasWidth-roadWidth)/2;
    var time = randomIntBetween(1,2);
    var xPosition = randomIntBetween(spaceForGrass,canvasWidth-spaceForGrass);

    if(!document.hidden)
        obstacles.push([xPosition, 0]);

    setTimeout(addObstacle,time*1000);
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

function drawLines()
{
    for(var i = 0; i < roadLines.length; i++) {
        drawLine(roadLines[i][0],roadLines[i][1]);
    }
}

function drawLine(x,y) {
    ctxGradient.beginPath();
    ctxGradient.rect(x, y, 10, 25);
    ctxGradient.fillStyle = "#FFFFFF";
    ctxGradient.fill();
    ctxGradient.closePath();
}

function drawPlayer() {
    ctxGradient.beginPath();
    ctxGradient.rect(carX, c.height-carHeight, carWidth, carHeight);
    ctxGradient.fillStyle = "#0095DD";
    ctxGradient.fill();
    ctxGradient.closePath();
}

function drawGrass(position,width)
{
    ctxGradient.beginPath();
    ctxGradient.rect(position, 0, width, canvasHeight);
    ctxGradient.fillStyle = "#006400";
    ctxGradient.fill();
    ctxGradient.closePath();
}

function drawAsphalt(position,width)
{
    ctxGradient.beginPath();
    ctxGradient.rect(position, 0, width, canvasHeight);
    ctxGradient.fillStyle = "#696969";
    ctxGradient.fill();
    ctxGradient.closePath();
}

function drawPath()
{
    var spaceForGrass = (canvasWidth-roadWidth)/2;
    drawGrass(0,spaceForGrass);
    drawAsphalt(spaceForGrass,roadWidth);
    drawGrass(canvasWidth-spaceForGrass,spaceForGrass);
}

function draw() {
    if(document.hidden)
        return;
    ctxGradient.clearRect(0, 0, c.width, c.height);
    //drawing
    drawPath();
    drawLines();
    drawObstacles();
    drawPlayer();
    drawBalls();
    //moving
    moveLines();
    moveBalls();
    moveObstacles();
    //adding
    addLine();

    if(rightPressed)
    {
        carX+=keyboardMoveSpeed;
    }else if(leftPressed){
        carX-=keyboardMoveSpeed;
    }
}

setInterval(draw, 10);
setTimeout(addObstacle,3000);
