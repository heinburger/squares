import React, {Component} from 'react'
import {observer} from 'mobx-react'
import styled from 'styled-components'

import timerStore from '../../stores/timer'

const TimerDiv = styled.div`
  position: relative;
  padding-top: 10px;
  text-align: center;
`

@observer class Timer extends Component {
  render() {
    const {timeFormatted} = timerStore
    return (
      <TimerDiv>
        <code>{timeFormatted}</code>
      </TimerDiv>
    )
  }
}

export default Timer
