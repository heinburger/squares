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
    this.numberOfSquares = parseInt((window.innerWidth * window.innerHeight) / 5000, 10)
    this.startingSquareSize = 15
    this.startingVelocityXMultiplier = 5
    this.startingVelocityYMultiplier = 2
    this.timeUntilStars = 30 * 1000 // ms : default 40s
    this.addHeartChance = 0.005
    this.addStarChance = 0.004
    this.addSquareChange = 0.015

    // entities
    this.timer = {}
    this.player = {}
    this.powerUps = []
    this.squares = []

    //canvas setup
    this.setCanvasSize()
  }

  @action start = (playerIsCrowned) => {
    // do this first
    window.cancelAnimationFrame(this.requestId)
    this.dead = false
    this._generateAllEntities()

    // main
    this.timer.start()
    if (playerIsCrowned) { this.player.crown() }

    // start animatinos
    this._update()
  }

  @action idle = () => {
    // do this first
    window.cancelAnimationFrame(this.requestId)
    this._generateSquares(10)

    // start animations
    this._softUpdate()
  }

  @action endGame = () => {
    this.dead = true
    window.cancelAnimationFrame(this.requestId)
  }

  setCanvasSize = () => {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  killPowerup = (id) => {
    this.powerUps.splice(this.powerUps.findIndex((p) => p.id === id), 1)
  }

  killSquare = (id) => {
    this.squares.splice(this.squares.findIndex((s) => s.id === id), 1)
  }

  _softUpdate = () => {
    // do this first
    this.requestId = window.requestAnimationFrame(this._softUpdate)
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)

    // entity updates
    for (let s of this.squares) {
      s.update(this.context)
    }

    // extras
    this._addRandomSquare()
  }

  _update = () => {
    // do this first
    this.squares.length
    this.requestId = window.requestAnimationFrame(this._update)
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this._addRandomHeart()
    this._addRandomSquare()
    if (this.timer.delta > this.timeUntilStars) {
      this._addRandomStar()
    }
    if (this.timer.delta > 60 * 2 * 1000) {
      this.player.crown()
    }

    // entity updates
    for (let p of this.powerUps) { p.update(this.context) }
    for (let s of this.squares) { s.update(this.context, this.player.sick) }
    this.timer.update(this.context)

    // update player last
    this.player.update(this.context, this.squares, this.powerUps)
  }

  _generateAllEntities = () => {
    this.timer = new Timer()
    this.player = new Player(this.endGame)
    this.powerUps = []
    this.squares = []
    this._generateSquares()
  }

  _generateSquares = (number = this.numberOfSquares) => {
    this.squares = []
    const times = [...Array(number).keys()]
    times.forEach(() => this.squares.push(this._genereateOneSquare()))
  }

  _genereateOneSquare = () => {
    const side = this.startingSquareSize
    const x = Math.random() * (window.innerWidth - side)
    const y = Math.random() * (window.innerHeight - side)
    const dx = (Math.random() - 0.5) * this.startingVelocityXMultiplier
    const dy = (Math.random() - 0.5) * this.startingVelocityYMultiplier
    return new Square(x, y, dx, dy, side, this.killSquare)
  }

  _addRandomHeart = () => {
    if (Math.random() < this.addHeartChance) {
      this.powerUps.push(new Heart(this.killPowerup))
    }
  }

  _addRandomStar = () => {
    if (Math.random() < this.addStarChance) {
      this.powerUps.push(new Star(this.killPowerup))
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
