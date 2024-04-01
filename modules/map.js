export default class Map {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = -100;
    this.y = -100;
    this.w = 1200;
    this.h = 1200;
    this.bg = document.querySelector('#map');
  }

  drow() {
    this.ctx.drawImage(this.bg, this.x, this.y, this.w, this.h)
  }
}