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