scanvas = document.getElementById("snakeCanvas");
sdir = 1; // 0=w, 1=a, 2=s, 3=d
scounter = 0;
sposX = 8;
sposY = 15;
stail = [{sx:9,sy:15},{sx:10,sy:15}];
stail2 = [{sx:9,sy:15},{sx:10,sy:15}];
saX = 3;
saY = 2;

function sinit(){
	scanvas = document.getElementById("snakeCanvas");
	sctx = scanvas.getContext("2d");
	sctx.fillStyle = "black";
	sctx.fillRect(0,0,scanvas.width,scanvas.height);
	scanvas.addEventListener("click",sstartGame);
	sposX = Math.floor((scanvas.width/25)/2);
	sposY = Math.floor((scanvas.height/25)/2);
	stail = [{sx:sposX+1,sy:sposY},{sx:sposX+2,sy:sposY}];
	stail2 = [{sx:sposX+1,sy:sposY},{sx:sposX+2,sy:sposY}];
	saX = Math.floor(Math.random()*Math.floor(scanvas.width/25));
	saY = Math.floor(Math.random()*Math.floor(scanvas.height/25));
	sctx.font = "45px Comic Sans MS";
		sctx.fillStyle = "white";
		sctx.beginPath();
		sctx.fillRect(scanvas.width/2-150,scanvas.height/2-150,300,300);
	    sctx.closePath();
	    sctx.fillStyle = "black";
	    sctx.textAlign="center"; 
	    sctx.fillText("Snake TA",scanvas.width/2,scanvas.height/2-80);
	    sctx.font = "30px Comic Sans MS";
	    sctx.fillText("Click to start",scanvas.width/2,scanvas.height/2-15);
	    sctx.fillText("Use W, A, S, D keys",scanvas.width/2,scanvas.height/2+50);
	    sctx.fillText("to move",scanvas.width/2,scanvas.height/2+80);
}

function sstartGame() {
	scanvas.removeEventListener("click",sstartGame);
	document.addEventListener("keydown",skeyPush);
	gameClock = setInterval(sgame, 1000/30);
}

function sgame() {
	scounter++;

	if (scounter % 3 == 0) {
		stail2[0].sx = sposX;
		stail2[0].sy = sposY;
		for (i = 1;i<stail.length;i++) {
			stail2[i].sx = stail[i-1].sx;
			stail2[i].sy = stail[i-1].sy;
		}
		switch (sdir) {
			case 0:
				sposY--;
				break;
			case 1:
				sposX--;
				break;
			case 2:
				sposY++;
				break;
			case 3:
				sposX++;
				break;
		}
		for (i = 0;i<stail.length;i++) {
			stail[i].sx = stail2[i].sx;
			stail[i].sy = stail2[i].sy;
		}

		for (i = 0;i<stail.length;i++) {
			if (((sposX == stail[i].sx)) &&(sposY==stail[i].sy)){
				sgameOver();			}
			
		}
				if (((sposX) == saX)&&(sposY == saY)) {
			stail.push({sx:saX,sy:saY});
			stail2.push({sx:saX,sy:saY});
			saX = Math.floor(Math.random()*Math.floor(scanvas.width/25));
			saY = Math.floor(Math.random()*Math.floor(scanvas.height/25));
		}
		if ((sposX <0)||(sposX>Math.floor(scanvas.width/25))||(sposY>Math.floor(scanvas.height/25))||(sposY<0)) sgameOver();
	} 

	sctx.fillStyle = "black";
	sctx.fillRect(0,0,scanvas.width,scanvas.height);
	sctx.fillStyle = "white";
	var img2 = document.getElementById("snake");
	sctx.drawImage(img2,25*sposX,25*sposY,25,25);
	//sctx.fillRect(25*sposX,25*sposY,25,25);
	for (i = 0;i<stail.length;i++) {
		sctx.fillStyle = "white";
		var img2 = document.getElementById("snake");
		sctx.drawImage(img2,25*stail2[i].sx,25*stail2[i].sy,25,25);
		//sctx.fillRect(25*stail2[i].sx,25*stail2[i].sy,25,25);
	}
	sctx.fillStyle = "red";
	var img3 = document.getElementById("glareal");
	sctx.drawImage(img3,25*saX,25*saY,25,25);
}

function skeyPush() {
	switch (event.keyCode) {
		case 87:
			if (sdir!=2)
			sdir = 0;
			break;
		case 65:
			if (sdir !=3)
			sdir = 1;
			break;
		case 83:
			if (sdir !=0)
			sdir = 2;
			break;
		case 68:
			if (sdir !=1)
			sdir = 3;
			break;
	}
	for (i = 1;i<stail.length;i++) {
		console.log(stail2[i]);
	}
}

function sgameOver() {
	sdir = 1; // 0=w, 1=a, 2=s, 3=d
	scounter = 0;
	sposX = Math.floor((scanvas.width/25)/2);
	sposY = Math.floor((scanvas.height/25)/2);
	stail = [{sx:sposX+1,sy:sposY},{sx:sposX+2,sy:sposY}];
	stail2 = [{sx:sposX+1,sy:sposY},{sx:sposX+2,sy:sposY}];
	saX = Math.floor(Math.random()*Math.floor(scanvas.width/25));
	saY = Math.floor(Math.random()*Math.floor(scanvas.height/25));
}

onload = sinit;