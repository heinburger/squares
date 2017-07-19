import {useStrict, observable, computed, action, autorun} from 'mobx'
import {hasLocalStorageAvailable} from './_utils'

import entityStore from './entity'
import highScoreStore from './highScore'

useStrict(true)
class GameStore {
  @observable name = ''
  @observable crowned = false
  @observable showGameOver = false
  @observable showInstructions = true

  constructor () {
    entityStore.idle()
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

  @computed get submitError () {
    return highScoreStore.errors.has('post')
  }

  @computed get getScoresError () {
    return highScoreStore.errors.has('get')
  }

  @computed get disableSubmit () {
    return highScoreStore.posting || highScoreStore.scoreAccepted
  }

  @computed get scoreSubmitted () {
    return !highScoreStore.posting && highScoreStore.scoreAccepted
  }

  @computed get highScores () {
    return highScoreStore.scores
  }

  @computed get loadingScores () {
    return highScoreStore.requesting
  }

  @action onPageResize = () => {
    entityStore.setCanvasSize()
  }

  @action onInstructionsClick = () => {
    this.showInstructions = true
    this.showGameOver = false
    highScoreStore.scoreAccepted = false
    entityStore.idle()
  }

  @action onStartGameClick = () => {
    this.showInstructions = false
    this.showGameOver = false
    highScoreStore.scoreAccepted = false
    this.checkForCrown()
    entityStore.start(this.crowned)
  }

  @action onNameChange = (e) => {
    this.name = e.target.value
  }

  @action onSubmitClick = () => {
    highScoreStore.postScore({
      name: this.name,
      mode: this.mode,
      time: this.gameTime,
      number: this.numberOfSquares,
      crown: /^((\d){2}:(\d){2}:(\d){3})/.test(this.gameTime) &&
             this.gameTime > '02:00:000'
    })
  }

  @action endGame = () => {
    const gotCrowned = this.gameTime > '02:00:000'
    if (gotCrowned && hasLocalStorageAvailable()) {
      localStorage.getItem('crowned', true)
    }
    document.title = `${gotCrowned ? '👑 ' : ''}${this.gameTime.replace(/:(\d){3}/, '')} < 2:00`
    this.showGameOver = true
    highScoreStore.getScores()
  }

  @action checkForCrown = () => {
    if (hasLocalStorageAvailable()) {
      this.crowned = localStorage.getItem('crowned')
    } else {
      this.crowned = false
    }
  }
}

const gameStore = new GameStore()
export default gameStore
