import React from 'react'
import styled from 'styled-components'
import {theme, fonts} from '../../variables'
import {blink, media} from './_utils'


const StyledCenteredBoxChild = styled.div`
  margin: 0 auto;
  max-width: 36em;
  padding: 2em 1em;
  ${media.medium`
    padding: 5em 1em;
  `}
  ${media.giant`
    padding: 8em 1em;
  `}
`

const StyledCenteredBoxContainer = styled.main`
  background: ${props => props.bgColor ? props.bgColor : theme.background};
  color: ${props => props.color ? props.color : theme.color};
  display: block;
  text-align: center;
`

export const StyledCenteredBox = (props) => (
  <StyledCenteredBoxContainer {...props}>
    <StyledCenteredBoxChild>{props.children}</StyledCenteredBoxChild>
  </StyledCenteredBoxContainer>
)

export const StyledSection = styled.section`
  box-sizing: border-box;
  padding-bottom: 2em;
`

export const StyledButton = styled.button`
  appearance: none;
  background-color: ${props => props.primary
    ? theme.buttonPrimaryBackground : theme.buttonBackground};
  border-radius: 0.5em;
  border: none;
  box-shadow: 0.125em 0.1875em 0em 0.0625em ${props => props.primary
    ? theme.buttonPrimaryShadow : theme.buttonShadow};
  color: ${props => props.primary
    ? theme.buttonPrimaryColor : theme.buttonColor};
  cursor: pointer;
  font-size: ${fonts.small};
  padding: 1em 2em;
  margin: 0 0.5em 0.75em;
  outline: none;
  position: relative;
  vertical-align: bottom;
  white-space: normal;
  &:hover, &:focus {
    color: ${props => props.primary
      ? theme.buttonPrimaryHoverColor : theme.buttonHoverColor};
  }
  &:active {
    transform: translate(0.1875em, 0.25em);
    box-shadow: none;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const StyledInput = styled.input`
  appearance: none;
  background-color: ${theme.inputBackground};
  border: 1px solid ${theme.color};
  border-radius: 5px;
  box-shadow: none;
  box-sizing: border-box;
  color: ${theme.color};
  width: 100%;
  max-width: 18em;
  outline: none;
  margin-bottom: 0.75em;
  padding: 0.75em 1em;
  &:hover {
    border: 1px solid ${theme.inputBorder};
  }
  &:focus {
    border: 1px solid ${theme.inputBorder};
    color: ${theme.color};
  }
  &::placeholder {
    color: ${theme.placeholder};
  }
`

export const StyledTitle = styled.div`
  font-size: ${props => props.primary ? fonts.large : fonts.medium};
  ${props => props.blink && `animation: 0.5s ${blink} linear infinite;`}

  ${media.medium`
    font-size: ${props => props.primary ? fonts.giant : fonts.large};
  `}
`

export const StyledText = styled.div`
  font-size: ${fonts.small};
`

export const StyledTable = styled.table`
  width: 100%;
  text-align: left;

  & th {
    color: ${theme.tableHeaderText};
  }
`
