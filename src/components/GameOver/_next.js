import React, {Component} from 'react'
import {observer} from 'mobx-react'
import styled from 'styled-components'

import gameStore from '../../stores/game'

import {StyledButton} from '../Styled'

const StyledDiv = styled.div`padding: 20px 0px;`

@observer class Next extends Component {
  render() {
    const {onStartGameClick, onInstructionsClick} = gameStore
    return (
      <StyledDiv>
        <StyledButton onClick={onStartGameClick}>restart</StyledButton>
        <StyledButton onClick={onInstructionsClick}>instructions</StyledButton>
      </StyledDiv>
    )
  }
}

export default Next
