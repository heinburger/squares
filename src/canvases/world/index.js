import menuStore from '../../stores/menu'
import Square from '../../entities/Square'
import Player from '../../entities/Player'

const canvas = document.getElementById('world')
const c = canvas.getContext('2d')

const squares = []
const times = [...Array(100).keys()]
times.forEach(() => {
  let side = 15
  let x = Math.random() * (window.innerWidth - side)
  let y = Math.random() * (window.innerHeight - side)
  let dx = (Math.random() - 0.5) * 10
  let dy = (Math.random() - 0.5) * 2
  squares.push(new Square(x, y, dx, dy, side))
})
const player = new Player()

const updateLoop = () => {
  window.requestAnimationFrame(updateLoop)
  if (!menuStore.paused) {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for (let s of squares) {
      s.update()
    }
    player.update()
  }
}

export const startWorld = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  // add event listeners here?
  updateLoop()
}


export const worldContext = c
export const worldCanvas = canvas
