import {colors} from '../variables'
import {getId} from './_utils'
import {overlapping} from '../entities/_utils'

export default class Square {
  constructor (x = 0, y = 0, dx = 0, dy = 0, size = 0, kill = () => false) {
    this.id = getId()
    this.kill = () => kill(this.id)
    this.type = 'square'
    this.hit = false
    this.windowExtension = 50
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.size = size
    this.speedUpMultiplier = 1
    this.sickSpeedUpMultiplier = 1.75
  }

  update = (context, physicalEntities = []) => {
    // do this first
    this.hit = false
    this._boundryInteratction()
    this._handleEntityInteraction(physicalEntities)
    this._incrementPosition()

    // draw
    this.draw(context)
  }

  draw = (context) => {
    context.fillStyle = colors.squareFill
    context.fillRect(this.x, this.y, this.size, this.size)
  }

  getPosition = () => {
    return {
      left: this.x,
      top: this.y,
      right: this.x + this.size,
      bottom: this.y + this.size
    }
  }

  _incrementPosition = () => {
    this.x += this.dx * this.speedUpMultiplier
    this.y += this.dy * this.speedUpMultiplier
  }

  _handleEntityInteraction = (physicalEntities) => {
    physicalEntities.forEach((e) => { // maybe a switch on type?
      if (e.type === 'player') {
        this.speedUpMultiplier = e.sick ? this.sickSpeedUpMultiplier : 1
        // if (e.forcefield &&
        //     overlapping(this.getPosition(), e.getPosition())) {
        //
        // }
      } else if (e.id !== this.id &&
                 !e.hit &&
                 overlapping(this.getPosition(), e.getPosition())) {
        this._handleCollision(e)
      }
    })
  }

  _handleCollision = (e) => {
    this.hit = true
    const x = e.x - this.x
    const y = e.y - this.y
    const degs = (Math.atan2(y, x) * 180 / Math.PI) % 360
    if (degs >= -45 && degs < 45) { // right
      if (this.dx > 0) this.dx = -this.dx
      if (e.dx < 0) e.dx = -e.dx
    }
    else if (degs >= 45 && degs < 135) { // top
      if (this.dy > 0) this.dy = -this.dy
      if (e.dy < 0) e.dy = -e.dy
    }
    else if (degs <= -45 && degs > -135) { // bottom
      if (this.dy < 0) this.dy = -this.dy
      if (e.dy > 0) e.dy = -e.dy
    } else { // left
      if (this.dx < 0) this.dx = -this.dx
      if (e.dx > 0) e.dx = -e.dx
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
}
