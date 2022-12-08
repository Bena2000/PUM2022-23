const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

var platformHeight=20;

let map = null;
let buttons=[];

function startGame() {
    map = new Map(0,0,9,50,"blue");
}

class Map {
    constructor(x,y,cellsCount,cellSize,lineWidth,color){
        this.x = x;
        this.y = y;
        this.cellsCount = cellsCount;
        this.cellSize = cellSize;
        this.lineWidth = lineWidth;
        this.color = color;        
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
    console.log(mouseX+" "+mouseY);
}

canvas.addEventListener('click', onClick, false);
//Restart game
function restartGame(button) {
    startGame();
    requestAnimationFrame(animate);
}

