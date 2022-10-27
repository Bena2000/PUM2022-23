var c = document.getElementById("circle");
var ctxGradient = c.getContext("2d");
//shape code
ctxGradient.beginPath();
ctxGradient.arc(200, 150, 150, 0, 2 * Math.PI);
ctxGradient.fillStyle = "blue";
ctxGradient.fill();
ctxGradient.closePath();

setInterval(ChangeColorGradient, 1);
var green=0;
var changeToGreen=1;

function ChangeColorGradient(){
    if(changeToGreen===1)
    {
        green++;
    }else{
        green--;
    }
    
    ctxGradient.fillStyle= `rgb(0, ${green}, ${255-green})`;
    ctxGradient.fill();

    if(green<=0)
    {
        changeToGreen=1;
    }else if(green>=255){
        changeToGreen=0;
    }
}