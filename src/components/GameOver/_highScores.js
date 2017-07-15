import React, {Component} from 'react'
import {observer} from 'mobx-react'
import styled, {keyframes} from 'styled-components'

import gameStore from '../../stores/game'

const Blink = keyframes`
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
  100% { opacity: 1.0; }
`

const HighScoreTitle = styled.h2`
  animation: 0.5s ${Blink} linear infinite;
`

const HighScoresDiv = styled.div`
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  text-align: right;
  padding-bottom: 5px;
`
const HighScoreCol = styled.div`
  flex: 0 0 ${props => props.basis};
`

@observer class HighScores extends Component {
  render() {
    const {highScores, loadingScores} = gameStore
    return (
      <div style={{paddingBottom: '50px'}}>
        <HighScoreTitle>
          {loadingScores ? 'loading...' : 'high scores'}
        </HighScoreTitle>
        <HighScoresDiv>
          <HighScoreCol basis={'50%'}><b>name</b></HighScoreCol>
          <HighScoreCol basis={'30%'}><b>time</b></HighScoreCol>
          <HighScoreCol basis={'20%'}><b>squares</b></HighScoreCol>
        </HighScoresDiv>
        {highScores.map((score, i) => {
          return (
            <HighScoresDiv key={i}>
              <HighScoreCol basis={'50%'}>{score.name}</HighScoreCol>
              <HighScoreCol basis={'30%'}>{score.time}</HighScoreCol>
              <HighScoreCol basis={'20%'}>{score.number}</HighScoreCol>
            </HighScoresDiv>
          )
        })}
      </div>
    )
  }
}

export default HighScores
