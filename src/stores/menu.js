import {useStrict, observable, action} from 'mobx'
import {timerStore} from './timer'

useStrict(true)
class MenuStore {
  @observable paused = false
  @observable gameOver = false
  @observable instructions = true

  @action showInstructions = () => {
    this.instructions = true
  }
  @action startGame = () => {
    this.instructions = false
    this.gameOver = false
    timerStore.startTimer()
  }
  @action endGame = () => {
    timerStore.endTimer()
    this.gameOver = true
  }
  @action togglePause = () => {
    this.paused = !this.paused
  }
  @action pauseGame = () => {
    this.paused = true
  }
  @action unPauseGame = () => {
    this.paused = false
  }
}

const menuStore = new MenuStore()
export default menuStore
