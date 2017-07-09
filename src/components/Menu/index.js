import React, {Component} from 'react'
import {observer} from 'mobx-react'

import './styles.css'
import menuStore from '../../stores/menu'

@observer class Menu extends Component {
  render() {
    const {paused, togglePause} = menuStore
    return (
      <div className="Menu">
        <button onClick={togglePause}>
          {paused
            ? 'Unpause'
            : 'Pause'
          }
        </button>
      </div>
    )
  }
}

export default Menu
