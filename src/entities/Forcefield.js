import {colors} from '../variables'
import {getId} from './_utils'

export default class Forcefield {
  constructor (kill = () => false) {
    this.id = getId()
    this.kill = () => kill(this.id)
    this.type = 'forcefield'
    this.teleport = Math.random() < 0.2
    this.size = 20
    this.lifeSpan = 10 * 1000 // ms
    this.x = window.innerWidth * Math.random() - this.size
    this.y = window.innerHeight * Math.random() - this.size
    setTimeout(() => this.kill(), this.lifeSpan)
  }

  draw = (context) => {
    context.strokeStyle = this.teleport
      ? colors.forcefieldTeleportStroke : colors.forcefieldStroke
    context.strokeWeight = 1
    context.lineWidth = 3

    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false)
    context.closePath()
    context.stroke()
  }

  update = (context) => {
    // do this first

    // main
    this.draw(context)
  }

  getPosition = () => {
    return {
      // make it a little smaller than the size so you have to go in it a bit
      left: this.x - this.size / 4,
      top: this.y - this.size / 4,
      right: this.x + this.size / 4,
      bottom: this.y + this.size / 4
    }
  }
}
