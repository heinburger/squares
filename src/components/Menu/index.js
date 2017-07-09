import React, {Component} from 'react'

import './styles.css'
import menuStore from '../../stores/menu'

class Menu extends Component {
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
