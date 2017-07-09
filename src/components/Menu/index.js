import React, {Component} from 'react'
import {observer} from 'mobx-react'

import './styles.css'

import Instructions from './_instructions'
import GameOver from './_gameOver'

import menuStore from '../../stores/menu'

@observer class Menu extends Component {
  render() {
    const {instructions, gameOver} = menuStore
    if (instructions) {
      return <Instructions />
    } else if (gameOver) {
      return <GameOver />
    } else {
      return null
    }
  }
}

export default Menu
