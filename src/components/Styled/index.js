import styled from 'styled-components'
import {colors} from '../../variables'

export const StyledButton = styled.button`
  background-color: ${props => props.primary ? colors.purple : colors.white};
  border-radius: 5px;
  border: 1px solid ${props => props.primary ? colors.purple : colors.white};
  color: ${props => props.primary ? colors.white : colors.blue};
  cursor: pointer;
  font-size: 14px;
  padding: 11px 22px;
  margin: 5px;
  position: relative;
  vertical-align: bottom;
  white-space: normal;
  &:hover {
    color: ${props => props.primary ? colors.lightPurple : colors.blue};
    background-color: ${props => props.primary ? colors.purple : colors.gray};
    border-color: ${props => props.primary ? colors.lightPurple : colors.white}
  }
  &:focus {
    color: ${props => props.primary ? colors.lightPurple : colors.white};
    background-color: ${props => props.primary ? colors.purple : colors.gray};
  }
`

export const StyledInput = styled.input`
  appearance: none;
  border-width: 1px;
  border-color: ${colors.white};
  border-radius: 5px;
  border-style: solid;
  box-shadow: none;
  max-width: 190px;
  box-sizing: border-box;
  color: ${colors.blue};
  font-size: 20px;
  margin-bottom: 5px;
  padding: 8px 20px;
  &:hover {
    border-color: ${colors.lightPurple};
  }
  &:focus {
    border-color: ${colors.lightPurple};
    box-shadow: inset 0 1px 3px ${colors.gray};
    outline: none;
  }
`
