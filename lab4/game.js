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
var dx = 0;
var dy = -5;

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
    roadLines.push([width/2, 0]);
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
function drawLines()
{
    for(var i = 0; i < roadLines.length; i++) {
        drawLine(roadLines[i][0],roadLines[i][1]);
    }
}

function drawLine(x,y) {
    ctxGradient.beginPath();
    ctxGradient.rect(x, y, 10, 25);
    ctxGradient.fillStyle = "#0095DD";
    ctxGradient.fill();
    ctxGradient.closePath();
}

function drawPlayer() {
    ctxGradient.beginPath();
    ctxGradient.rect(carX, c.height-carHeight, carWidth, carHeight);
    ctxGradient.fillStyle = "#696969";
    ctxGradient.fill();
    ctxGradient.closePath();
}

function moveLines()
{
    let indexesToRemove=[];
    for(var i = 0; i < roadLines.length; i++) {
        // balls[i][0]+=dx;
        roadLines[i][1]-=dy;

        if(roadLines[i][1]>height)
        {
            indexesToRemove.push(i);
            console.log(roadLines[i][1]);
        }
    }
    for(var i = 0; i < indexesToRemove.length; i++)
    {
        roadLines=roadLines.slice(i);
    }
}
function drawGrass(position,width)
{
    ctxGradient.beginPath();
    ctxGradient.rect(position, 0, width, height);
    ctxGradient.fillStyle = "#006400";
    ctxGradient.fill();
    ctxGradient.closePath();
}

function drawPath()
{
    drawGrass(0,200);
    drawGrass(width-200,200);
}

function draw() {
    ctxGradient.clearRect(0, 0, c.width, c.height);
    drawLines();
    drawPath();
    drawPlayer();
    moveLines();

    if(rightPressed)
    {
        carX+=keyboardMoveSpeed;
    }else if(leftPressed){
        carX-=keyboardMoveSpeed;
    }
    console.log(roadLines.length);
}

setInterval(draw, 10);
