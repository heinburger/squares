import {colors} from '../variables'

export default class Heart {
  constructor () {
    this.type = 'heart'
    this.size = 20
    this.poison = Math.random() > 0.2 ? false : true
    this.lifeSpan = 10 * 1000
    this.x = window.innerWidth * Math.random() - this.size
    this.y = window.innerHeight * Math.random() - this.size
    this.alive = true
    setTimeout(() => this.kill(), this.lifeSpan)
  }

  draw = (context) => {
    context.strokeStyle = this.poison
      ? colors.heartPoisonStroke : colors.heartStroke
    context.strokeWeight = 1
    context.lineWidth = 3
    context.fillStyle = colors.heartFill
    const x = this.x
    const y = this.y
    const w = this.size
    const h = this.size

    context.beginPath()
    context.moveTo(x + w/2, y + h/2)
    context.quadraticCurveTo(x + w/6, y, x, y + h/2)
    context.lineTo(x + w/2, y + h)
    context.lineTo(x + w, y + h/2)
    context.quadraticCurveTo(x + w * 5/6, y, x + w/2, y + h/2)
    context.closePath()
    context.stroke()
    context.fill()
  }

  update = (context) => {
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

  kill = () => {
    this.alive = false
  }
}