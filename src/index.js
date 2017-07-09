import React from 'react'
import ReactDOM from 'react-dom'

// canvases
import {startGame} from './stores/game'
// import {startTools} from './stores/devtools'
// components
import Menu from './components/Menu'
import Timer from './components/Timer'
// global styles
import './index.css'

// setup world canvas
startGame()
// startTools()

// render components
ReactDOM.render(<Menu />, document.getElementById('menu'))
ReactDOM.render(<Timer />, document.getElementById('timer'))
