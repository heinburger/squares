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
    this.speedUpMultiplier = 1.75
    this.speedUpLength = 5000 // ms
  }

  draw = (context) => {
    context.fillStyle = colors.squareFill
    context.fillRect(this.x, this.y, this.side, this.side)
  }

  update = (context, shouldSpeedUp) => {
    this._boundryInteratction()
    this._incrementPosition()
    if (shouldSpeedUp) {
      this._speedUp()
    }
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
    if (this.x + this.side > window.innerWidth + this.windowExtension) {
      this.x = window.innerWidth + this.windowExtension - this.side
      this.dx = -this.dx
    }

    if (this.x + this.windowExtension < 0) {
      this.x = 0 - this.windowExtension
      this.dx = -this.dx
    }

    if (this.y + this.side > window.innerHeight + this.windowExtension) {
      this.y = window.innerHeight + this.windowExtension - this.side
      this.dy = -this.dy
    }

    if (this.y + this.windowExtension < 0) {
      this.y = 0 - this.windowExtension
      this.dy = -this.dy
    }
  }

  _incrementPosition = () => {
    this.x += this.dx
    this.y += this.dy
  }

  _speedUp = () => {
    this.dx = this.dx * this.speedUpMultiplier
    this.dy = this.dy * this.speedUpMultiplier
    setTimeout(() => this._slowDown(), this.speedUpLength)
  }

  _slowDown = () => {
    this.dx = this.dx / this.speedUpMultiplier
    this.dy = this.dy / this.speedUpMultiplier
  }
}
