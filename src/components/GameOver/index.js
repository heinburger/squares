import React, {Component} from 'react'
import {observer} from 'mobx-react'
import styled from 'styled-components'

import HighScores from './_highScores'
import Next from './_next'
import Form from './_form'

import gameStore from '../../stores/game'
import {colors} from '../../variables'

const GameOverDiv = styled.div`
  position: absolute;
  min-height: 100vh;
  top: 0;
  right: 0;
  left: 0;
  background-color: ${colors.red};
  color: ${colors.white};
  text-align: center;
  padding-top: 5%;
  padding-bottom: 5%;
`
const GameOverBig = styled.p`
  font-size: 70px;
  margin: 0;
`

@observer class GameOver extends Component {
  render() {
    const {gameTime, numberOfSquares} = gameStore
    return (
      <GameOverDiv>
        <h1>Game over</h1>
        <GameOverBig>{gameTime}</GameOverBig>
        <h2>{numberOfSquares} squares</h2>
        <Form />
        <Next />
        <HighScores />
      </GameOverDiv>
    )
  }
}

export default GameOver
