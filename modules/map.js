export default class Map {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.w = canvas.height * 1.2;
    this.h = canvas.height * 1.2;
    console.log(this.h)
    
    this.x = -(canvas.height * 0.1);
    this.y = -(canvas.height * 0.1);
    this.bg = document.querySelector('#map');
  }

  drow() {
    this.ctx.drawImage(this.bg, this.x, this.y, this.w, this.h)
  }
}