import {colors} from '../variables'
import {getId} from './_utils'


export default class Star {
  constructor (kill = () => false) {
    this.id = getId()
    this.kill = () => kill(this.id)
    this.type = 'star'
    this.size = 20
    this.alcoholic = Math.random() > 0.9 ? false : true
    this.lifeSpan = 7 * 1000
    this.x = window.innerWidth * Math.random() - this.size
    this.y = window.innerHeight * Math.random() - this.size
    this.points = 5
    this.altCount = 0
    this.altMod = 15
    setTimeout(() => this.kill(), this.lifeSpan)
  }

  draw = (context) => {
    context.strokeStyle = this.alcoholic
      ? colors.starDrunkStroke : colors.starStroke
    context.strokeWeight = 1
    context.lineWidth = 3
    this.altCount++
    context.fillStyle = this.altCount % this.altMod < this.altMod * 0.7
      ? colors.starFill
      : colors.starSecondFill
    const x = this.x
    const y = this.y
    const w = this.size
    const h = this.size

    context.beginPath()
    context.moveTo(x + w * 5 / 12, y + h * 0 / 12) // out
    context.lineTo(x + w * 7 / 12, y + h * 0 / 12) // out
    context.lineTo(x + w * 9 / 12, y + h * 4 / 12)
    context.lineTo(x + w * 12 / 12, y + h * 4.25 / 12) // out
    context.lineTo(x + w * 12 / 12, y + h * 6.25 / 12) // out
    context.lineTo(x + w * 10 / 12, y + h * 7.5 / 12)

    context.lineTo(x + w * 10.5 / 12, y + h * 12 / 12) // out
    context.lineTo(x + w * 9 / 12, y + h * 12 / 12) // out
    context.lineTo(x + w * 6 / 12, y + h * 10 / 12)
    context.lineTo(x + w * 3 / 12, y + h * 12 / 12) // out
    context.lineTo(x + w * 1.5 / 12, y + h * 12 / 12) // out

    context.lineTo(x + w * 2 / 12, y + h * 7.5 / 12)
    context.lineTo(x + w * 0 / 12, y + h * 6.25 / 12) // out
    context.lineTo(x + w * 0 / 12, y + h * 4.25 / 12) // out
    context.lineTo(x + w * 3 / 12, y + h * 4 / 12)
    context.lineTo(x + w * 5 / 12, y + h * 0 / 12) // out
    context.closePath()
    context.stroke()
    context.fill()
  }

  update = (context) => {
    // main
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
}
