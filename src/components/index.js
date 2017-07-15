import React, {Component} from 'react'
import {observer} from 'mobx-react'

import Instructions from './Instructions'
import GameOver from './GameOver'
import Timer from './Timer'

import combinedStore from '../stores/combined'

@observer class Game extends Component {
  render() {
    const {showInstructions, showGameOver} = combinedStore
    return (
      <div>
        <Timer />
        {showGameOver && <GameOver />}
        {showInstructions && <Instructions />}
      </div>
    )
  }
}

export default Game
