import React, {Component} from 'react'
import {observer} from 'mobx-react'

import Instructions from './Instructions'
import GameOver from './GameOver'

import gameStore from '../stores/game'

@observer class Game extends Component {
  render() {
    const {showInstructions, showGameOver} = gameStore
    return (
      <div>
        {showGameOver && <GameOver />}
        {showInstructions && <Instructions />}
      </div>
    )
  }
}

export default Game
