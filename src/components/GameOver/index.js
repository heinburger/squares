import React, {Component} from 'react'
import {observer} from 'mobx-react'
import styled from 'styled-components'

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
    const {onStartGameClick, onInstructionsClick, gameTime} = gameStore
    return (
      <GameOverDiv>
        <h1>Game over</h1>
        <h4>Final time:</h4>
        <h2>{gameTime}</h2>
        <button onClick={onStartGameClick}>
          restart
        </button>
        <button onClick={onInstructionsClick}>
          instructions
        </button>
      </GameOverDiv>
    )
  }
}

export default GameOver
