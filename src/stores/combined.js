import {useStrict, observable, action, autorun} from 'mobx'
import timerStore from './timer'
import entityStore from './entity'

useStrict(true)
class CombinedStore {
  constructor () {
    autorun(() => {
      if (entityStore.dead) {
        this.endGame()
      }
    })
  }
  @observable paused = false
  @observable showGameOver = false
  @observable showInstructions = true

  @action onInstructionsClick = () => {
    this.showInstructions = true
    this.showGameOver = false
    timerStore.resetTimer()
    entityStore.startGame()
  }

  @action onStartGameClick = () => {
    this.showInstructions = false
    this.showGameOver = false
    this.startGame()
  }

  @action endGame = () => {
    timerStore.endTimer()
    this.showGameOver = true
  }

  @action startGame = () => {
    timerStore.startTimer()
    entityStore.startGame()
    entityStore.activatePlayer()
  }

  @action togglePause = () => {
    this.paused = !this.paused
  }
}

const combinedStore = new CombinedStore()
export default combinedStore
