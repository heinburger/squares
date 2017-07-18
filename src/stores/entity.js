import {useStrict, action, observable} from 'mobx'

import Square from '../entities/Square'
import Player from '../entities/Player'
import Heart from '../entities/Heart'
import Star from '../entities/Star'
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
    this.timeUntilStars = 30 * 1000 // ms : default 40s
    this.addHeartChance = 0.005
    this.addStarChance = 0.004
    this.addSquareChange = 0.015
  }

  @action generate = () => {
    this.setCanvasSize()
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

  setCanvasSize = () => {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  update = () => {
    this.requestId = window.requestAnimationFrame(this.update)
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this._cleanUpDeadEntities()
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

    if (this.timer.delta > this.timeUntilStars) {
      this._addRandomStar()
    }
    this._addRandomHeart()
    this._addRandomSquare()
  }

  start = () => {
    this.timer.start()
    this.playerActive = true
  }

  _generateEntities = () => {
    this.timer = new Timer()
    this.player = new Player(this.endGame)
    this.powerUps = []
    this.squares = []
    this._generateSquares()
  }

  _cleanUpDeadEntities = () => {
    this.squares = this.squares.filter((s) => s.alive)
    this.powerUps = this.powerUps.filter((p) => p.alive)
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

  _addRandomHeart = () => {
    if (Math.random() < this.addHeartChance) {
      this.powerUps.push(new Heart())
    }
  }

  _addRandomStar = () => {
    if (Math.random() < this.addStarChance) {
      this.powerUps.push(new Star())
    }
  }

  _addRandomSquare = () => {
    if (Math.random() < this.addSquareChance) {
      this.squares.push(this._genereateOneSquare())
    }
  }
}

const entityStore = new EntityStore()
export default entityStore
