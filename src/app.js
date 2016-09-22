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






