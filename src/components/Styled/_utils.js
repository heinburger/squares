import {css, keyframes} from 'styled-components'
import {breakpoints} from '../../variables'

export const blink = keyframes`
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
  100% { opacity: 1.0; }
`

export const media = Object.keys(breakpoints).reduce((acc, bp) => {
  acc[bp] = (...args) => css`
    @media (min-width: ${breakpoints[bp]}) {
      ${css(...args)}
    }
  `
  return acc
}, {})
