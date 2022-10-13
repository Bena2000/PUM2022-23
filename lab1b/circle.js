var c = document.getElementById("circle");
var ctx = c.getContext("2d");
//shape code
ctx.beginPath();
ctx.arc(400, 300, 250, 0, 2 * Math.PI);
ctx.fillStyle = "blue";
ctx.fill();
ctx.closePath();

setInterval(ChangeColor, 1);
var green=0;
var changeToGreen=1;

function ChangeColor(){
    if(changeToGreen===1)
    {
        green++;
    }else{
        green--;
    }
        
    console.log(green);
    ctx.fillStyle= `rgb(0, ${green}, ${255-green})`;
    ctx.fill();

    if(green<=0)
    {
        changeToGreen=1;
    }else if(green>=255){
        changeToGreen=0;
    }
}