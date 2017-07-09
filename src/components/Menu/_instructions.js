import React, {Component} from 'react'
import {observer} from 'mobx-react'

import menuStore from '../../stores/menu'

@observer class Instructions extends Component {
  render() {
    const {startGame} = menuStore
    return (
      <div className='instructions'>
        <h2>squares</h2>
        <button onClick={startGame}>
          start
        </button>
      </div>
    )
  }
}

export default Instructions
