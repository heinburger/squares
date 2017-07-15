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
`

const GameOverText = styled.h1`
  font-size: 50px;
  margin: 40px 0 10px 0;
`

const GameOverTime = styled.p`
  font-size: 70px;
  margin: 0;
`
const GameOverSquares = styled.p`
  font-size: 30px;
  margin: 0 0 20px 0;
`

@observer class GameOver extends Component {
  render() {
    const {gameTime, numberOfSquares} = gameStore
    return (
      <GameOverDiv>
        <GameOverText>Game over</GameOverText>
        <GameOverTime>{gameTime}</GameOverTime>
        <GameOverSquares>{numberOfSquares} squares</GameOverSquares>
        <Form />
        <Next />
        <HighScores />
      </GameOverDiv>
    )
  }
}

export default GameOver
