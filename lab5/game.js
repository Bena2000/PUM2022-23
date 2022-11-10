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
var keyboardMoveSpeed=5;

var width = 800;
var height = 600;

let roadLines = [
    [width/2, 0]
  ];

  let balls = [];
var ballX = 0;
var ballY = -7;

var playerSpeed = 5;

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
        roadLines.push([width/2, 0]);
    }
}

function moveLines()
{
    var removeFront=false;
    for(var i = 0; i < roadLines.length; i++) {
        roadLines[i][1]+=playerSpeed;

        if(roadLines[i][1]>height)
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
    ctxGradient.rect(position, 0, width, height);
    ctxGradient.fillStyle = "#006400";
    ctxGradient.fill();
    ctxGradient.closePath();
}

function drawAsphalt(position,width)
{
    ctxGradient.beginPath();
    ctxGradient.rect(position, 0, width, height);
    ctxGradient.fillStyle = "#696969";
    ctxGradient.fill();
    ctxGradient.closePath();
}

function drawPath()
{
    drawGrass(0,200);
    drawAsphalt(200,width-200-200);
    drawGrass(width-200,200);
}

function draw() {
    ctxGradient.clearRect(0, 0, c.width, c.height);
    //drawing
    drawPath();
    drawLines();
    drawPlayer();
    drawBalls();
    //moving
    moveLines();
    moveBalls();
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
