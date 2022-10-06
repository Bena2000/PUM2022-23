var c = document.getElementById("circle");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.arc(400, 300, 250, 0, 2 * Math.PI);
ctx.fillStyle = "blue";
ctx.fill();