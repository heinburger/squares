import {useStrict, action, observable} from 'mobx'

import Square from '../entities/Square'
import Player from '../entities/Player'
import PowerUp from '../entities/PowerUp'
import Timer from '../entities/Timer'

useStrict(true)
class EntityStore {
  @observable dead = false

  constructor () {
    this.canvas = document.getElementById('entities')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context = this.canvas.getContext('2d')
    this.playerActive = false
    this.initialNumberOfSquares = parseInt((window.innerWidth * window.innerHeight) / 5000, 10)
    this.startingSquareSize = 15
    this.startingVelocityXMultiplier = 5
    this.startingVelocityYMultiplier = 2
    this.addPowerUpChance = 0.005
    this.addSquareChange = 0.01
  }

  @action generate = () => {
    this.playerActive = false
    this.dead = false
    this.time = 0
    window.cancelAnimationFrame(this.requestId)
    this._generateEntities()
    this.update()
  }

  @action endGame = () => {
    this.dead = true
    window.cancelAnimationFrame(this.requestId)
  }

  update = () => {
    this.requestId = window.requestAnimationFrame(this.update)
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for (let p of this.powerUps) {
      if (p.alive) { p.update(this.context) }
    }
    for (let s of this.squares) {
      if (s.alive) { s.update(this.context, this.player.sick) }
    }
    if (this.playerActive) {
      this.player.update(this.context, this.squares, this.powerUps)
    }
    this.timer.update(this.context)

    this._addRandomPowerUp()
    this._addRandomSquare()
  }

  start = () => {
    this.timer.start()
    this.playerActive = true
    setTimeout(() => this.player.invincible = false, 2000)
  }

  _generateEntities = () => {
    this.timer = new Timer()
    this.player = new Player(this.endGame)
    this.powerUps = []
    this.squares = []
    this._generateSquares()
  }

  _generateSquares = () => {
    this.squares = []
    const times = [...Array(this.initialNumberOfSquares).keys()]
    times.forEach(() => this.squares.push(this._genereateOneSquare()))
  }

  _genereateOneSquare = () => {
    const side = this.startingSquareSize
    const x = Math.random() * (window.innerWidth - side)
    const y = Math.random() * (window.innerHeight - side)
    const dx = (Math.random() - 0.5) * this.startingVelocityXMultiplier
    const dy = (Math.random() - 0.5) * this.startingVelocityYMultiplier
    return new Square(x, y, dx, dy, side)
  }

  _addRandomPowerUp = () => {
    if (Math.random() < this.addPowerUpChance) {
      this.powerUps.push(new PowerUp())
    }
  }

  _addRandomSquare = () => {
    if (Math.random() < this.addPowerUpChance) {
      this.squares.push(this._genereateOneSquare())
    }
  }
}

const entityStore = new EntityStore()
export default entityStore
