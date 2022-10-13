var c = document.getElementById("circle");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.arc(400, 300, 250, 0, 2 * Math.PI);
ctx.fillStyle = "blue";
ctx.fill();
ctx.closePath();

setInterval(ChangeColor, 1000);

const element = document.getElementById("demo");
function ChangeColor(){
    if(ctx.fillStyle==="#0000ff")
    {
        ctx.fillStyle="green";
    }
    else
    {
        ctx.fillStyle="blue";
    }

    // ctx.fillStyle==="blue"?"green":"blue";
    ctx.fill();
}
	
