import React, {Component} from 'react'
import {observer} from 'mobx-react'
import styled from 'styled-components'

import HighScores from './_highScores'

import gameStore from '../../stores/game'
import {colors} from '../../variables'

const GameOverDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${colors.red};
  color: ${colors.white};
  text-align: center;
  padding-top: 10%;
`

@observer class GameOver extends Component {
  render() {
    const {onStartGameClick, onInstructionsClick, onSubmitClick, gameTime, numberOfSquares, onNameChange, name} = gameStore
    return (
      <GameOverDiv>
        <h2>Game over</h2>
        <p>Final time:</p>
        <h1>{gameTime}</h1>
        <p>number of squares:</p>
        <h2>{numberOfSquares}</h2>
        <div>
          <input type='text' placeholder='name' value={name} onChange={onNameChange} />
          <button onClick={onSubmitClick}>submit</button>
        </div>
        <div>
          <button onClick={onStartGameClick}>
            restart
          </button>
          <button onClick={onInstructionsClick}>
            instructions
          </button>
        </div>
        <HighScores />
      </GameOverDiv>
    )
  }
}

export default GameOver
