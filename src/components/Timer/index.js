import React, {Component} from 'react'
import {observer} from 'mobx-react'

import './styles.css'
import timerStore from '../../stores/timer'

@observer class Timer extends Component {
  render() {
    const {timeFormatted} = timerStore
    return (
      <div className='timer'>
        <code>{timeFormatted}</code>
      </div>
    )
  }
}

export default Timer
