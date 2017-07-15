import React, {Component} from 'react'
import {observer} from 'mobx-react'
import styled from 'styled-components'

import gameStore from '../../stores/game'

const HighScoresDiv = styled.div`
  max-width: 300px;
  margin: 0 auto;
  display: flex;
`
const HighScoreCol = styled.div`
  flex: 1 1 33%;
`

@observer class HighScores extends Component {
  render() {
    const {highScores, loadingScores} = gameStore
    return (
      <div>
        <div>{loadingScores ? 'loading...' : 'high scores'}</div>
        {highScores.map((score, i) => {
          return (
            <HighScoresDiv key={i}>
              <HighScoreCol>{score.time}</HighScoreCol>
              <HighScoreCol>{score.name}</HighScoreCol>
              <HighScoreCol>{score.mode}</HighScoreCol>
            </HighScoresDiv>
          )
        })}
      </div>
    )
  }
}

export default HighScores
