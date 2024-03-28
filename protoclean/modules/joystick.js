export default class Joystick {
  constructor() {
    this.nodes = {
      joystick: document.querySelector('.joystick'),
      stick: document.querySelector('.stick')
    };
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.w = 100;
    this.h = 100;
    this.r = this.w / 2;


    this.stick = {
      cx: 25,
      cy: 25,
      x: 25,
      y: 25,
      w: 50,
      h: 50,
      r: 25,
    }

    this.start = { x: 0, y: 0 };
    this.m = { x: 0, y: 0 };
    this.impuls = {
      x: 0,
      y: 0,
    };

    this.init()
  }

  init() {

    this.nodes.stick.style.top = this.stick.y + 'px';
    this.nodes.stick.style.left = this.stick.x + 'px';

    document.addEventListener('mousemove', (e) => {
      if (!this.active) return;
      this.m.x = e.clientX - this.start.x;
      this.m.y = e.clientY - this.start.y;

      let mag = Math.sqrt(this.m.x * this.m.x + this.m.y * this.m.y);
      if (mag >= this.r) {

        this.stick.x = this.x + (this.m.x - this.x) / mag * this.r + this.stick.cx;
        this.stick.y = this.y + (this.m.y - this.y) / mag * this.r + this.stick.cy;

        this.impuls.x = (this.stick.cx - this.stick.x) * -1 / this.r;
        this.impuls.y = (this.stick.cy - this.stick.y) / this.r;


        this.nodes.stick.style.top = this.stick.y + 'px';
        this.nodes.stick.style.left = this.stick.x + 'px';
        return;
      }


      this.stick.x = this.stick.cx + this.m.x;
      this.stick.y = this.stick.cy + this.m.y;


      this.impuls.x = (this.stick.cx - this.stick.x) * -1 / this.r;
      this.impuls.y = (this.stick.cy - this.stick.y) / this.r;


      this.nodes.stick.style.top = this.stick.y + 'px';
      this.nodes.stick.style.left = this.stick.x + 'px';
    })

    this.nodes.stick.addEventListener('mousedown', (e) => {
      console.log('Мышка нажата')

      this.start.x = e.clientX;
      this.start.y = e.clientY;
      this.active = true;
    })

    document.addEventListener('mouseup', (e) => {
      console.log('Мышка отпущена')
      this.stick.x = 25;
      this.stick.y = 25;

      this.nodes.stick.style.top = this.stick.y + 'px';
      this.nodes.stick.style.left = this.stick.x + 'px';

      this.impuls.x = 0;
      this.impuls.y = 0;

      this.active = false;

      console.log(this.active)
    })

  }

}