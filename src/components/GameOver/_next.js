import React, {Component} from 'react'
import {observer} from 'mobx-react'

import gameStore from '../../stores/game'

import {StyledButton, StyledSection} from '../Styled'

@observer class Next extends Component {
  render() {
    const {onStartGameClick, onInstructionsClick} = gameStore
    return (
      <StyledSection>
        <StyledButton onClick={onStartGameClick}>restart</StyledButton>
        <StyledButton onClick={onInstructionsClick}>instructions</StyledButton>
      </StyledSection>
    )
  }
}

export default Next
