import React from 'react'
import ReactDOM from 'react-dom'

// canvases
import {startWorld} from './canvases/world'
import {startTools} from './canvases/devtools'
// components
import Menu from './components/Menu'
// global styles
import './index.css'

// setup world canvas
startWorld()
startTools()

// render components
ReactDOM.render(<Menu />, document.getElementById('menu'))
