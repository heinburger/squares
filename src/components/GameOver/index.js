import React, {Component} from 'react'
import {observer} from 'mobx-react'

import HighScores from './_highScores'
import Next from './_next'
import Form from './_form'

import gameStore from '../../stores/game'
import {theme} from '../../variables'

import {StyledTitle,
        StyledCenteredBox,
        StyledSection} from '../Styled'

@observer class GameOver extends Component {
  render() {
    const {gameTime} = gameStore
    return (
      <StyledCenteredBox bgColor={theme.ggBackground} color={theme.ggColor}>
        <StyledSection>
          <StyledTitle primary>Game over</StyledTitle>
        </StyledSection>
        <StyledSection>
          <StyledTitle>{gameTime}</StyledTitle>
        </StyledSection>
        <Form />
        <Next />
        <HighScores />

      </StyledCenteredBox>
    )
  }
}

export default GameOver
