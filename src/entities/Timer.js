import {formatTime} from './_utils'
import {theme} from '../variables'

export default class Timer {
  constructor () {
    this.width = 150
    this.startTime = 0
    this.formattedTime = formatTime(0)
    this.x = window.innerWidth / 2 - this.width / 2
    this.y = 30
    this.color = theme.color
  }

  draw = (context) => {
    context.font = '24px "Press Start 2P"'
    context.fillStyle = this.color
    context.fillText(this.formattedTime, this.x, this.y, this.width);
  }

  update = (context) => {
    if (this.startTime) {
      this.formattedTime = formatTime(Date.now() - this.startTime)
      this.draw(context)
    }
  }

  start = () => {
    this.startTime = Date.now()
  }
}
