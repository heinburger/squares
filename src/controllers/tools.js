const canvas = document.getElementById('tools')
const c = canvas.getContext('2d')

let frameTimeStamp = Date.now()
let frameCount = 1

const getFPS = () => {
  let delta = (Date.now() - frameTimeStamp)/1000
  let fps = 1/delta
  return fps
}

export const drawTools = () => {
  window.requestAnimationFrame(drawTools)
  const fps = getFPS()
  c.clearRect(10, 42, 25, 50)
  c.fillStyle = 'red'
  c.fillText((fps).toFixed(0), 10, 50)
  c.fillText(frameCount, 10, 70)
  frameCount++
  frameTimeStamp = Date.now()
}
