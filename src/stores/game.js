import {useStrict, observable, computed, action, autorun} from 'mobx'
import entityStore from './entity'
import highScoreStore from './highScores'

useStrict(true)
class GameStore {
  @observable name = undefined
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

  @computed get numberOfSquares () {
    return entityStore.squares.length
  }

  @computed get highScores () {
    return highScoreStore.scores
  }

  @computed get loadingScores () {
    return highScoreStore.requesting
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

  @action onNameChange = (e) => {
    this.name = e.target.value
  }

  @action onSubmitClick = () => {
    highScoreStore.postScore({
      name: this.name,
      mode: this.mode,
      time: this.gameTime,
      number: this.numberOfSquares
    })
  }

  @action endGame = () => {
    this.showGameOver = true
    highScoreStore.getScores()
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