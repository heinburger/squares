class ToolStore {
  constructor () {
    this.canvas = document.getElementById('devtools')
    this.context = this.canvas.getContext('2d')
    this.frameTimeStamp = Date.now()
    this.frameCount = 1
  }
  _getFps = () => {
    const delta = (Date.now() - this.frameTimeStamp) / 1000
    return (1 / delta).toFixed(0)
  }
  update = () => {
    window.requestAnimationFrame(this.update)
    this.context.clearRect(10, 42, 25, 50)
    this.context.fillStyle = 'red'
    this.context.fillText(this._getFps(), 10, 50)
    this.context.fillText(this.frameCount, 10, 70)
    this.frameCount++
    this.frameTimeStamp = Date.now()
  }
}
const toolStore = new ToolStore()

export default toolStore
