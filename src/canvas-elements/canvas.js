export default class CanvasMethods {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    
    this.defaultСoordinates = {x: 0, y: 0}
  }

  drowHero() {
    let pi = Math.PI;
    this.ctx.fillStyle = 'red';
    this.ctx.arc = (0, 0, 40, 0, 2/pi, false);
    
    
    this.ctx.stroke();
    this.ctx.fill();
  }


}