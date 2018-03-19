import styled from 'styled-components'
import { darken } from 'polished'
import { BASE_COLOR } from '../vars'

export default styled.button`
  background: ${BASE_COLOR};
  color: ${BASE_COLOR};
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
  font-weight: normal;
  border: 1px solid transparent;
  border-radius: 3px;
  transition-duration: 0.1s;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.001);
  border: 1px solid #ccc;
  min-height: 35px;
  padding: 0 20px;
  float: right;
  margin-top: 5px;
  margin-bottom: 5px;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.1);
  }
  &:hover {
    color: white;
    background: ${darken(0.1, BASE_COLOR)};
    border: 1px solid ${darken(0.2, BASE_COLOR)};
  }
  &:active,
  &.touched {
    background: ${darken(0.2, BASE_COLOR)};
    border: 1px solid ${darken(0.3, BASE_COLOR)};
    transition-duration: 0s;
  }
`
