

posX = 475/2;
posY = 600;
astroid = [];
bullets = [];
counter = 0;
initialAmount = 90;
score = 0;
speed = 3;

function init() {
	canvas = document.getElementById("snakeGame");
	ctx = canvas.getContext("2d");
	document.addEventListener("keydown", keyPush);
	gameClock = setInterval(game, 1000/30);
}

function game() {
	counter++;
	genAstroids();
	for (i = 0; i<astroid.length; i++) {
		astroid[i].y+= speed;
	}
	for (i = 0; i<bullets.length; i++) {
		bullets[i].y -= 10;
	}
	ctx.fillStyle = "black";
	ctx.beginPath(); 
	ctx.fillRect(0,0,canvas.width, canvas.height);
	ctx.closePath();
	
	drawAstroids();
	ctx.fillStyle = "red";
	ctx.beginPath(); 
	ctx.arc(posX,posY,25,0,Math.PI*2);
	ctx.fill();
	ctx.closePath();
	drawBullets();

}

function genAstroids() {
	c = Math.floor(Math.random()*475);
	h = Math.max(Math.floor(Math.random()*30),15);
	r = Math.max(3*h,50);
	if (counter % initialAmount == 0) {
		astroid.push({center:c, hp: h,curHp: h, y:-r, rad:r});
		if (initialAmount > 60) {
			initialAmount -= 5;
		}
	}

}

function genBullets() {
	bullets.push({center: posX, y:posY});
}


function drawBullets() {
		ctx.fillStyle = "green";
		toggle = 0;
		if (bullets.length != 0) 
	for (x = bullets.length-1; x>=0;x--) {
		ctx.beginPath(); 
		ctx.arc(bullets[x].center,bullets[x].y,10,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
		for (i=0; i<astroid.length; i++){
			if (((Math.abs(bullets[x].center-astroid[i].center)<astroid[i].rad)&&(Math.abs(bullets[x].y-astroid[i].y)<astroid[i].rad))||bullets[x].y<-10) {
				toggle = 1;
			}
		}
		if (toggle == 1) {
		for (i=astroid.length-1; i>0; i--){
			if (((Math.abs(bullets[x].center-astroid[i].center)<astroid[i].rad)&&(Math.abs(bullets[x].y-astroid[i].y)<astroid[i].rad))) {
				console.log("asdf");
				astroid[i].curHp -= 8;
			}
		}
		bullets.splice(x,1);
		toggle = 0;
		}
	}
	if (astroid.length != 0) 
	for (x = astroid.length-1; x>=0;x--) {
		if ((astroid[x].curHp <=0) ||(astroid[x].y>(800+astroid[x].rad))) {
 			astroid.splice(x,1);
		}
	}


}

function drawAstroids() {
	for (i = 0; i<astroid.length; i++) {
		ctx.fillStyle = "grey";
		ctx.beginPath(); 
		ctx.arc(astroid[i].center,astroid[i].y,astroid[i].rad,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();

	}
}

function keyPush() {
	for (x=0; x<astroid.length; x++) {
		console.log(astroid[x]);
	}
	console.log(counter);
	switch (event.keyCode) {
		case 188:
			if (posX >30) posX -= 20;
			break;
		case 190:
			if (posX <445) posX += 20;
			break;
		case 32:
			genBullets();
			console.log("ho");
			break;
	}
}
onload = init;