import {worldContext as c} from '../canvases/world'

export default class Player {
  constructor () {
    this.side = 30
    this.color = 'blue'
    this.x = window.innerWidth / 2 - this.side / 2
    this.y = window.innerHeight / 2 - this.side / 2
  }
  draw = () => {
    c.fillStyle = this.color
    c.fillRect(this.x, this.y, this.side, this.side)
  }
  update = () => {
    this.draw()
  }
}
