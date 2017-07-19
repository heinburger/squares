import {formatTime, getId} from './_utils'
import {theme} from '../variables'

export default class Timer {
  constructor () {
    this.id = getId()
    this.width = 150
    this.startTime = 0
    this.delta = 0
    this.formattedTime = formatTime(0)
    this.x = window.innerWidth / 2 - this.width / 2
    this.y = 40
  }

  draw = (context) => {
    context.font = '24px "Press Start 2P"'
    context.fillStyle = theme.color
    context.fillText(this.formattedTime, this.x, this.y, this.width);
  }

  update = (context) => {
    if (this.startTime) {
      const time = Date.now()
      this.delta = time - this.startTime
      this.formattedTime = formatTime(time - this.startTime)
      this.draw(context)
    }
  }

  start = () => {
    this.startTime = Date.now()
  }
}
