var c = document.getElementById("circle");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.fillStyle = "#FF0000";
ctx.arc(400, 300, 250, 0, 2 * Math.PI);
ctx.stroke();