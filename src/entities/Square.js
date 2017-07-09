import {worldContext as c} from '../canvases/world'

export default class Square {
  constructor (x, y, dx, dy, side) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.side = side
    this.color = 'black'
  }
  draw = () => {
    c.fillStyle = this.color
    c.fillRect(this.x, this.y, this.side, this.side)
  }
  update = () => {
    if (this.x + this.side > window.innerWidth || this.x < 0) {
      this.dx = -this.dx
    }

    if (this.y + this.side > window.innerHeight || this.y < 0) {
      this.dy = -this.dy
    }

    this.x += this.dx
    this.y += this.dy

    this.draw()
  }
}
