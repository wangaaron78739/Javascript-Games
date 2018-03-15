
temp = 0;
posX = 100;
posY = 450;
posX2 = 100;
posY2 = 450;
velX2 = 0;
velY2 = 0;
velX = 0;
velY = 0;
asdf = [];
gravity = 1;
pipes = [];
counter = 0;
lock = false;
score = 0;
scoreToggle = true;
cheat = false;
initToggle = false;
console.log("asdf");
canvas = document.getElementById("flappyBird");
function init() {
	console.log("asd2f");
	canvas = document.getElementById("flappyBird");
	if (canvas.getContext) {
       	document.addEventListener("keydown", keyPush);
       	ctx = canvas.getContext("2d");
		canvas.addEventListener("click", start);
		ctx.fillStyle = "#FAEBD7";
		ctx.beginPath();
		var img2 = document.getElementById("background");
	    ctx.drawImage(img2,0,0,canvas.width,canvas.height); // draws a chain link or dagger
		//ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.closePath();
		drawPipes();
		//drawBird();
		drawAlvah();
		ctx.fillStyle = "black";
		ctx.font = "45px Comic Sans MS";
		ctx.fillText(score,canvas.width/2,50);
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.fillRect(canvas.width/2-150,canvas.height/2-150,300,300);
	    ctx.closePath();
	    ctx.fillStyle = "black";
	    ctx.textAlign="center"; 

	    ctx.fillText("Flappy TA",canvas.width/2,canvas.height/2-80);
	    ctx.font = "30px Comic Sans MS";
	    ctx.fillText("Click to start",canvas.width/2,canvas.height/2-15);
	    ctx.fillText("Press \"j\" to jump",canvas.width/2,canvas.height/2+50);
	    /*ctx.fillText("Flappy TA",canvas.width/2,canvas.height/2-45);
	    ctx.fillText("Click to start",canvas.width/2,canvas.height/2-15);
	    ctx.fillText("Press \"j\" to jump",canvas.width/2,canvas.height/2+15);*/
      }

}


function game() {
	counter++;
	velY += gravity;
	posY += velY;
	if (velY > 30) {
		velY = 30
	}
	if  (velY < -15) {velY = -15}
	if (posY >= 800) {
		posY = 800;
	}
	if (posY <= 0) {
		posY = 0;
		velY = 0;
	}
	ctx.fillStyle = "#FAEBD7";
	ctx.beginPath();
	var img2 = document.getElementById("background");
    ctx.drawImage(img2,0,0,canvas.width,canvas.height); // draws a chain link or dagger
	//ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.closePath();
	drawPipes();
	//drawBird();
	drawAlvah();
	ctx.fillStyle = "black";
	ctx.font = "30px Comic Sans MS";
	ctx.fillText(score,canvas.width/2,50);
	if (posY == canvas.height) {endGame();}
	asdf[(counter%100)] = {x:posX,y:posY,vY:velY};
	temp = (counter%100-15)%100;
	if (temp < 0) {temp += 100;}
	if (asdf[temp] != null) {
		
	posY2 = asdf[temp].y;
	velY2 = asdf[temp].vY;
	}
}
function drawBird() {
	ctx.fillStyle = "grey";
	ctx.beginPath();
	ctx.arc(posX,posY, 25,0,Math.PI*2, true);
	ctx.fill();
	ctx.closePath();


}
function drawAlvah() {
	ctx.save();
	ctx.translate(posX,posY);

	ctx.rotate(velY/30*Math.PI/3);
	ctx.beginPath();
    var img = document.getElementById("bird");
    ctx.drawImage(img,-25,-25,100,100); // draws a chain link or dagger
    ctx.closePath();
   	ctx.restore();

   	/*
	ctx.save();
	ctx.translate(posX2,posY2);
	ctx.rotate(velY2/30*Math.PI/3);
	ctx.beginPath();
    var img = document.getElementById("minsoo");
    ctx.drawImage(img,-25,-25,100,100); // draws a chain link or dagger
    ctx.closePath();
   	ctx.restore();*/
}

function drawPipes() {

	if (counter % 140 == 0) {
		var temp = Math.floor(Math.random()*canvas.height);
		(temp > canvas.height-100) ? (temp = canvas.height-100): temp;
		(temp < 100) ? (temp = 100): temp;
		pipes.push({center:temp,x:canvas.width+50})
	}
	for (i = 0; i<pipes.length;i++){
		pipes[i].x -= 3;
		ctx.fillStyle = "#7DBBDE";
		ctx.beginPath();
		ctx.fillRect(pipes[i].x-50,0,100,pipes[i].center-100);
		ctx.closePath();
		ctx.beginPath();
		ctx.fillRect(pipes[i].x-50,pipes[i].center+100,100,canvas.height-pipes[i].center);
		ctx.closePath();
	}

	if (pipes.length>0) {
	if ((Math.abs(pipes[0].x-posX)<75)&&!cheat&&(Math.abs(pipes[0].center-posY)>75)) {lock = true;}
	if ((pipes[0].x<posX) && scoreToggle) {
		if (!lock) score++;
		scoreToggle = false;
	} if (pipes[0].x > posX) {
		scoreToggle = true;
	}
	if(pipes[0].x < -50) {pipes.shift()}}

}

function start() {
	gameClock = setInterval(game, 1000/30);
	initToggle = true;
	canvas.removeEventListener("click", start);
	canvas.addEventListener("click", Push);
}

function keyPush(event) { 
	if ((event.keyCode == 74)&&(initToggle)) {
		if (!lock) {velY -= 20;}
	}
	if (posY >= canvas.height) {
		posY = 800;
	}
	if (posY <= 0) {
		posY = 0;
	}
	//console.log(scoreToggle);
	//console.log(score);
	for (i = 0; i<pipes.length;i++){
		console.log(pipes[i]);
	}
	console.log(temp);

}

function Push(event) { 
	if (!lock) {velY -= 20;}
	if (posY >= canvas.height) {
		posY = 800;
	}
	if (posY <= 0) {
		posY = 0;
	}
	//console.log(scoreToggle);
	//console.log(score);
	for (i = 0; i<pipes.length;i++){
		console.log(pipes[i]);
	}
	console.log(temp);

}

function endGame(){
	clearInterval(gameClock);
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.fillRect(canvas.width/2-150,canvas.height/2-150,300,300);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.textAlign="center"; 
    ctx.fillText("Score:"+score,canvas.width/2,canvas.height/2-15);
    ctx.fillText("Click to Retry",canvas.width/2,canvas.height/2+15);
    document.removeEventListener("keydown", keyPush);
    canvas.removeEventListener("click", Push);
    canvas.addEventListener("click", reset);
}

function reset() {

	temp = 0;
	posX = 100;
	posY = 450;
	posX2 = 100;
	posY2 = 450;
	velX2 = 0;
	velY2 = 0;
	velX = 0;
	velY = 0;
	asdf = [];
	gravity = 1;
	pipes = [];
	counter = 0;
	lock = false;
	score = 0;
	scoreToggle = true;
	cheat = false;
	initToggle = false;
	init();
	canvas.removeEventListener("click", reset);
	}	
