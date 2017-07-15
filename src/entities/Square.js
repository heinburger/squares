import {colors} from '../variables'

export default class Square {
  constructor (x, y, dx, dy, side) {
    this.windowExtension = 50
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.side = side
    this.alive = true
    this.color = colors.darkBlue
  }
  draw = (context) => {
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.side, this.side)
  }
  update = (context) => {
    this._boundryInteratction()
    this._incrementPosition()
    this.draw(context)
  }
  getPosition = () => {
    return {
      left: this.x,
      top: this.y,
      right: this.x + this.side,
      bottom: this.y + this.side
    }
  }
  kill = () => {
    this.alive = false
  }
  _boundryInteratction = () => {
    if (this.x + this.side > window.innerWidth + this.windowExtension ||
        this.x + this.windowExtension < 0) {
      this.dx = -this.dx
    }

    if (this.y + this.side > window.innerHeight + this.windowExtension ||
        this.y + this.windowExtension < 0) {
      this.dy = -this.dy
    }
  }
  _incrementPosition = () => {
    this.x += this.dx
    this.y += this.dy
  }
}
