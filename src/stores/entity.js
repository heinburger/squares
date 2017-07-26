import {useStrict, action, observable} from 'mobx'

import {overlapping} from '../entities/_utils'
import Square from '../entities/Square'
import Player from '../entities/Player'
import Heart from '../entities/Heart'
import Star from '../entities/Star'
import Forcefield from '../entities/Forcefield'
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
    this.startingSquareSize = 15 // <-- default 15
    this.startingVelocityXMultiplier = 5
    this.startingVelocityYMultiplier = 2
    this.timeUntilStars = 30 * 1000 // ms <-- default 30s
    this.timeUntilForcefields = 60 * 1000 // ms <-- default 60s
    this.addHeartChance = 0.005 // <-- default 0.005
    this.addStarChance = 0.004 // <-- default 0.004
    this.addForcefieldChance = 0.003 // <-- default 0.003
    this.addSquareChange = 0.015 // <-- default 0.015

    // entities
    this.timer = {}
    this.players = []
    this.powerUps = []
    this.squares = []

    //canvas setup
    this.setCanvasSize()
  }

  @action start = (playerIsCrowned = false) => {
    // do this first
    window.cancelAnimationFrame(this.requestId)
    this.dead = false
    this._generateAllEntities()

    // main
    this.timer.start()
    if (playerIsCrowned) { this.players[0].crown() }

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
    const powerUpIndex = this.powerUps.findIndex((p) => p.id === id)
    if (powerUpIndex > -1) { this.powerUps.splice(powerUpIndex, 1) }
  }

  killSquare = (id) => {
    const squareIndex = this.squares.findIndex((s) => s.id === id)
    if (squareIndex > -1) { this.squares.splice(squareIndex, 1) }
  }

  _softUpdate = () => {
    // do this first
    this.requestId = window.requestAnimationFrame(this._softUpdate)
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this._addRandomSquare()

    // entity updates
    for (let s of this.squares) {
      s.update(this.context)
    }

    this._physics()
  }

  _update = () => {
    // do this first
    this.requestId = window.requestAnimationFrame(this._update)
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this._addRandomHeart()
    this._addRandomSquare()
    if (this.timer.delta > this.timeUntilStars) {
      this._addRandomStar()
    }
    if (this.timer.delta > this.timeUntilForcefields) {
      this._addRandomForcefield()
    }
    if (this.timer.delta > 60 * 2 * 1000) {
      this.players[0].crown()
    }

    // entity updates
    for (let p of this.powerUps) { p.update(this.context) }
    for (let s of this.squares) { s.update(this.context, this.players[0].sick) }
    this.timer.update(this.context)

    // update players last
    for (let player of this.players) {
      player.update(this.context, this.squares, this.powerUps)
    }

    this._physics()
  }

  _generateAllEntities = () => {
    this.timer = new Timer()
    this.players = [new Player(this.endGame)]
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

  _addRandomForcefield = () => {
    if (Math.random() < this.addForcefieldChance) {
      this.powerUps.push(new Forcefield(this.killPowerup))
    }
  }

  _addRandomSquare = () => {
    if (Math.random() < this.addSquareChance) {
      this.squares.push(this._genereateOneSquare())
    }
  }

  _physics = () => {
    const entities = [...this.squares, ...this.powerUps, ...this.players]
    entities.forEach((e1) => {
      const others = entities.filter((e) => e.id !== e1.id)
      others.forEach((e2) => {
        if (overlapping(e1.getPosition(), e2.getPosition())) {
          this._handleEntityInteraction(e1, e2)
        }
      })
    })

  }

  _handleEntityInteraction = (e1, e2) => {
    const x = e2.x - e1.x
    const y = e2.y - e1.y
    const degs = (Math.atan2(y, x) * 180 / Math.PI) % 360
    if ((degs >= -45 && degs < 45)) {
      if (e1.dx > 0) e1.dx = -e1.dx
      if (e2.dx < 0) e2.dx = -e2.dx
    }
    else if (degs > 45 && degs <= 135) {
      if (e1.dy > 0) e1.dy = -e1.dy
      if (e2.dy < 0) e2.dy = -e2.dy
    }
  }
}

const entityStore = new EntityStore()
export default entityStore
