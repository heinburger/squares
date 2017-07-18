import React, {Component} from 'react'
import {observer} from 'mobx-react'

import gameStore from '../../stores/game'

import {StyledSection,
        StyledTitle,
        StyledTable} from '../Styled'

@observer class HighScores extends Component {
  render() {
    const {highScores, loadingScores} = gameStore
    return (
      <div>
        <StyledSection>
          <StyledTitle blink>{loadingScores ? 'loading...' : 'high scores'}</StyledTitle>
        </StyledSection>
        <StyledTable>
          <thead>
            <tr>
              <th>name</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            {highScores.map((score, i) => {
              return (
                <tr key={i}>
                  <td>{score.name}</td>
                  <td>{score.time}</td>
                </tr>
              )
            })}
          </tbody>
        </StyledTable>
      </div>
    )
  }
}

export default HighScores
