import {overlapping} from './_utils'

export default class Player {
  constructor (kill) {
    this.kill = kill
    this.side = 30
    this.invincible = true
    this.growing = 0
    this.sick = false
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

  update = (context, squares, powerUps) => {
    this.sick = false
    if (!this.invincible) {
      this._checkSquareInteractions(squares)
      this._checkPowerUpInteractions(powerUps)
    }
    if (this.growing > 0) {
      this._grow()
    } else if (this.growing < 0) {
      this._shrink()
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

  _shrink = () => {
    const growSize = this.side * this.growthMultiplier
    this.side -= growSize
    this.x += growSize / 2
    this.y += growSize / 2
    this.growing++
  }

  _checkSquareInteractions = (squares) => {
    squares.slice().forEach((s, i) => {
      if (overlapping(this.getPosition(), s.getPosition())) {
        if (s.alive) {
          this.growing += 1
          s.kill()
        }
      }
    })
  }

  _checkPowerUpInteractions = (powerUps) => {
    powerUps.slice().forEach((p, i) => {
      if (overlapping(this.getPosition(), p.getPosition())) {
        if (p.alive) {
          if (p.poison) {
            this.sick = true
          } else {
            this.growing -= 1
          }
          p.kill()
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
    const x = e.clientX - this.side / 2
    const y = e.clientY - this.side / 2
    this.x = x > window.innerWidth - this.side || x < 0
      ? this.x
      : x
    this.y = y > window.innerHeight || y < 0
      ? this.y
      : y
  }

  _handleTouchMove = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    this.x = touch.pageX - this.side / 2
    this.y = (touch.pageY - this.side / 2) - 50
  }
}
