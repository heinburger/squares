import React, {Component} from 'react'

import './styles.css'
import store from './store'

class C extends Component {
  render() {
    return (
      <div className="Component">
        {store.something}
      </div>
    )
  }
}

export default C
