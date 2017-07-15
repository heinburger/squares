import React, {Component} from 'react'
import {observer} from 'mobx-react'
import styled from 'styled-components'

import gameStore from '../../stores/game'
import {colors} from '../../variables'

import {StyledButton} from '../Styled'

const InstructionsDiv = styled.div`
  position: fixed;
  top: 20%;
  right: 20%;
  left: 20%;
  box-shadow: 0px 1px 5px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.gray};
  text-align: center;
  padding: 10px 30px 40px;
  color: ${colors.blue};
  background: ${colors.white};
`

@observer class Instructions extends Component {
  render() {
    const {onStartGameClick} = gameStore
    return (
      <InstructionsDiv>
        <h2>squares</h2>
        <p>move around without getting hit by the other squares. when you get hit, you grow. things will accelerate...</p>
        <StyledButton primary onClick={onStartGameClick}>start</StyledButton>
      </InstructionsDiv>
    )
  }
}

export default Instructions
