import menuStore from '../stores/menu'
import Square from '../entities/Square'
import {drawTools} from './tools'

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

const updateLoop = () => {
  window.requestAnimationFrame(updateLoop)
  if (!menuStore.paused) {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for (let s of squares) {
      s.update()
    }
  }
}

export const initWorld = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  updateLoop()
  drawTools()

}
export const worldContext = c
