const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Car class
 */
module.exports = exports = Pit;

/**
 * @constructor Car
 * Creates a new Car object
 * @param {Postition} position object specifying an x and y
 */
function Pit(position) {
  this.state = "closed";
  this.x = position.x;
  this.y = position.y;
  this.width  = 2*64;
  this.height = 2*64;
  this.timer = 0;
  
}

/**
 * @function updates the Car object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Pit.prototype.update = function(time) {
  switch(this.state) {
    case "closed":
      this.timer += time;
      if(this.timer > MS_PER_FRAME*20) {
        this.timer = 0;
		//this.x+=this.speed;
		this.state = "open";
		
        //this.frame += 1;
        //if(this.frame > 3) this.frame = 0;
      }
      break;
	  
	  case "open":
      this.timer += time;
      if(this.timer > MS_PER_FRAME*13) {
        this.timer = 0;
		//this.x+=this.speed;
		this.state = "closed";
		
        //this.frame += 1;
        //if(this.frame > 3) this.frame = 0;
      }
      break;
	  
    // TODO: Implement your Car's update by state
  }
  
  
  
}

/**
 * @function renders the Car into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Pit.prototype.render = function(time ,ctx) {
  switch(this.state) {
    case "closed":
      ctx.fillStyle = "#E2B740";
	  ctx.fillRect(this.x,this.y,this.width,this.height);
      break;
	case "open":
      ctx.fillStyle = "black";
	  ctx.fillRect(this.x,this.y,this.width,this.height);
      break;
    // TODO: Implement your Car's redering according to state
  }

}