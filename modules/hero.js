export default class Hero {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 500;
    this.y = 500;
    this.w = 60;
    this.h = 90;
    this.maxCookies = 2;
    this.cookiesRaised = {};
    this.leftHand = null;
    this.rightHand = null;
    this.bg = document.querySelector('#cook');
    this.cookBG = document.querySelector('#cook-man');
    this.positions = {
      bottom: { startX: 0, startY: 0, current: 0 },
      top: { startX: 0, startY: this.h, current: 0 },
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
      this.ctx.drawImage(this.cookBG, this.positions[this.direction].startX + this.w * this.positions[this.direction].current, this.positions[this.direction].startY, this.w, this.h, this.x, this.y, this.w, this.h)
   
      if (this.boosters?.gold) {
        this.ctx.drawImage(document.querySelector('#cookie-gold'), this.x , this.y + 30, 30, 30)
        return;
      }

      if (Object.keys(this.cookiesRaised).length > 0) {

        if (this.leftHand?.type) {
          this.ctx.drawImage(document.querySelector(`#cookie-${this.leftHand?.type}`), this.x + this.w - 20, this.y + 40, 25, 25)
        }

        if (this.rightHand?.type) {
          this.ctx.drawImage(document.querySelector(`#cookie-${this.rightHand?.type}`), this.x - 5, this.y + 40, 25, 25)
        }

      }
      return;
    }


    if (this.boosters?.gold) {
      this.ctx.drawImage(document.querySelector('#cookie-gold'), this.x + 35, this.y + 30, 30, 30)
      this.ctx.drawImage(this.cookBG, this.positions[this.direction].startX + this.w * this.positions[this.direction].current, this.positions[this.direction].startY, this.w, this.h, this.x, this.y, this.w, this.h)
      return;
    }

    if (Object.keys(this.cookiesRaised).length > 0) {

      if (this.leftHand?.type) {
        this.ctx.drawImage(document.querySelector(`#cookie-${this.leftHand?.type}`), this.x - 7, this.y + 40, 25, 25)
      }

      if (this.rightHand?.type) {
        this.ctx.drawImage(document.querySelector(`#cookie-${this.rightHand?.type}`), this.x + this.w - 18, this.y + 40, 25, 25)
      }

    }

    this.ctx.drawImage(this.cookBG, this.positions[this.direction].startX + this.w * this.positions[this.direction].current, this.positions[this.direction].startY, this.w, this.h, this.x, this.y, this.w, this.h)

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
      this.interfaceNodes.slot1.style.backgroundImage = `url("../../img/cookie/${type}.png")`;
      this.interfaceNodes.slot2.classList.add('slot_active');
      this.interfaceNodes.slot2.style.backgroundImage = `url("../../img/cookie/${type}.png")`;
      return;
    }

    this.cookiesRaised[id] = { id, type };

    if (!this.leftHand) {
      this.leftHand = this.cookiesRaised[id];
      this.interfaceNodes.slot1.classList.add('slot_active');
      this.interfaceNodes.slot1.style.backgroundImage = `url("../../img/cookie/${type}.png")`;
    } else if (!this.rightHand) {
      this.rightHand = this.cookiesRaised[id];
      this.interfaceNodes.slot2.classList.add('slot_active');
      this.interfaceNodes.slot2.style.backgroundImage = `url("../../img/cookie/${type}.png")`;
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

    let x = this.x + impuls.x * this.speed;
    let y = this.y - impuls.y * this.speed;

    if (y > this.y) {
      this.direction = 'bottom';
      this.positions.bottom.current += 1;
      if (this.positions.bottom.current > 5) {
        return this.positions.bottom.current = 1;
      }
    }

    if (y < this.y) {
      this.direction = 'top';
      this.positions.top.current += 1;
      if (this.positions.top.current > 5) {
        return this.positions.top.current = 1;
      }

    }
  }

  moveCheched(impuls) {
    let x = this.x + impuls.x * this.speed;
    let y = this.y - impuls.y * this.speed;

    if (x < 170 || x > 767) {
      if (y < 110 || y > 740) {
        return;
      }

      this.y = y;
      return;
    }


    if (y < 110 || y > 740) {

      if (x < 170 || x > 767) {
        return;
      }

      this.x = x;
      return;
    }

    this.x = x;
    this.y = y;
  }
}