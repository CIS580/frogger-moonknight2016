(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict;"

/* Classes */
const Game = require('./game.js');
const Player = require('./player.js');
const CarDown = require('./carDown.js');
const CarUp = require('./carUp.js');

const Log = require('./log.js');
const River = require('./river.js');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var player = new Player({x: 0, y: 240});

var carDown = new CarDown({x: 6*64, y: -150});
var carUp = new CarUp({x: 7*64, y: 480});

var log = new Log({x: 3*64, y: -150},{w: 64, h:80});
var log2 = new Log({x: 2*64, y: -150},{w: 64, h:4*80});

var river = new River ({x: 2*64, y: 0});
var level = 1;
var showIns = 0;

var riverWidth = 2*64;
var riverPostion = 2*64;
/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());


/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
	if (player.showIns == 0 ){
		
		
	  if (testForRectCollision(player, carDown))
	  {
		  player.died();
		  carDown.playerDied();
		  carUp.playerDied();
		  
		  log.playerDied();
		  log2.playerDied();
		  
	  }
	  
	  if (testForRectCollision(player, carUp))
	  {
		  player.died();
		  carDown.playerDied();
		  carUp.playerDied();
		  
		  log.playerDied();
		  log2.playerDied();
		  
	  }
	 if ((!(testForRectCollision(player, log) || testForRectCollision(player, log2))) && testForRectCollision(player, river))
	 {
		 player.died();
		 carDown.playerDied();
		 carUp.playerDied();
		 log.playerDied();
		 log2.playerDied();
		 }
	  log.update(elapsedTime);
	  log2.update(elapsedTime);
	  player.update(elapsedTime);
	  carDown.update(elapsedTime);
	  carUp.update(elapsedTime);
	  
	  log.update(elapsedTime);
	  
	  if (player.state == "advanceLevel")
	  {
		  player.advanceLevel();
		  carDown.advanceLevel();
		  carUp.advanceLevel();
		  log.advanceLevel();
		  log2.advanceLevel();
		  level++;
	  }
	  
	}
  // TODO: Update the game objects
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  river.render(ctx);
  if (player.showIns==0){
		  
	  
	  
	  ctx.fillStyle = "#A9A9A9";
	  ctx.fillRect(6*64,0,2*64,canvas.height);
	  
	  //  ctx.drawText();
	  ctx.font = "15px Arial";
	  ctx.fillText("Your score is:" +player.score,750-180,20);
	  ctx.fillText("\nCurren Level: "+level,750-180,40);
	  ctx.fillText("\nLives: "+player.lives,750-180,60);
	  
	  log.render(elapsedTime, ctx);
	  log2.render(elapsedTime, ctx);
	  player.render(elapsedTime, ctx);
	  carDown.render(elapsedTime, ctx);
	  carUp.render(elapsedTime, ctx);
  }
}

function testForRectCollision(r1, r2) {
	
	var errorMargine = 3;
  return !( r1.x > r2.x + r2.width-errorMargine ||
            r1.x + r1.width-errorMargine < r2.x ||
            r1.y > r2.y + r2.height-errorMargine ||
            r1.y + r1.height-errorMargine < r2.y
          );
}







},{"./carDown.js":2,"./carUp.js":3,"./game.js":4,"./log.js":5,"./player.js":6,"./river.js":7}],2:[function(require,module,exports){
const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Car class
 */
module.exports = exports = CarDown;

/**
 * @constructor Car
 * Creates a new Car object
 * @param {Postition} position object specifying an x and y
 */
function CarDown(position) {
  this.state = "idle";
  this.x = position.x;
  this.y = position.y;
  
  this.width  = 64;
  this.height = 80;
  this.imageWidth =4*64;
  this.imageHeight =6*64+52;
  this.spritesheet  = new Image();
  this.spritesheet.src = encodeURI('assets/car_up_side_down.png');
  this.timer = 0;
  this.frame = 0;
  this.speed = 4;
}

/**
 * @function updates the Car object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
CarDown.prototype.update = function(time) {
  switch(this.state) {
    case "idle":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
		//this.x+=this.speed;
		this.y+=this.speed;
		
        //this.frame += 1;
        if(this.frame > 3) this.frame = 0;
      }
      break;
    // TODO: Implement your Car's update by state
  }
  
    //if (this.y >0)
		//this.y -= 64/4;
	if (this.y >480)
		this.y = -220;
	//if (this.x <704)
		//this.x += 64/4;
	//if (this.x >0)
		//this.x -= 64/4;
  
}

/**
 * @function renders the Car into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
CarDown.prototype.render = function(time, ctx) {
  switch(this.state) {
    case "idle":
      ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        this.frame * 64, 0, this.imageWidth, this.imageHeight,
        // destination rectangle
        this.x, this.y, this.width, this.height
      );
      break;
    // TODO: Implement your Car's redering according to state
  }
  
  
  CarDown.prototype.advanceLevel = function()
  {
	  
	  //this.x = 0;
	  this.y = -150;
	  
	  this.speed+=6;
	  this.state = "idle";
  }
  
  CarDown.prototype.playerDied = function()
  {
	  
	  //this.x = 0;
	  this.y = -150;
	  
	  
	  this.state = "idle";
  }
}
},{}],3:[function(require,module,exports){
const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Car class
 */
module.exports = exports = carUp;

/**
 * @constructor Car
 * Creates a new Car object
 * @param {Postition} position object specifying an x and y
 */
function carUp(position) {
  this.state = "idle";
  this.x = position.x;
  this.y = position.y;
  
  this.width  = 64;
  this.height = 80;
  this.imageWidth =4*64;
  this.imageHeight =6*64+52;
  this.spritesheet  = new Image();
  this.spritesheet.src = encodeURI('assets/car_up.png');
  this.timer = 0;
  this.frame = 0;
  this.speed = 6;
}

/**
 * @function updates the Car object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
carUp.prototype.update = function(time) {
  switch(this.state) {
    case "idle":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
		//this.x+=this.speed;
		this.y-=this.speed;
		
        //this.frame += 1;
        if(this.frame > 3) this.frame = 0;
      }
      break;
    // TODO: Implement your Car's update by state
  }
  
    //if (this.y >0)
		//this.y -= 64/4;
	if (this.y+this.height < 0)
		this.y = 480+220;;
	//if (this.x <704)
		//this.x += 64/4;
	//if (this.x >0)
		//this.x -= 64/4;
  
}

/**
 * @function renders the Car into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
carUp.prototype.render = function(time, ctx) {
  switch(this.state) {
    case "idle":
      ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        this.frame * 64, 0, this.imageWidth, this.imageHeight,
        // destination rectangle
        this.x, this.y, this.width, this.height
      );
      break;
    // TODO: Implement your Car's redering according to state
  }
  
  
  carUp.prototype.advanceLevel = function()
  {
	  
	  //this.x = 0;
	  this.y = 480+150;
	  
	  this.speed+=9;
	  this.state = "idle";
  }
  
  carUp.prototype.playerDied = function()
  {
	  
	  //this.x = 0;
	  this.y = 480+150;
	  
	  
	  this.state = "idle";
  }
}
},{}],4:[function(require,module,exports){
"use strict";

/**
 * @module exports the Game class
 */
module.exports = exports = Game;

/**
 * @constructor Game
 * Creates a new game object
 * @param {canvasDOMElement} screen canvas object to draw into
 * @param {function} updateFunction function to update the game
 * @param {function} renderFunction function to render the game
 */
function Game(screen, updateFunction, renderFunction) {
  this.update = updateFunction;
  this.render = renderFunction;

  // Set up buffers
  this.frontBuffer = screen;
  this.frontCtx = screen.getContext('2d');
  this.backBuffer = document.createElement('canvas');
  this.backBuffer.width = screen.width;
  this.backBuffer.height = screen.height;
  this.backCtx = this.backBuffer.getContext('2d');

  // Start the game loop
  this.oldTime = performance.now();
  this.paused = false;
}

/**
 * @function pause
 * Pause or unpause the game
 * @param {bool} pause true to pause, false to start
 */
Game.prototype.pause = function(flag) {
  this.paused = (flag == true);
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
Game.prototype.loop = function(newTime) {
  var game = this;
  var elapsedTime = newTime - this.oldTime;
  this.oldTime = newTime;

  if(!this.paused) this.update(elapsedTime);
  this.render(elapsedTime, this.frontCtx);

  // Flip the back buffer
  this.frontCtx.drawImage(this.backBuffer, 0, 0);
}

},{}],5:[function(require,module,exports){
const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Car class
 */
module.exports = exports = Log;

/**
 * @constructor Car
 * Creates a new Car object
 * @param {Postition} position object specifying an x and y
 */
function Log(position , size) {
  this.state = "idle";
  this.x = position.x;
  this.y = position.y;
  
  this.startY = position.y;
  
  this.width  = size.w;
  this.height = size.h;
  this.imageWidth =6*64;
  this.imageHeight =9*64;
  this.spritesheet  = new Image();
  this.spritesheet.src = encodeURI('assets/log4.png');
  this.timer = 0;
  this.frame = 0;
  this.speed = 3;
}

/**
 * @function updates the Car object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Log.prototype.update = function(time) {
  switch(this.state) {
    case "idle":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
		//this.x+=this.speed;
		this.y+=this.speed;
		
        //this.frame += 1;
        if(this.frame > 3) this.frame = 0;
      }
      break;
    // TODO: Implement your Car's update by state
  }
  
    //if (this.y >0)
		//this.y -= 64/4;
	if (this.y >480)
		this.y = -220;
	//if (this.x <704)
		//this.x += 64/4;
	//if (this.x >0)
		//this.x -= 64/4;
  
}

/**
 * @function renders the Car into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Log.prototype.render = function(time, ctx) {
  switch(this.state) {
    case "idle":
      ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        this.frame * 64, 0, this.imageWidth, this.imageHeight,
        // destination rectangle
        this.x, this.y, this.width, this.height
      );
      break;
    // TODO: Implement your Car's redering according to state
  }
  
  
  Log.prototype.advanceLevel = function()
  {
	  
	  //this.x = 0;
	  this.y = this.startY;
	  
	  this.speed+=3;
	  this.state = "idle";
  }
  
  Log.prototype.playerDied = function()
  {
	  
	  //this.x = 0;
	  this.y = this.startY;
	  
	  
	  this.state = "idle";
  }
}
},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Car class
 */
module.exports = exports = River;

/**
 * @constructor Car
 * Creates a new Car object
 * @param {Postition} position object specifying an x and y
 */
function River(position) {
  this.state = "idle";
  this.x = position.x;
  this.y = position.y;
  this.width  = 2*64;
  this.height = 480;
  
}

/**
 * @function updates the Car object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
River.prototype.update = function(time) {
  switch(this.state) {
    case "idle":
    
      break;
    // TODO: Implement your Car's update by state
  }
  
   
  
}

/**
 * @function renders the Car into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
River.prototype.render = function( ctx) {
  switch(this.state) {
    case "idle":
      ctx.fillStyle = "#00FFFF";
	  ctx.fillRect(this.x,this.y,this.width,this.height);
      break;
    // TODO: Implement your Car's redering according to state
  }

}
},{}]},{},[1]);
