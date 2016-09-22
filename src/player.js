"use strict";

const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Player class
 */
module.exports = exports = Player;

/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Player(position) {
  this.state = "idle";
  this.x = position.x;
  this.y = position.y;
  this.width  = 64;
  this.height = 64;
  this.spritesheet  = new Image();
  this.spritesheet.src = encodeURI('assets/PlayerSprite0.png');
  this.timer = 0;
  this.score = 0;
  
  this.showIns = 0;
  
  this.lives = 4;
  
  this.frame = 0;
  var self = this;
  this.input = {
up: false,//
down: false,
lef: false,
right: false
}
 //*******************************
 window.onkeydown = function(event) {

 if (! (self.state=="jumpping"))
 {
//console.log(event.keyCode);
switch(event.keyCode) {
	
	
case 38:
case 87:
//addNewDirction(x,y,"up");
//y-=1;
self.input.up = true;
self.input.down = false;
self.input.right = false;
self.input.left = false;

self.state = "jumpping";
self.timer =0;
self.frame = 0;
//isSnakeMoving = 1;
break;

case 37:
case 65:
//addNewDirction(x,y,"left");
//x-=1;
self.input.left = true;
self.input.right = false;
self.input.up = false;
self.input.down = false;
self.state = "jumpping";
self.timer =0;
self.frame = 0;
//isSnakeMoving = 1;
break;

case 39:
case 68:
//addNewDirction(x,y,"right");
//x+=1;
self.input.right = true;
self.input.left = false;
self.input.up = false;
self.input.down = false;
self.state = "jumpping";
self.timer =0;
self.frame = 0;
//isSnakeMoving = 1;
break;

case 40:
case 83:
//addNewDirction(x,y,"down");
//y//+=1;
self.input.down = true;
self.input.up = false;
self.input.right = false;
self.input.left = false;
self.state = "jumpping";
self.timer =0;
self.frame = 0;
//isSnakeMoving = 1;
break;

case 73:
case 105:
showIns = 99;

}
}
}
//***********************8

//******************
window.onkeyup = function(event) {

//console.log(event.keyCode);


switch(event.keyCode) {
case 73:
case 105:
if (showIns==99)
	showIns =0;

break;
}

return false;
}

//***********

}

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Player.prototype.update = function(time) {
  switch(this.state) {
    case "idle":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        if(this.frame > 3) this.frame = 0;
      }
      break;
    // TODO: Implement your player's update by state
	
	case "jumpping":
		this.timer += time;
		
		
		var speed = MS_PER_FRAME/2 + MS_PER_FRAME/4;
      if(this.timer > speed) {
        this.timer = 0;
        this.frame += 1;
		
		if (this.input.up&& this.y >0)
			this.y -= 64/4;
		if (this.input.down&& this.y <448)
			this.y += 64/4;
		if (this.input.right&& this.x <704)
			this.x += 64/4;
		if (this.input.left&& this.x >0)
			this.x -= 64/4;
		
        if(this.frame > 3) {this.frame = 0; this.state = "idle";}
		}
		break;
	
  }
   
  if (this.x >700)
	this.state = "advanceLevel";
  
}







/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Player.prototype.render = function(time, ctx) {
  switch(this.state) {
    case "idle":
      ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        this.frame * 64, 64, this.width, this.height,
        // destination rectangle
        this.x, this.y, this.width, this.height
      );
      break;
    // TODO: Implement your player's redering according to state
    case "jumpping":
      ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        this.frame * 64, 0, this.width, this.height,
        // destination rectangle
        this.x, this.y, this.width, this.height
      );
      break;	
  }
  
   Player.prototype.advanceLevel = function()
  {
	  
	  this.x = 0;
	  this.y = 240;
	  this.score+=250;
	  this.state = "idle";
  }
  
  
   Player.prototype.died = function()
  {
	  
	  this.x = 0;
	  this.y = 240;
	  this.lives--;
	  this.state = "idle";
  }
}
