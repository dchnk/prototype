export default class Hero {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 500;
    this.y = 500;
    this.w = 27.5;
    this.h = 60;
    this.maxCookies = 2;
    this.cookiesRaised = {}
    this.leftHand = null;
    this.rightHand = null;
    this.bg = document.querySelector('#cook');
    this.speed = 2;
    this.boosters = {};
    this.interfaceNodes = {
      slot1: document.querySelector('.slot-1'),
      slot2: document.querySelector('.slot-2'),
    }

  }

  drow() {
    this.ctx.drawImage(this.bg, this.x, this.y, this.w, this.h)
    if (Object.keys(this.cookiesRaised).length > 0) {

      if (this.boosters?.gold) {
        console.log('first')
        this.ctx.drawImage(document.querySelector('#cookie-gold'), this.x, this.y + 25, 30, 30)
        return;
      }

      if (this.leftHand?.type) {
        this.ctx.drawImage(document.querySelector(`#cookie-${this.leftHand?.type}`), this.x - 10, this.y + 30, 15, 15)
      }

      if (this.rightHand?.type) {
        this.ctx.drawImage(document.querySelector(`#cookie-${this.rightHand?.type}`), this.x + this.w - 5, this.y + 30, 15, 15)
      }

    }
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
      // this.interfaceNodes.slot1.removeEventListener('click', this.handleClickActiveCookie)
      this.interfaceNodes.slot1.classList.remove('slot_active');
      this.interfaceNodes.slot1.style.backgroundImage = null;
      this.leftHand = null;
      return;
    }
    if (this.rightHand?.id == id) {
      // this.interfaceNodes.slot2.removeEventListener('click', this.handleClickActiveCookie)
      this.interfaceNodes.slot2.classList.remove('slot_active');
      this.interfaceNodes.slot2.style.backgroundImage = null;
      this.rightHand = null;
      return;
    }
  }

  moveCheched(impuls) {
    // console.log(this.x, this.y)

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