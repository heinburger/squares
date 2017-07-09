import React, {Component} from 'react'
import {observer} from 'mobx-react'

import menuStore from '../../stores/menu'
import timerStore from '../../stores/timer'

@observer class GameOver extends Component {
  render() {
    const {startGame, showInstructions} = menuStore
    const {endTime} = timerStore
    return (
      <div className='gameover'>
        <h1>Game over</h1>
        <h4>Final time:</h4>
        <h2>{endTime}</h2>
        <button onClick={startGame}>
          restart
        </button>
        <button onClick={showInstructions}>
          instructions
        </button>
      </div>
    )
  }
}

export default GameOver
