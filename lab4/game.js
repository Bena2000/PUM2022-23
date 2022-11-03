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

let balls = [
    [carX+carWidth/2, c.height-carHeight]
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
    balls.push([carX+carWidth/2,c.height-carHeight]);
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
// function drawBalls()
// {
//     for(var i = 0; i < balls.length; i++) {
//         drawBall(balls[i][0],balls[i][1]);
//     }
// }

// function drawBall(x,y) {
//     ctxGradient.beginPath();
//     ctxGradient.arc(x, y, 10, 0, Math.PI*2);
//     ctxGradient.fillStyle = "#0095DD";
//     ctxGradient.fill();
//     ctxGradient.closePath();
// }

function drawPlayer() {
    ctxGradient.beginPath();
    ctxGradient.rect(carX, c.height-carHeight, carWidth, carHeight);
    ctxGradient.fillStyle = "#696969";
    ctxGradient.fill();
    ctxGradient.closePath();
}

// function moveBalls()
// {
//     let indexesToRemove=[];
//     for(var i = 0; i < balls.length; i++) {
//         balls[i][0]+=dx;
//         balls[i][1]+=dy;

//         if(balls[i][0]>c.width || balls[i][0]<0 || balls[i][1]<0)
//         {
//             indexesToRemove.push(i);
//         }
//     }
//     for(var i = 0; i < indexesToRemove.length; i++)
//     {
//         balls=balls.slice(i);
//     }
// }
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
    // drawBalls();
    drawPath();
    drawPlayer();
    // moveBalls();

    if(rightPressed)
    {
        carX+=keyboardMoveSpeed;
    }else if(leftPressed){
        carX-=keyboardMoveSpeed;
    }
}

setInterval(draw, 10);
