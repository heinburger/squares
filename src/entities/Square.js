import {colors} from '../variables'
import {getId} from './_utils'

export default class Square {
  constructor (x = 0, y = 0, dx = 0, dy = 0, size = 0, kill = () => false) {
    this.id = getId()
    this.kill = () => kill(this.id)
    this.windowExtension = 50
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.size = size
    this.speedUpMultiplier = 1.75
    this.speedUpLength = 5000 // ms
  }

  draw = (context) => {
    context.fillStyle = colors.squareFill
    context.fillRect(this.x, this.y, this.size, this.size)
  }

  update = (context, shouldSpeedUp) => {
    // do this first
    this._boundryInteratction()
    this._incrementPosition()
    if (shouldSpeedUp) { this._speedUp() }

    // draw
    this.draw(context)
  }

  getPosition = () => {
    return {
      left: this.x,
      top: this.y,
      right: this.x + this.size,
      bottom: this.y + this.size
    }
  }

  _boundryInteratction = () => {
    if (this.x + this.size > window.innerWidth + this.windowExtension) {
      this.x = window.innerWidth + this.windowExtension - this.size
      this.dx = -this.dx
    }

    if (this.x + this.windowExtension < 0) {
      this.x = 0 - this.windowExtension
      this.dx = -this.dx
    }

    if (this.y + this.size > window.innerHeight + this.windowExtension) {
      this.y = window.innerHeight + this.windowExtension - this.size
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
