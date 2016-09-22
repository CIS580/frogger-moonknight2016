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