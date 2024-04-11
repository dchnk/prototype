export default class Hero {
  constructor(ctx, canvas) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = this.canvas.height * 0.5
    this.y = this.canvas.height * 0.5
    this.w = this.canvas.height * 0.06;
    this.h = this.canvas.height * 0.09;
    this.maxCookies = 2;
    this.cookiesRaised = {};
    this.leftHand = null;
    this.rightHand = null;
    this.bg = document.querySelector('#cook');
    this.cookBG = document.querySelector('#cook-man');
    this.positions = {
      bottom: { startX: 0, startY: 0, current: 0 },
      top: { startX: 0, startY: 90, current: 0 },
      left: { startX: 0, startY: 90 * 2, current: 0 },
      right: { startX: 0, startY: 90 * 3, current: 0 },
    }
    this.direction = 'bottom';
    this.speed = 2;
    this.boosters = {};
    this.interfaceNodes = {
      slot1: document.querySelector('.slot-1'),
      slot2: document.querySelector('.slot-2'),
    }
  }

  drow() {
    if (this.direction === 'bottom') {
      this.ctx.drawImage(this.cookBG, this.positions[this.direction].startX + 60 * this.positions[this.direction].current, this.positions[this.direction].startY, 60, 90, this.x, this.y, this.w, this.h);

      if (this.boosters?.gold) {
        this.ctx.drawImage(document.querySelector('#cookie-gold'), this.x, this.y + this.canvas.height * 0.03, this.canvas.height * 0.03, this.canvas.height * 0.03)
        return;
      }

      if (Object.keys(this.cookiesRaised).length > 0) {

        if (this.leftHand?.type) {
          this.ctx.drawImage(document.querySelector(`#cookie-${this.leftHand?.type}`), this.x + this.w - this.canvas.height * 0.02, this.y + this.canvas.height * 0.04, this.canvas.height * 0.025, this.canvas.height * 0.025)
        }

        if (this.rightHand?.type) {
          this.ctx.drawImage(document.querySelector(`#cookie-${this.rightHand?.type}`), this.x - this.canvas.height * 0.005, this.y + this.canvas.height * 0.04, this.canvas.height * 0.025, this.canvas.height * 0.025)
        }

      }
      return;
    }

    if (this.direction === 'left') {
      if (this.boosters?.gold) {
        this.ctx.drawImage(this.cookBG, this.positions[this.direction].startX + 60 * this.positions[this.direction].current, this.positions[this.direction].startY, 60, 90, this.x, this.y, this.w, this.h);
        this.ctx.drawImage(document.querySelector('#cookie-gold'), this.x, this.y + this.canvas.height * 0.03, this.canvas.height * 0.03, this.canvas.height * 0.03)
        return;
      }

      if (Object.keys(this.cookiesRaised).length > 0) {

        if (this.leftHand?.type) {
          this.ctx.drawImage(document.querySelector(`#cookie-${this.leftHand?.type}`), this.x - this.canvas.height * 0.005, this.y + this.canvas.height * 0.04, this.canvas.height * 0.025, this.canvas.height * 0.025)
        }

        this.ctx.drawImage(this.cookBG, this.positions[this.direction].startX + 60 * this.positions[this.direction].current, this.positions[this.direction].startY, 60, 90, this.x, this.y, this.w, this.h);

        if (this.rightHand?.type) {
          this.ctx.drawImage(document.querySelector(`#cookie-${this.rightHand?.type}`), this.x + this.canvas.height * 0.015, this.y + this.canvas.height * 0.04, this.canvas.height * 0.025, this.canvas.height * 0.025)
        }
        return;
      }

      this.ctx.drawImage(this.cookBG, this.positions[this.direction].startX + 60 * this.positions[this.direction].current, this.positions[this.direction].startY, 60, 90, this.x, this.y, this.w, this.h);
      return;
    }

    if (this.direction === 'right') {

      if (this.boosters?.gold) {
        this.ctx.drawImage(document.querySelector('#cookie-gold'), this.x, this.y + this.canvas.height * 0.03, this.canvas.height * 0.03, this.canvas.height * 0.03)
        this.ctx.drawImage(this.cookBG, this.positions[this.direction].startX + 60 * this.positions[this.direction].current, this.positions[this.direction].startY, 60, 90, this.x, this.y, this.w, this.h);
        return;
      }

      if (Object.keys(this.cookiesRaised).length > 0) {

        if (this.leftHand?.type) {
          this.ctx.drawImage(document.querySelector(`#cookie-${this.leftHand?.type}`), this.x + this.w - this.canvas.height * 0.02, this.y + this.canvas.height * 0.04, this.canvas.height * 0.025, this.canvas.height * 0.025)
        }

        this.ctx.drawImage(this.cookBG, this.positions[this.direction].startX + 60 * this.positions[this.direction].current, this.positions[this.direction].startY, 60, 90, this.x, this.y, this.w, this.h);

        if (this.rightHand?.type) {
          this.ctx.drawImage(document.querySelector(`#cookie-${this.rightHand?.type}`), this.x + this.canvas.height * 0.015, this.y + this.canvas.height * 0.04, this.canvas.height * 0.025, this.canvas.height * 0.025)
        }
        return;
      }

      this.ctx.drawImage(this.cookBG, this.positions[this.direction].startX + 60 * this.positions[this.direction].current, this.positions[this.direction].startY, 60, 90, this.x, this.y, this.w, this.h);
      return;
    }


    if (this.boosters?.gold) {
      this.ctx.drawImage(document.querySelector('#cookie-gold'), this.x + this.canvas.height * 0.035, this.y + this.canvas.height * 0.03, this.canvas.height * 0.03, this.canvas.height * 0.03)
      this.ctx.drawImage(this.cookBG, this.positions[this.direction].startX + 60 * this.positions[this.direction].current, this.positions[this.direction].startY, 60, 90, this.x, this.y, this.w, this.h);
      return;
    }

    if (Object.keys(this.cookiesRaised).length > 0) {

      if (this.leftHand?.type) {
        this.ctx.drawImage(document.querySelector(`#cookie-${this.leftHand?.type}`), this.x - this.canvas.height * 0.007, this.y + this.canvas.height * 0.04, this.canvas.height * 0.025, this.canvas.height * 0.025)
      }

      if (this.rightHand?.type) {
        this.ctx.drawImage(document.querySelector(`#cookie-${this.rightHand?.type}`), this.x + this.w - this.canvas.height * 0.018, this.y + this.canvas.height * 0.04, this.canvas.height * 0.025, this.canvas.height * 0.025)
      }

    }

    this.ctx.drawImage(this.cookBG, this.positions[this.direction].startX + 60 * this.positions[this.direction].current, this.positions[this.direction].startY, 60, 90, this.x, this.y, this.w, this.h);

  }

  handleClickActiveCookie = (event) => {
    const slot = event.target.id;
    switch (slot) {
      case 'leftHand':
        this.deleteRaisedCookie(this.leftHand.id)
        break;

      case 'rightHand':
        this.deleteRaisedCookie(this.rightHand.id)
        break;

      default: break;
    }
  }

  raiseCookie(id, type) {
    if (type === 'gold') {
      this.boosters.gold = true;

      let cookieID;
      for (cookieID in this.cookiesRaised) {
        delete this.cookiesRaised[cookieID];
      }

      this.interfaceNodes.slot1.classList.add('slot_active');
      this.interfaceNodes.slot1.style.backgroundImage = `url("./img/cookie/${type}.png")`;
      this.interfaceNodes.slot2.classList.add('slot_active');
      this.interfaceNodes.slot2.style.backgroundImage = `url("./img/cookie/${type}.png")`;
      return;
    }

    this.cookiesRaised[id] = { id, type };

    if (!this.leftHand) {
      this.leftHand = this.cookiesRaised[id];
      this.interfaceNodes.slot1.classList.add('slot_active');
      this.interfaceNodes.slot1.style.backgroundImage = `url("./img/cookie/${type}.png")`;
    } else if (!this.rightHand) {
      this.rightHand = this.cookiesRaised[id];
      this.interfaceNodes.slot2.classList.add('slot_active');
      this.interfaceNodes.slot2.style.backgroundImage = `url("./img/cookie/${type}.png")`;
    }
  }

  deleteRaisedCookie(id) {
    if (this.boosters?.gold) {
      this.interfaceNodes.slot1.classList.remove('slot_active');
      this.interfaceNodes.slot1.style.backgroundImage = null;
      this.leftHand = null;

      this.interfaceNodes.slot2.classList.remove('slot_active');
      this.interfaceNodes.slot2.style.backgroundImage = null;
      this.rightHand = null;

      delete this.boosters.gold;
      return;
    }

    delete this.cookiesRaised[id];

    if (this.leftHand?.id == id) {
      this.interfaceNodes.slot1.classList.remove('slot_active');
      this.interfaceNodes.slot1.style.backgroundImage = null;
      this.leftHand = null;
      return;
    }
    if (this.rightHand?.id == id) {
      this.interfaceNodes.slot2.classList.remove('slot_active');
      this.interfaceNodes.slot2.style.backgroundImage = null;
      this.rightHand = null;
      return;
    }
  }

  checkPosition(impuls) {
    if (!impuls) {
      this.positions[this.direction].current = 0;
      return;
    }

    if (impuls.x === 0 && impuls.y === 0) {
      this.positions[this.direction].current = 0;
      return;
    }

    if (impuls.x < 0 && Math.abs(impuls.x) - Math.abs(impuls.y) > 0) {
      this.direction = 'left';
      this.positions.left.current += 1;
      if (this.positions.left.current > 6) {
        return this.positions.left.current = 1;
      }

      return;
    }

    if (impuls.x > 0 && Math.abs(impuls.x) - Math.abs(impuls.y) > 0) {
      console.log(Math.abs(impuls.x) - Math.abs(impuls.y))
      this.direction = 'right';
      this.positions.right.current += 1;
      if (this.positions.right.current > 6) {
        return this.positions.right.current = 1;
      }
      return;
    }

    if (impuls.y > 0) {
      this.direction = 'top';
      this.positions.top.current += 1;
      if (this.positions.top.current > 6) {
        return this.positions.top.current = 1;
      }
      return;
    }

    if (impuls.y < 0) {
      this.direction = 'bottom';
      this.positions.bottom.current += 1;
      if (this.positions.bottom.current > 6) {
        return this.positions.bottom.current = 1;
      }
      return;
    }

  }

  moveCheched(impuls) {
    let x = this.x + impuls.x * this.speed;
    let y = this.y - impuls.y * this.speed;

    if (x < this.canvas.height * 0.17 || x > this.canvas.height * 0.767) {
      if (y < this.canvas.height * 0.11 || y > this.canvas.height * 0.74) {
        return;
      }

      this.y = y;
      return;
    }


    if (y < this.canvas.height * 0.11 || y > this.canvas.height * 0.74) {

      if (x < this.canvas.height * 0.17 || x > this.canvas.height * 0.767) {
        return;
      }

      this.x = x;
      return;
    }

    this.x = x;
    this.y = y;
  }
}