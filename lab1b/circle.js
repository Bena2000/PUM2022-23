var c = document.getElementById("circle");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.arc(400, 300, 250, 0, 2 * Math.PI);
ctx.fillStyle = "blue";
ctx.fill();
ctx.closePath();

setInterval(ChangeColor, 1000);
var i=0;

function ChangeColor(){

    ctx.fillStyle= i===0?"green":"blue";
    i=(i+1)%2;
    ctx.fill();
}
	
