import {overlapping} from './_utils'

export default class Player {
  constructor (kill) {
    this.kill = kill
    this.side = 30
    this.invincible = true
    this.growing = 0
    this.growthMultiplier = 0.1
    this.x = window.innerWidth / 2 - this.side / 2
    this.y = window.innerHeight / 2 - this.side / 2
    document.addEventListener('mousemove', this._handleMouseMove)
    document.addEventListener('touchmove', this._handleTouchMove)
  }

  draw = (context) => {
    context.fillStyle = this.invincible ? 'rgba(0, 0, 255, 0.5)' : 'blue'
    context.fillRect(this.x, this.y, this.side, this.side)
  }

  update = (context, squares) => {
    if (!this.invincible) {
      this._checkInteractions(squares)
    }
    if (this.growing > 0) {
      this._grow()
    }
    this.draw(context)
    this._checkGameOver()
  }

  getPosition = () => {
    return {
      left: this.x,
      top: this.y,
      right: this.x + this.side,
      bottom: this.y + this.side
    }
  }

  _grow = () => {
    const growSize = this.side * this.growthMultiplier
    this.side += growSize
    this.x -= growSize / 2
    this.y -= growSize / 2
    this.growing--
  }

  _checkInteractions = (squares) => {
    squares.slice().forEach((s, i) => {
      if (overlapping(this.getPosition(), s.getPosition())) {
        if (s.alive) {
          this.growing += 1
          s.kill()
        }
      }
    })
  }

  _checkGameOver = () => {
    if (this.side > window.innerWidth) {
      this.kill()
    }
  }

  _handleMouseMove = (e) => {
    this.x = e.clientX - this.side / 2
    this.y = e.clientY - this.side / 2
  }

  _handleTouchMove = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    this.x = touch.pageX - this.side / 2
    this.y = (touch.pageY - this.side / 2) - 50
  }
}
