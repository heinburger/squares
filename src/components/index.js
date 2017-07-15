import React, {Component} from 'react'
import {observer} from 'mobx-react'
import EventListener from 'react-event-listener'

import Instructions from './Instructions'
import GameOver from './GameOver'

import gameStore from '../stores/game'

@observer class Game extends Component {
  render() {
    const {showInstructions, showGameOver, onPageResize} = gameStore
    return (
      <div>
        <EventListener target={window} onResize={onPageResize} />
        {showGameOver && <GameOver />}
        {showInstructions && <Instructions />}
      </div>
    )
  }
}

export default Game
