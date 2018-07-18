function Box(x, y) {
	var locations = [10, 170, 330, 490];
	var rectSize = 150;
	var colors = [color(238, 228, 218), color(237, 224, 200), color(242, 177, 121), color(245, 149, 99), color(246, 124, 95), 
			color(246, 94, 59), color(237, 207, 114), color(237, 204, 97), color(237, 200, 80), color(237, 197, 63), color(237, 194, 46)];
	// static usedLocations = [];
	this.x = x;
	this.y = y;
	this.value = (int)(Math.random()*101) >= 90 ? 4 : 2;
	this.colorValue = this.value === 2 ? 0 : 1;
	this.movedSuc = false;
	this.tryMove = false;
	// usedLocations.push(createVector(this.x, this.y));
	this.show = function(){
		noStroke();
		fill(colors[this.colorValue]);
		rectMode(CORNER);
		rect(this.x, this.y, rectSize, rectSize);
		fill(0,0,0);
		textSize(24);
		textAlign(CENTER);
		text(this.value, this.x+(rectSize/2), this.y+(rectSize/2));
	}

	this.increaseValue = function(){
		this.value *= 2;
		this.colorValue ++;
		this.movedSuc = true;
	}
}