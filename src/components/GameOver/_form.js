import React, {Component} from 'react'
import {observer} from 'mobx-react'

import gameStore from '../../stores/game'

import {StyledInput, StyledButton, StyledSection} from '../Styled'

@observer class Form extends Component {
  render() {
    const {onSubmitClick, onNameChange, name, disableSubmit, scoreSubmitted} = gameStore
    return (
      <StyledSection>
        <StyledInput type='text' placeholder='name' value={name} onChange={onNameChange} />
        <StyledButton primary disabled={disableSubmit} onClick={onSubmitClick}>
          {scoreSubmitted ? 'submitted' : 'submit'}
        </StyledButton>
      </StyledSection>
    )
  }
}

export default Form
