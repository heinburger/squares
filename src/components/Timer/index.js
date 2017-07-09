import React, {Component} from 'react'
import {observer} from 'mobx-react'

import './styles.css'
import timerStore from '../../stores/timer'

@observer class Timer extends Component {
  render() {
    const {timeFormatted, startTimer} = timerStore
    return (
      <div className="Timer">
        <button onClick={startTimer}>
          start
        </button>
        <code>{timeFormatted}</code>
      </div>
    )
  }
}

export default Timer
