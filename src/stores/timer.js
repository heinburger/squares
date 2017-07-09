import {useStrict, computed, observable, action} from 'mobx'
import {formatTime} from './_utils'

const INTERVAL = 1000 // ms

useStrict(true)
class TimerStore {
  @observable time = 0
  @observable startTime = 0
  @observable endTime = 0
  @observable timeout = null

  @computed get timeFormatted () {
    return formatTime(this.time - this.startTime)
  }

  @computed get finalTime () {
    return formatTime(this.endTime - this.startTime)
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
    clearTimeout(this.timeout)
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
