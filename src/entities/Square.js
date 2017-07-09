import {worldContext as c} from '../canvases/world'

export default class Square {
  constructor (x, y, dx, dy, side) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.side = side
    this.color = 'black'
  }
  draw = () => {
    c.fillStyle = this.color
    c.fillRect(this.x, this.y, this.side, this.side)
  }
  update = () => {
    this._boundryInteratction()
    this._incrementPosition()
    this.draw()
  }
  getPosition = () => {
    return {
      x1: this.x,
      x2: this.x + this.side,
      y1: this.y,
      y2: this.y - this.side
    }
  }
  _boundryInteratction = () => {
    if (this.x + this.side > window.innerWidth || this.x < 0) {
      this.dx = -this.dx
    }

    if (this.y + this.side > window.innerHeight || this.y < 0) {
      this.dy = -this.dy
    }
  }
  _incrementPosition = () => {
    this.x += this.dx
    this.y += this.dy
  }
}
