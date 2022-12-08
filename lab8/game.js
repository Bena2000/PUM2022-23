const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

var mapCellSize=50;

let map = null;
let shapes=[];

function startGame() {
    map = new Map(0,0,9,mapCellSize,"blue");
}

class Map {
    constructor(x,y,cellsCount,cellSize,lineWidth,color){
        this.x = x;
        this.y = y;
        this.cellsCount = cellsCount;
        this.cellSize = cellSize;
        this.lineWidth = lineWidth;
        this.color = color;

        for(let i = 0; i < this.cellsCount; i++)
        {
            for(let j = 0; j < this.cellsCount; j++)
            {
                var mapButton = {
                    center: {
                        x: cellSize*i,
                        y: cellSize*j
                    },
                    color: -1
                }
                shapes.push(mapButton);
            }
        }
    }
    
    draw() {
        let mapSizeXY = this.cellSize*this.cellsCount;
        for (let i = 0; i < this.cellsCount; i++) {
            //X
            this.drawLine(this.cellSize,this.cellSize*(i+1),mapSizeXY,this.cellSize*(i+1),this.lineWidth);
            //Y
            this.drawLine(this.cellSize*(i+1),this.cellSize, this.cellSize*(i+1),mapSizeXY,this.lineWidth);
        }
    }

    drawLine(x,y,x2,y2,lineWidth)
    {
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x2,y2);
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
}

function define(shape) {
    var center = shape.center;
    ctx.beginPath();
    ctx.arc(center.x, center.y,mapCellSize/2, 0, Math.PI*2);
}

function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

let animationId = null;
function animate() {
    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //player
    map.draw();
    
}

startGame();
animate();

function onClick(e) {
    // e.preventDefault();
    var element = canvas;
    var offsetX = 0, offsetY = 0
        if (element.offsetParent) {
      do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
      } while ((element = element.offsetParent));
    }
    var mouseX = parseInt(e.pageX-offsetX);
    var mouseY = parseInt(e.pageY- offsetY);

    for (var i = 0; i < shapes.length; i++) {
        var shape = shapes[i];
        // define the current shape
        define(shape);
        // test if the mouse is in the current shape
        if (ctx.isPointInPath(mouseX, mouseY)) {
            // if inside, display the shape's message
            console.log(shape.center.x + shape.center.y);
        }
    }
    // console.log(mouseX+" "+mouseY);
}

canvas.addEventListener('click', onClick, false);
//Restart game
function restartGame(button) {
    startGame();
    requestAnimationFrame(animate);
}

