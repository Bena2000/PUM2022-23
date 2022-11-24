var c = document.getElementById("circle");
var ctxGradient = c.getContext("2d");
//keyboard
let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
let aPressed = false;
let zPressed = false;
//platform
var carHeight = 70;
var carWidth = 75;
var carX = (c.width-carWidth)/2;
var carY = c.height-carHeight;
var keyboardMoveSpeed=6;

var canvasWidth = 800;
var canvasHeight = 600;

var roadLinesDistance = 100;
var leftRightLinesDistance = 150;

var roadWidth = 400;

var obstacleWidth = 60;
var obstacleHeight = 60;

let roadLines = [
    [canvasWidth/2, roadLinesDistance],
    [canvasWidth/2, 0]
  ];

let leftLines = [
    [canvasWidth/2-roadWidth/2, 0]
  ];
let rightLines = [
    [canvasWidth/2+roadWidth/2, 0]
  ];

let balls = [];
let obstacles = [];

var ballX = 0;
var ballY = -7;

var playerSpeed = 5;
var playerMaxSpeed = 10;
var playerMinSpeed = 1;

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
    }else if(e.key == "Up" || e.key == "ArrowUp")
    {
        upPressed=true;
    }else if(e.key == "Down" || e.key == "ArrowDown")
    {
        downPressed=true;
    }
    if(e.key == " ")
    {
        if(spacePressed==false)
        {
            onSpaceClick();
        }
        spacePressed=true;
    }
    if(e.key == "a")
    {
        if(aPressed==false)
        {
            onAClick();
        }
        aPressed==true;
    }else if(e.key == "z")
    {
        if(zPressed==false)
        {
            onZClick();
        }
        zPressed==true;
    }
}

function onSpaceClick()
{
    balls.push([carX+carWidth/2, c.height-carHeight]);
}

function onAClick()
{
    if(playerSpeed<playerMaxSpeed)
    {
        playerSpeed+=1;
    }
}

function onZClick()
{
    if(playerSpeed>playerMinSpeed)
    {
        playerSpeed-=1;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }else if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed=false;
    }else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed=false;
    }else if(e.key == " "){
        spacePressed = false;
    }else if(e.key == "a"){
        aPressed==false;
    }else if(e.key == "z"){
        zPressed==false;
    }
}

function addLine()
{
    if(roadLines.length>1 && roadLines[roadLines.length-1][1]>=roadLinesDistance)
    {
        roadLines.push([canvasWidth/2, 0]);
    }

    if(leftLines.length>0 && leftLines[leftLines.length-1][1]>=leftRightLinesDistance)
    {
        leftLines.push([canvasWidth/2-roadWidth/2, 0]);
    }

    if(rightLines.length>0 && rightLines[rightLines.length-1][1]>=leftRightLinesDistance)
    {
        rightLines.push([canvasWidth/2+roadWidth/2, 0]);
    }
}

function moveLines(collection)
{
    var removeFront=false;
    for(var i = 0; i < collection.length; i++) {
        collection[i][1]+=playerSpeed;

        if(collection[i][1]>canvasHeight)
        {
            removeFront = true;
        }
    }
    if(removeFront)
    {
        collection.shift();
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

function movePlayer()
{
    if(rightPressed)
    {
        carX+=keyboardMoveSpeed;
    }else if(leftPressed){
        carX-=keyboardMoveSpeed;
    }
    
    if(upPressed)
    {
        carY-=keyboardMoveSpeed;
    }else if(downPressed){
        carY+=keyboardMoveSpeed;
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
    drawLine(canvasWidth/2-roadWidth/2,0,10,canvasHeight,"#ff0000");
    drawLine(canvasWidth/2+roadWidth/2,0,10 ,canvasHeight,"#ff0000");

    for(var i = 0; i < roadLines.length; i++) {
        drawLine(roadLines[i][0],roadLines[i][1],10,25,"#FFFFFF");
    }

    for(var i = 0; i < leftLines.length; i++) {
        drawLine(leftLines[i][0],leftLines[i][1],10,leftRightLinesDistance/2,"#FFFFFF");
        drawLine(rightLines[i][0],rightLines[i][1],10,leftRightLinesDistance/2,"#FFFFFF");
    }
}

function drawLine(x,y,sizeX,sizeY,color) {
    ctxGradient.beginPath();
    ctxGradient.rect(x, y, sizeX, sizeY);
    ctxGradient.fillStyle = color;
    ctxGradient.fill();
    ctxGradient.closePath();
}

function drawPlayer() {
    ctxGradient.beginPath();
    ctxGradient.rect(carX,carY, carWidth, carHeight);
    ctxGradient.fillStyle = "#0095DD";
    ctxGradient.fill();
    ctxGradient.closePath();
}

function drawPath()
{
    var spaceForGrass = (canvasWidth-roadWidth)/2;
    drawLine(0,0,spaceForGrass,canvasHeight,"#006400");//grass
    drawLine(spaceForGrass,0,roadWidth,canvasHeight,"#696969");//asphalt
    drawLine(canvasWidth-spaceForGrass,0,spaceForGrass,canvasHeight,"#006400");//grass
}

function detectObstaclesAndBallsCollisions()
{
    for(var i = 0; i < obstacles.length; i++) {
        var centerX = obstacles[i][0]+obstacleWidth/2;
        var centerY = obstacles[i][1]-obstacleHeight/2;
        // for(var i = 0; i < balls.length; i++) {
        //     if(dist(centerX, centerY, balls[i][0], balls[i][1])<obstacleWidth)
        //     {
        //         console.log("DUP");
        //     }
        // }
    }
}

function speedometer()
{
    ctxGradient.beginPath();
    ctxGradient.font = "30px Comic Sans MS";
    ctxGradient.fillStyle = "red";
    ctxGradient.textAlign = "center";
    ctxGradient.fillText("Speed: "+playerSpeed.toString(), 100, 50);
    ctxGradient.closePath();
}

function dist(x1,y1,x2,y2)
{
    return Math.pow(Math.pow(x2 - x1, 2)+ Math.pow(y2 - y1, 2),0.5);
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
    moveLines(roadLines);
    moveLines(leftLines);
    moveLines(rightLines);
    moveObstacles();
    movePlayer();
    moveBalls();
    //adding
    addLine();
    detectObstaclesAndBallsCollisions();
    speedometer();
    console.log(playerSpeed);
}

setInterval(draw, 10);
setTimeout(addObstacle,3000);
