var c = document.getElementById("circle");
var ctx = c.getContext("2d");
//gradient
var grd = ctx.createLinearGradient(0, 0, 450, 0);
grd.addColorStop(0, "blue");
grd.addColorStop(1, "green");

//shape code
ctx.beginPath();
ctx.arc(400, 300, 250, 0, 2 * Math.PI);
ctx.fillStyle = grd;
ctx.fill();
ctx.closePath();
//0,green,250-green


// setInterval(ChangeColor, 1000);
var i=0;

function ChangeColor(){

    ctx.fillStyle= i===0?"green":"blue";
    i=(i+1)%2;
    ctx.fill();
}