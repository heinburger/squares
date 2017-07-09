import {worldContext as c} from '../canvases/world'

export default class Player {
  constructor () {
    this.side = 30
    this.growing = 0
    this.x = window.innerWidth / 2 - this.side / 2
    this.y = window.innerHeight / 2 - this.side / 2
    document.addEventListener('mousemove', this._handleMouseMove)
  }
  draw = () => {
    c.fillStyle = this.interacting ? 'red' : 'blue'
    c.fillRect(this.x, this.y, this.side, this.side)
  }
  update = (squares) => {
    this._checkInteractions(squares)
    this.draw()
  }
  getPosition = () => {
    return {
      px1: this.x,
      px2: this.x + this.side,
      py1: this.y + this.side / 2,
      py2: this.y - this.side / 2
    }
  }
  _checkInteractions = (squares) => {
    this.interacting = false
    squares.slice().forEach((s, i) => {
      const {x1, x2, y1, y2} = s.getPosition()
      const {px1, px2, py1, py2} = this.getPosition()
      if (x1 < px2 && x2 > px1 && y1 > py2 && y2 < py1) {
        this.interacting = true
      }
    })
  }
  _handleMouseMove = (e) => {
    this.x = e.clientX - this.side / 2
    this.y = e.clientY - this.side / 2
  }
}
