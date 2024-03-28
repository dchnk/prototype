export default class Hero {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 400;
    this.y = 400;
    this.w = 27.5;
    this.h = 60;
    this.bg = document.querySelector('#cook');
    this.speed = 2;
  }

  drow() {
    this.ctx.drawImage(this.bg, this.x, this.y, this.w, this.h)
  }

  moveCheched(impuls) {
    console.log(this.x, this.y)

    let x = this.x + impuls.x * this.speed;
    let y = this.y - impuls.y * this.speed;

    if (x < 170 || x > 790) {
      if (y < 170 || y > 767) {
        return;
      }

      this.y = y;
      return;
    }


    if (y < 170 || y > 767) {

      if (x < 170 || x > 790) {
        return;
      }

      this.x = x;
      return;
    }

    this.x = x;
    this.y = y;
  }
}