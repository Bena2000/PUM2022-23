const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

var platformHeight=20;


let player = null;
let arrayObstacles = [];

let enemySpeed = 5;

function startGame() {
    player = new Player(150,350,50,"blue");
    arrayObstacles = [];
}

function getRandomNumber(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Returns true of colliding
function squaresColliding(player,obstacle){
    let s1 = Object.assign(Object.create(Object.getPrototypeOf(player)), player);
    let s2 = Object.assign(Object.create(Object.getPrototypeOf(obstacle)), obstacle);
    //Don't need pixel perfect collision detection
    s2.size = s2.size - 10;
    s2.x = s2.x + 10;
    s2.y = s2.y + 10;
    return !(
        s1.x>s2.x+s2.size || //R1 is to the right of R2
        s1.x+s1.size<s2.x || //R1 to the left of R2
        s1.y>s2.y+s2.size || //R1 is below R2
        s1.y+s1.size<s2.y //R1 is above R2
    )
}

class Player {
    constructor(x,y,size,color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.jumpHeight = 12;

        this.shouldJump = false;
        this.jumpCounter = 0;
        this.jumpUp = true;
        
    }

    draw() {
        this.jump();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }

    jump() {
        if(this.shouldJump){
            this.jumpCounter++;
            if(this.jumpCounter < 15){
                //Go up
                this.y -= this.jumpHeight;
            }else if(this.jumpCounter > 14 && this.jumpCounter < 19){
                this.y += 0;
            }else if(this.jumpCounter < 33){
                //Come back down
                this.y += this.jumpHeight;
            }
            //End the cycle
            if(this.jumpCounter >= 32){
                this.shouldJump = false;
            }
        }    
    }
    
    counterRotation() {
        //This rotates the cube back to its origin so that it can be moved upwards properly
        let offsetXPosition = this.x + (this.size / 2);
        let offsetYPosition = this.y + (this.size / 2);
        ctx.translate(offsetXPosition,offsetYPosition);
        ctx.rotate(-this.spin * Math.PI / 180 );
        ctx.translate(-offsetXPosition,-offsetYPosition);
    }

}

class AvoidObstacle {
    constructor(size, speed){
        this.x = canvas.width + size;
        this.y = 400 - size;
        this.size = size;
        this.color = "red";
        this.slideSpeed = speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }

    slide() {
        this.draw();
        this.x -= this.slideSpeed;
    }
    
}

function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function generateBlocks() {

    let timeDelay = randomIntBetween(1,3);
    arrayObstacles.push(new AvoidObstacle(50, enemySpeed));

    setTimeout(generateBlocks, timeDelay*1000);
}

function drawPlatform() {
    ctx.beginPath();
    //gradient
    var grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "white");

    ctx.rect(0, 400, canvas.width, platformHeight);
    ctx.fillStyle=grd;
    ctx.fill();
    
    ctx.stroke();
}


let animationId = null;
function animate() {
    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawPlatform();
    //player
    player.draw();
    //blocks
    arrayObstacles.forEach((arrayBlock, index) => {
        arrayBlock.slide();
        
        if(squaresColliding(player, arrayBlock)){
            console.log("Dead");
            cancelAnimationFrame(animationId);
        }
        
        if((arrayBlock.x + arrayBlock.size) <= 0){
            setTimeout(() => {
                arrayObstacles.splice(index, 1);
            }, 0)
        }
    });
}

startGame();
animate();


//Event Listeners
addEventListener("keydown", e => {
    if(e.code === 'Space'){
        if(!player.shouldJump){
            player.jumpCounter = 0;
            player.shouldJump = true;
        }
    }
});

setTimeout(() => {
    generateBlocks();
}, randomIntBetween(1,3)*1000)

//Restart game
function restartGame(button) {
    startGame();
    requestAnimationFrame(animate);
}

