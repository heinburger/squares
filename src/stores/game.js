import {useStrict, observable, computed, action, autorun} from 'mobx'
import entityStore from './entity'

useStrict(true)
class GameStore {
  @observable paused = false
  @observable showGameOver = false
  @observable showInstructions = true

  constructor () {
    this.setupGame()
    autorun(() => {
      if (entityStore.dead) {
        this.endGame()
      }
    })
  }

  @computed get gameTime () {
    return entityStore.timer.formattedTime
  }

  @action setupGame = () => {
    this.showInstructions = true
    this.showGameOver = false
    entityStore.generate()
  }

  @action onInstructionsClick = () => {
    this.setupGame()
  }

  @action onStartGameClick = () => {
    this.showInstructions = false
    this.showGameOver = false
    entityStore.generate()
    this.startGame()
  }

  @action endGame = () => {
    this.showGameOver = true
  }

  @action startGame = () => {
    entityStore.start()
  }

  @action togglePause = () => {
    this.paused = !this.paused
  }
}

const gameStore = new GameStore()
export default gameStore
