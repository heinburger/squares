import {overlapping, getId} from './_utils'
import {colors} from '../variables'

export default class Player {
  constructor (kill = () => false) {
    this.id = getId()
    this.kill = kill
    this.crowned = false
    this.size = 30
    this.invincible = true
    this.initialInvincibleLength = 2000 // ms
    this.invincibleLength = 5000 // ms
    this.invincibleId = setTimeout(() => this.invincible = false, this.initialInvincibleLength)
    this.growing = 0
    this.sick = false // used to speed up world
    this.drunkLength = 20000 // ms
    this.drunk = false
    this.drunkOffsetMax = 40
    this.drunkOffsetInc = 5
    this.drunkXDirection = Math.random() < 0.5 ? -1 : 1
    this.drunkYDirection = Math.random() < 0.5 ? -1 : 1
    this.drunkXOffset = 0
    this.drunkYOffset = 0
    this.tempFrameCount = 0
    this.invincibleFramesForColor = 15
    this.growthMultiplier = 0.1
    this.x = window.innerWidth / 2 - this.size / 2
    this.y = window.innerHeight / 2 - this.size / 2
    document.addEventListener('mousemove', this._handleMouseMove)
    document.addEventListener('touchmove', this._handleTouchMove)
  }

  draw = (context) => {
    if (this.invincible) {
      this.tempFrameCount++
      context.fillStyle = this.tempFrameCount % this.invincibleFramesForColor <
                          this.invincibleFramesForColor * 0.5
        ? colors.playerFill
        : colors.playerInvincibleFill
    } else {
      context.fillStyle = colors.playerFill
    }
    context.fillRect(this.x, this.y, this.size, this.size)
    if (this.crowned) {
      context.fillStyle = colors.crownFill
      context.strokeStyle = colors.crownStroke
      context.strokeWeight = this.side * 0.5
      context.beginPath()
      context.moveTo(this.x - this.size * 0.2, this.y + this.size * 0.4)

      context.lineTo(this.x - this.size * 0.2, this.y - this.size * 0.25)
      context.lineTo(this.x + this.size * 0.1, this.y - this.size * 0.25)
      context.lineTo(this.x + this.size * 0.1, this.y + this.size * 0.1)

      context.lineTo(this.x + this.size * 0.425, this.y + this.size * 0.1)
      context.lineTo(this.x + this.size * 0.425, this.y - this.size * 0.2)
      context.lineTo(this.x + this.size * 0.7, this.y - this.size * 0.2)
      context.lineTo(this.x + this.size * 0.7, this.y + this.size * 0.1)

      context.lineTo(this.x + this.size * 0.975, this.y + this.size * 0.1)
      context.lineTo(this.x + this.size * 0.975, this.y - this.size * 0.2)
      context.lineTo(this.x + this.size * 1.2, this.y - this.size * 0.2)
      context.lineTo(this.x + this.size * 1.2, this.y + this.size * 0.4)
      // context.lineTo(this.x - this.size * 0.1, this.y + this.size * 0.4)
      context.closePath()
      context.stroke()
      context.fill()
    }
  }

  update = (context, squares, powerUps) => {
    // do this first
    this.sick = false
    this._checkPowerUpInteractions(powerUps)
    if (!this.invincible) {
      this._checkSquareInteractions(squares)
    }
    if (this.growing > 0) {
      this._grow()
    } else if (this.growing < 0) {
      this._shrink()
    }

    // draw
    this.draw(context)

    // cleanup (let draw finish first so square death transistions to gg better)
    this._checkGameOver()
  }

  getPosition = () => {
    return {
      left: this.x,
      top: this.y,
      right: this.x + this.size,
      bottom: this.y + this.size
    }
  }

  crown = () => {
    this.crowned = true
  }

  _grow = () => {
    const growSize = this.size * this.growthMultiplier
    this.size += growSize
    this.x -= growSize / 2
    this.y -= growSize / 2
    this.growing--
  }

  _shrink = () => {
    const growSize = this.size * this.growthMultiplier
    this.size -= growSize
    this.x += growSize / 2
    this.y += growSize / 2
    this.growing++
  }

  _checkSquareInteractions = (squares = []) => {
    squares.forEach((s, i) => {
      if (overlapping(this.getPosition(), s.getPosition())) {
        this.growing++
        s.kill()
      }
    })
  }

  _checkPowerUpInteractions = (powerUps = []) => {
    powerUps.forEach((p, i) => {
      if (overlapping(this.getPosition(), p.getPosition())) {
        p.kill()
        switch (p.type) {
          case 'heart':
            if (p.poison) {
              this.sick = true
            } else {
              this.growing--
            }
            break
          case 'star':
            if (p.alcoholic) {
              clearTimeout(this.drunkId)
              this.drunkId = setTimeout(() => this.drunk = false, this.drunkLength)
              this.drunk = true
            } else {
              clearTimeout(this.invincibleId)
              this.invincibleId = setTimeout(() => this.invincible = false, this.invincibleLength)
              this.invincible = true
            }
            break
          default:
            break
        }
      }
    })
  }

  _checkGameOver = () => {
    if (this.size > window.innerWidth) {
      this.kill()
    }
  }

  _checkForIntoxication = () => {
    if (this.drunk) {
      this.drunkXOffset += (this.drunkXDirection * this.drunkOffsetInc * Math.random())
      this.drunkYOffset += (this.drunkYDirection * this.drunkOffsetInc * Math.random())
      if (this.drunkXOffset > this.drunkOffsetMax) {
        this.drunkXDirection = -1
      } else if (this.drunkXOffset < -this.drunkOffsetMax) {
        this.drunkXDirection = 1
      }
      if (this.drunkYOffset > this.drunkOffsetMax) {
        this.drunkYDirection = -1
      } else if (this.drunkYOffset < -this.drunkOffsetMax) {
        this.drunkYDirection = 1
      }
    } else {
      this.drunkXOffset = 0
      this.drunkYOffset = 0
    }
  }

  _handleMouseMove = (e) => {
    this._checkForIntoxication()
    const x = e.clientX - this.size / 2 + this.drunkXOffset
    const y = e.clientY - this.size / 2 - this.drunkYOffset
    this.x = x > window.innerWidth - this.size || x < 0
      ? this.x
      : x
    this.y = y > window.innerHeight - this.size || y < 0
      ? this.y
      : y
  }

  _handleTouchMove = (e) => {
    this._checkForIntoxication()
    const touch = e.touches[0]
    const x = touch.pageX - this.size / 2
    const y = (touch.pageY - this.size / 2) - 50
    this.x = x > window.innerWidth - this.size || x < 0
      ? this.x
      : x
    this.y = y > window.innerHeight - this.size || y < 0
      ? this.y
      : y
  }
}
