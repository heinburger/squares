import React, {Component} from 'react'
import {observer} from 'mobx-react'

import gameStore from '../../stores/game'

import {StyledButton,
        StyledTitle,
        StyledText,
        StyledCenteredBox,
        StyledSection} from '../Styled'

@observer class Instructions extends Component {
  render() {
    const {onStartGameClick} = gameStore
    return (
      <StyledCenteredBox>
        <StyledSection>
          <StyledTitle primary>2</StyledTitle>
          <StyledTitle>minutes</StyledTitle>
        </StyledSection>
        <StyledSection>
          <StyledText>
            move around without getting hit by the other squares. when you get hit, you grow. things will accelerate...
          </StyledText>
        </StyledSection>
        <StyledSection>
          <StyledButton primary onClick={onStartGameClick}>start</StyledButton>
        </StyledSection>
      </StyledCenteredBox>
    )
  }
}

export default Instructions
