import menuStore from './menu'
import Square from '../entities/Square'
import Player from '../entities/Player'

class Game {
  constructor () {
    this.canvas = document.getElementById('game')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context = this.canvas.getContext('2d')
    this.player = new Player()
    this.squares = []
    this.numberOfSquares = parseInt(window.innerWidth / 8, 10)
    this.requestId = undefined
  }
  newGame = () => {
    window.cancelAnimationFrame(this.requestId)
    this.player = new Player()
    this._generateSquares()
    this.update()
  }
  startGame = () => {
    this.player.active = true
    setTimeout(() => this.player.invincible = false, 2000)
  }
  update = () => {
    this.requestId = window.requestAnimationFrame(this.update)
    if (!menuStore.paused && !menuStore.gameOver) {
      this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let s of this.squares) {
        if (s.alive) { s.update(this.context) }
      }
      this.player.update(this.context, this.squares)
    }
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

const gameStore = new Game()
export default gameStore
export const startGame = gameStore.newGame
