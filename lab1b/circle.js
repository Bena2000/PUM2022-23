var c = document.getElementById("circle");
var ctx = c.getContext("2d");
//gradient
var grd = ctx.createLinearGradient(0, 0, 500, 0);
grd.addColorStop(0, "blue");
grd.addColorStop(1, "green");

//shape code
ctx.beginPath();
ctx.arc(400, 300, 250, 0, 2 * Math.PI);
ctx.fillStyle = grd;
ctx.fill();
ctx.closePath();

for(let green=0;green<255;green++)
{
    ctx.fillStyle= 'rgb(0, green, 255-green)';
    ctx.fill();
}
//0,green,255-green


// setInterval(ChangeColor, 1000);
var i=0;

function ChangeColor(){

    ctx.fillStyle= i===0?"green":"blue";
    i=(i+1)%2;
    ctx.fill();
}