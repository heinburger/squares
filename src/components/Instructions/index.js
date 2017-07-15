import React, {Component} from 'react'
import {observer} from 'mobx-react'
import styled from 'styled-components'

import combinedStore from '../../stores/combined'

const InstructionsDiv = styled.div`
  position: fixed;
  top: 20%;
  right: 20%;
  left: 20%;
  box-shadow: 0px 1px 5px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 10px 30px 40px;
  background: white;
`

@observer class Instructions extends Component {
  render() {
    const {onStartGameClick} = combinedStore
    return (
      <InstructionsDiv>
        <h2>squares</h2>
        <p>move around without getting hit by the other squares. when you get hit, you grow. things will accelerate...</p>
        <button onClick={onStartGameClick}>
          start
        </button>
      </InstructionsDiv>
    )
  }
}

export default Instructions
