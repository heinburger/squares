import React from 'react'
import ReactDOM from 'react-dom'

// controllers
import {initWorld} from './controllers/world'

// components
import Menu from './components/Menu'

// global styles
import './index.css'

// setup world canvas
initWorld()

// render components
ReactDOM.render(<Menu />, document.getElementById('menu'))
