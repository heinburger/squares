import {useStrict, computed, observable, action} from 'mobx'
import {formatTime} from './_utils'

const INTERVAL = 1000 // ms

useStrict(true)
class TimerStore {
  @observable time = 0
  @observable startTime = 0
  @observable endTime = 0
  timeout = null

  @computed get timeFormatted () {
    return formatTime(this.time - this.startTime)
  }

  @action _tick = () => {
    this.time = Date.now()
    this.timeout = setTimeout(this._tick, INTERVAL)
  }

  @action startTimer = () => {
    this.resetTimer()
    const start = Date.now()
    this.startTime = start
    this.time = start
    this.timeout = setTimeout(this._tick, INTERVAL)
  }

  @action endTimer = () => {
    clearTimeout(this.timeout)
    this.timeout = null
    this.endTime = Date.now()
  }

  @action resetTimer = () => {
    clearTimeout(this.timeout)
    this.timeout = null
    this.time = 0
    this.startTime = 0
    this.endTime = 0
  }
}

const timerStore = new TimerStore()
export default timerStore
