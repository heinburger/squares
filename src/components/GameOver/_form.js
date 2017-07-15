import React, {Component} from 'react'
import {observer} from 'mobx-react'

import gameStore from '../../stores/game'

import {StyledInput, StyledButton} from '../Styled'

@observer class Form extends Component {
  render() {
    const {onSubmitClick, onNameChange, name} = gameStore
    return (
      <div>
        <StyledInput type='text' placeholder='name' value={name} onChange={onNameChange} />
        <StyledButton primary onClick={onSubmitClick}>submit</StyledButton>
      </div>
    )
  }
}

export default Form
