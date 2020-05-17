var canvas = document.getElementById("myCanvas");
var pause = document.querySelector(".btn_p");
var resume = document.querySelector(".btn_r");
var div = document.querySelector(".div");
pause.style.marginTop=div.clientHeight/3+"px";
resume.style.marginTop=div.clientHeight/3+"px"
pause.style.fontWeight="bold"
resume.style.fontWeight="bold"
pause.style.fontSize=div.clientHeight/5+"px";
resume.style.fontSize=div.clientHeight/5+"px";
pause.style.height=div.clientHeight/3+"px";
resume.style.height=div.clientHeight/3+"px";
resume.style.marginLeft=div.clientWidth/12+"px";
resume.style.marginRight=div.clientWidth/6+"px";
pause.style.marginRight=div.clientWidth/12+"px";
pause.style.marginLeft=div.clientWidth/6+"px";
resume.style.width=div.clientWidth/5+"px";
pause.style.width=div.clientWidth/5+"px";
var ctx = canvas.getContext("2d");
var cir1=canvas.getContext("2d");
var cir2=canvas.getContext("2d");
var cir3=canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-50;
var z = 0;
var dy = 0;
var angle1=0;
var angle2=Math.PI;
var score=0;
var bestscore=0;
var ctxcolor;
var cir1color;
var cir2color;
var point=0;
var k=0;
var temp=0;
var tem=0;
var choice=0;
var choose=0;
var t=0;
var start=0;
var continuelooping=0;
ctx.font = "100% Arial";
ctx.fillStyle = "white";
ctx.fillText("Click on the screen", canvas.width/3-30, canvas.height/2-12);
ctx.fillText("to start the game", canvas.width/3-20, canvas.height/2+12);
var audio = new Audio('2012-11-10_Darkness_Approaches_-_David_Fesliyan.mp3');
function prodsound(){
	audio.play();
}
pause.addEventListener("click",function(){
	clearInterval(window.resetvar);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.font = "90% Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Press RESUME button to continue", (canvas.width/2)-100,canvas.height/2);
    t=1;
})
resume.addEventListener("click",function(){
	if(t==1){window.resetvar=setInterval(draw,10);}
    })
var colors=["#ffffff","#ff0000","#e699ff","#ffff99","#99c2ff","#F633FF","#26E5D4"];
if((localStorage.getItem("bestscore"))!=null){bestscore=localStorage.getItem("bestscore");}
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if(temp==0){choosecolor();temp++;}
	if(choose==0){drawobstacle1();}
	if(choose==1){drawobstacle2();}
	if(choose==2){drawobstacle3();}
	if(continuelooping==0){
		updatepositionball();
	    drawScore();
	    drawbestScore();
	}	
	if(y+5>=canvas.height){gameover();}
}
function updatepositionball() {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI*2);
    ctx.fillStyle = ctxcolor;
    ctx.fill();
    ctx.closePath();
    y+=dy;
}
function reset(){
	localStorage.setItem("bestscore",bestscore);
    document.location.reload();
}
function drawScore() {
  ctx.font = "100% Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: "+score, 8, 20);
}
function drawbestScore() {
  ctx.font = "100% Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Best Score: "+bestscore, 8, 40);
}
function choosecolor(){
	var i=Math.floor(Math.random()*(6+1));
	var j=Math.floor(Math.random()*(6+1));
	while(i==j){j=Math.floor(Math.random()*(6+1));}
	cir1color=colors[i];
	cir2color=colors[j];
	ctxcolor=colors[i];
}
canvas.addEventListener("click",jump);
function jump(){
	if(start==0){window.resetvar=setInterval(draw,10);start++;}
	k=1;
	tem=1;
	dy = -0.5;
	setTimeout(() => {dy=0.5;}, 320);
}
function chooseobstacle(){
	choose=Math.floor(Math.random()*(2+1));
	if(choose==0){drawobstacle1();}
	if(choose==1){drawobstacle2();}
	if(choose==2){drawobstacle3();}
}
function drawobstacle1(){
	cir1.beginPath();
	cir1.arc(x,z-29,29,angle1,Math.PI+angle1);
	cir1.fillStyle=cir1color;
	cir1.fill();
	cir1.closePath();
	cir2.beginPath();
	cir2.arc(x,z-29,29,angle2,Math.PI+angle2);
	cir2.fillStyle=cir2color;
	cir2.fill();
	cir2.closePath();
	cir3.beginPath();
	cir3.arc(x,z-29,24,0,Math.PI*2);
	cir3.fillStyle="#000000";
	cir3.fill();
	cir3.closePath();
	if(k==1){
	    angle1+=0.01+score*0.001;
	    angle2+=0.01+score*0.001;}
	if(z-2*29>canvas.height){
	    z=0;point=0;temp=0;chooseobstacle();}
	if(angle1>Math.PI*2){angle1=0;}
	if(angle2>Math.PI*2){angle2=0;}
	if(tem==1){z+=0.19;}
	if((y-5<z&&y-5>z-5)||(y+5<z&&y+5>z-5)||(y<z&&y>z-5)){
		if(angle1>Math.PI*1.5||(angle1>=0&&angle1<Math.PI*0.5)){
		}else{
			gameover();
		}
	}
	if((y-5<z-53&&y-5>z-58)||(y+5<z-53&&y+5>z-58)||(y<z-53&&y>z-58)){
		if((angle1>Math.PI*0.5)&&(angle1<Math.PI*1.5)){
		}else{
			gameover();
		}
	}
	if(z-58>y+5){
		if(point==0){score++;point++;
			if(score>=bestscore){bestscore=score;}
		}
	}
	if(y-5==0){
		dy = 0.5;
	}
}
function drawobstacle2(){
	cir1.beginPath();
    cir1.arc(x-29,z-29,29,angle1,Math.PI+angle1);
    cir1.fillStyle=cir1color;
    cir1.fill();
    cir1.closePath();
    cir1.beginPath();
    cir1.arc(x-29,z-29,29,angle2,Math.PI+angle2);
    cir1.fillStyle=cir2color;
    cir1.fill();
    cir1.closePath();
    cir1.beginPath();
    cir1.arc(x-29,z-29,24,0,Math.PI*2);
    cir1.fillStyle="#000000";
    cir1.fill();
    cir1.closePath();
    cir1.beginPath();
    cir1.arc(x+29,z-29,29,-angle1,-(Math.PI+angle1));
    cir1.fillStyle=cir1color;
    cir1.fill();
    cir1.closePath();
    cir1.beginPath();
    cir1.arc(x+29,z-29,29,-angle2,-(Math.PI+angle2));
    cir1.fillStyle=cir2color;
    cir1.fill();
    cir1.closePath();
    cir1.beginPath();
    cir1.arc(x+29,z-29,24,0,Math.PI*2);
    cir1.fillStyle="#000000";
    cir1.fill();
    cir1.closePath();
    if(k==1){
	    angle1+=0.01+score*0.001;
	    angle2+=0.01+score*0.001;}
	if(z-2*29>canvas.height){
	    z=0;point=0;temp=0;chooseobstacle();}
	if(angle1>Math.PI*2){angle1=0;}
	if(angle2>Math.PI*2){angle2=0;}
	if(tem==1){z+=0.19;}
	if((z-29-y<=16&&z-29-y>=0)||(y-z+29<=16&&y-z+29>=0)){
		if(angle2>0.02&&angle2<0.02+Math.PI){
			}else{gameover();}
		}
	if(z-58>y+5){
		if(point==0){score++;point++;
			if(score>=bestscore){bestscore=score;}
		}
	}
	if(y-5==0){
		dy = 0.5;
	}
}
function drawobstacle3(){canvas.height
	cir1.beginPath();
    cir1.arc(x,z-33,33,angle1,Math.PI+angle1);
    cir1.fillStyle=cir1color;
    cir1.fill();
    cir1.closePath();
    cir1.beginPath();
    cir1.arc(x,z-33,33,angle2,Math.PI+angle2);
    cir1.fillStyle=cir2color;
    cir1.fill();
    cir1.closePath();
    cir1.beginPath();
    cir1.arc(x,z-33,29,0,Math.PI*2);
    cir1.fillStyle="#000000";
    cir1.fill();
    cir1.closePath();
    cir1.beginPath();
    cir1.arc(x,z-33,28,-angle1,-(Math.PI+angle1));
    cir1.fillStyle=cir1color;
    cir1.fill();
    cir1.closePath();
    cir1.beginPath();
    cir1.arc(x,z-33,28,-angle2,-(Math.PI+angle2));
    cir1.fillStyle=cir2color;
    cir1.fill();
    cir1.closePath();
    cir1.beginPath();
    cir1.arc(x,z-33,23,0,Math.PI*2);
    cir1.fillStyle="#000000";
    cir1.fill();
    cir1.closePath();
    if(k==1){
	    angle1+=0.01+score*0.001;
	    angle2+=0.01+score*0.001;}
	if(z-2*33>canvas.height){
	    z=0;point=0;temp=0;chooseobstacle();}
	if(angle1>Math.PI*2){angle1=0;}
	if(angle2>Math.PI*2){angle2=0;}
	if(tem==1){z+=0.19;}
	if((y-5<z&&y-5>z-10)||(y+5<z&&y+5>z-10)||(y<z&&y>z-10)){
		if(angle1>Math.PI*1.5||(angle1>=0&&angle1<Math.PI*0.5)){
		}else{
			gameover();
		}
	}
	if((y-5<z-56&&y-5>z-66)||(y+5<z-56&&y+5>z-66)||(y<z-56&&y>z-66)){
		if((angle1>Math.PI*0.5)&&(angle1<Math.PI*1.5)){
		}else{
			gameover();
		}
	}
	if(z-66>y+5){
		if(point==0){score++;point++;
			if(score>=bestscore){bestscore=score;}
		}
	}
	if(y-5==0){
		dy = 0.5;
	}
}
function gameover(){
	clearInterval(window.resetvar);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "100% Arial";
    ctx.fillStyle = "white";
    ctx.fillText("GAMEOVER!!!",95,40);
    ctx.fillText("Score: "+score, 120, 62);
    ctx.fillText("Press any key to continue",72,90);
    continuelooping=1;
    canvas.addEventListener("click",reset);
}