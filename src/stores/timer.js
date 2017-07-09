import {useStrict, computed, observable, action} from 'mobx'

const INTERVAL = 1000 // ms

useStrict(true)
class TimerStore {
  @observable time = 0
  @observable startTime = 0
  @observable endTime = 0
  @observable timeout = null

  @computed get timeFormatted () {
    const minutes = Math.floor((this.time - this.startTime) / 60000) + ''
    const seconds = Math.floor((this.time - this.startTime) / 1000) % 60 + ''
    return `
      ${minutes.length < 2 ? '0' : ''}${minutes}:
      ${seconds.length < 2 ? '0' : ''}${seconds}`
  }

  @action tick = () => {
    this.time = Date.now()
    if (!this.endTime) {
      this.timeout = setTimeout(() => this.tick(), INTERVAL)
    }
  }

  @action startTimer = () => {
    this.resetTimer()
    const start = Date.now()
    this.startTime = start
    this.time = start
    setTimeout(() => this.tick(), INTERVAL)
  }

  @action endTimer = () => {
    this.endTime = Date.now()
  }

  @action resetTimer = () => {
    clearTimeout(this.timeout)
    this.time = 0
    this.startTime = 0
    this.endTime = 0
  }
}

const timerStore = new TimerStore()
export default timerStore
