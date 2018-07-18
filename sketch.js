var boxs = [];
var locations = [10, 170, 330, 490];
var skinnyRect = 10;
var longRect = 650;
var won = false;
var lost = false;

function setup(){
	createCanvas(650,650);
	addBoxes(2);
}

function draw(){
	touches;
	if(!won){
		background(204, 190, 178);
		rectMode(CORNER);
		noStroke();
		fill(129, 116, 107);
		rect(0, 0, longRect, skinnyRect);
		rect(0, 0, skinnyRect, longRect);
		rect(0, 640, longRect, skinnyRect);
		rect(640, 0, skinnyRect, longRect);
		rect(160, 0, skinnyRect, longRect);
		rect(320, 0, skinnyRect, longRect);
		rect(480, 0, skinnyRect, longRect);
		rect(0, 160, longRect, skinnyRect);
		rect(0, 320, longRect, skinnyRect);
		rect(0, 480, longRect, skinnyRect);
		for(var i=0; i<boxs.length; i++){
			boxs[i].show();
			if(boxs[i].value === 2048){
				won = true;
			}
		}
	}else{
		background(0, 0, 0);
		textSize(50);
		fill(255, 255, 255);
		textAlign(CENTER);
		text("You Won", 500/2, 600/2);
	}
	if(lost){
		background(0, 0, 0);
		textSize(50);
		fill(255, 255, 255);
		textAlign(CENTER);
		text("You Lost", 500/2, 600/2);
	}
}

// function touchStarted(){
// 	if(touches.length>0){
// 		if(touches[0].x > 650.0/2.0){
// 			moveRight();
// 		}else if(touches[0].x < 650.0/2.0){
// 			moveLeft();
// 		}else if(touches[0].y > 650.0/2.0){
// 			moveUp();
// 		}else if(touches[0].y < 650.0/2.0){
// 			moveDown();
// 		}
// 	}
// }

// function touchMoved(){
// 	if(touches[0].x > prevTouch.x){
// 		moveRight();
// 	}else if(touches[0].x < prevTouch.x){
// 		moveLeft();
// 	}else if(touches[0].y > prevTouch.y){
// 		moveUp();
// 	}else if(touches[0].y < prevTouch.y){
// 		moveDown();
// 	}
// }

function addBoxes(num){
	for(var i=0; i<num; i++){
		var newBox = new Box(locations[(int)(Math.random()*4)], locations[(int)(Math.random()*4)]);
		for(var j=0; j<boxs.length; j++){
			if(boxs.length === 16){
				lost = true;
				break;
			}
			while(boxs[j].x === newBox.x && boxs[j].y === newBox.y){
				newBox.x = locations[(int)(Math.random()*4)];
				newBox.y = locations[(int)(Math.random()*4)];
				j=0;
			}
		}
		boxs.push(newBox);
	}
}

function keyPressed(){
	if(!lost){
		if(keyCode === RIGHT_ARROW){
			moveRight();
		}else if(keyCode === LEFT_ARROW){
			moveLeft();
		}else if(keyCode === UP_ARROW){
			moveUp();
		}else if(keyCode === DOWN_ARROW){
			moveDown();
		}
		var boxMove = false;
		for(var i=0; i<boxs.length; i++){
			if(boxs[i].movedSuc){
				boxMove = true;
			}
			boxs[i].movedSuc = false;
			boxs[i].tryMove = false;
		}
		if(boxMove){
			addBoxes(1);
		}
		if(boxs.length === 16){
				lost = true;
		}
	}
}

function moveRight(){
	var boxsMoved = 0;
	var startingBoxLength = boxs.length;
	while(boxsMoved < startingBoxLength){
		var rightMostIdx = -1;
		var rightMostPos = 0;
		for(var i=0; i<boxs.length; i++){
			if( !boxs[i].tryMove && boxs[i].x > rightMostPos){
				rightMostPos = boxs[i].x;
				rightMostIdx = i;
			}
		}
		if(rightMostIdx != -1){
			var box = boxs[rightMostIdx];
			var locIdx = locations.indexOf(box.x);
			var collision = false;
			var moveAmount = 0;
			while(locIdx+1<locations.length && !collision){
				for(var i=0; i<boxs.length; i++){
					if(boxs[i].x === locations[locIdx+1] && boxs[i].y === box.y){
						collision = true;
						if(boxs[i].value === box.value){
							boxs[i].increaseValue();
							boxs.splice(rightMostIdx, 1);
							box.movedSuc = true;
						}
					}
				}
				if(!collision){
					locIdx = locIdx+1;
					box.x = locations[locIdx];
					box.movedSuc = true;
				}
			}
			boxsMoved ++;
			box.tryMove = true;
		}
	}
}

function moveLeft(){
	var boxsMoved = 0;
	var startingBoxLength = boxs.length;
	while(boxsMoved < startingBoxLength){
		var leftMostIdx = -1;
		var leftMostPos = 580;
		for(var i=boxs.length-1; i>-1; i--){
			if( !boxs[i].tryMove && boxs[i].x < leftMostPos){
				leftMostPos = boxs[i].x;
				leftMostIdx = i;
			}
		}
		if(leftMostIdx != -1){
			var box = boxs[leftMostIdx];
			var locIdx = locations.indexOf(box.x);
			var collision = false;
			var moveAmount = 0;
			while(locIdx-1>-1 && !collision){
				for(var i=0; i<boxs.length; i++){
					if(boxs[i].x === locations[locIdx-1] && boxs[i].y === box.y){
						collision = true;
						if(boxs[i].value === box.value){
							boxs[i].increaseValue();
							boxs.splice(leftMostIdx, 1);
							box.movedSuc = true;
						}
					}
				}
				if(!collision){
					locIdx = locIdx-1;
					box.x = locations[locIdx];
					box.movedSuc = true;
				}
			}
			boxsMoved ++;
			box.tryMove = true;
		}
	}
}

function moveUp(){
	var boxsMoved = 0;
	var startingBoxLength = boxs.length;
	while(boxsMoved < startingBoxLength){
		var upMostIdx = -1;
		var upMostPos = 580;
		for(var i=boxs.length-1; i>-1; i--){
			if( !boxs[i].tryMove && boxs[i].y < upMostPos){
				upMostPos = boxs[i].y;
				upMostIdx = i;
			}
		}
		if(upMostIdx != -1){
			var box = boxs[upMostIdx];
			var locIdx = locations.indexOf(box.y);
			var collision = false;
			var moveAmount = 0;
			while(locIdx-1>-1 && !collision){
				for(var i=0; i<boxs.length; i++){
					if(boxs[i].y === locations[locIdx-1] && boxs[i].x === box.x){
						collision = true;
						if(boxs[i].value === box.value){
							boxs[i].increaseValue();
							boxs.splice(upMostIdx, 1);
							box.movedSuc = true;
						}
					}
				}
				if(!collision){
					locIdx = locIdx-1;
					box.y = locations[locIdx];
					box.movedSuc = true;
				}
			}
			boxsMoved ++;
			box.tryMove = true;
		}
	}
}

function moveDown(){
	var boxsMoved = 0;
	var startingBoxLength = boxs.length;
	while(boxsMoved < startingBoxLength){
		var downMostIdx = -1;
		var downMostPos = 0;
		for(var i=0; i<boxs.length; i++){
			if( !boxs[i].tryMove && boxs[i].y > downMostPos){
				downMostPos = boxs[i].y;
				downMostIdx = i;
			}
		}
		if(downMostIdx != -1){
			var box = boxs[downMostIdx];
			var locIdx = locations.indexOf(box.y);
			var collision = false;
			var moveAmount = 0;
			while(locIdx+1<locations.length && !collision){
				for(var i=0; i<boxs.length; i++){
					if(boxs[i].y === locations[locIdx+1] && boxs[i].x === box.x){
						collision = true;
						if(boxs[i].value === box.value){
							boxs[i].increaseValue();
							boxs.splice(downMostIdx, 1);
							box.movedSuc = true;
						}
					}
				}
				if(!collision){
					locIdx = locIdx+1;
					box.y = locations[locIdx];
					box.movedSuc = true;
				}
			}
			boxsMoved ++;
			box.tryMove = true;
		}
	}
}
