import {useStrict, action, observable} from 'mobx'

import Square from '../entities/Square'
import Player from '../entities/Player'
import Timer from '../entities/Timer'

useStrict(true)
class EntityStore {
  @observable dead = false

  constructor () {
    this.canvas = document.getElementById('entities')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context = this.canvas.getContext('2d')
    this.numberOfSquares = parseInt(window.innerWidth / 8, 10)
  }

  @action generate = () => {
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
    for (let s of this.squares) {
      if (s.alive) { s.update(this.context) }
    }
    this.player.update(this.context, this.squares)
    this.timer.update(this.context)
  }

  start = () => {
    this.timer.start()
    setTimeout(() => this.player.invincible = false, 2000)
  }

  _generateEntities = () => {
    this.timer = new Timer()
    this.player = new Player(this.endGame)
    this.squares = []
    this._generateSquares()
  }

  _generateSquares = () => {
    this.squares = []
    const times = [...Array(this.numberOfSquares).keys()]
    times.forEach(() => {
      let side = 15
      let x = Math.random() * (window.innerWidth - side)
      let y = Math.random() * (window.innerHeight - side)
      let dx = (Math.random() - 0.5) * 5
      let dy = (Math.random() - 0.5) * 2
      this.squares.push(new Square(x, y, dx, dy, side))
    })
  }
}

const entityStore = new EntityStore()
export default entityStore
