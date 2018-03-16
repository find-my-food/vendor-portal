import styled from 'styled-components'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { BASE_COLOR_DARK } from '../vars.js'

export default styled.nav`
  grid-area: nav;
  background: ${BASE_COLOR_DARK};
`

export const NavLink = styled(RouterNavLink).attrs({
  activeClassName: 'active'
})`
  display: block;
  color: white;
  font-size: 15px;
  line-height: 3em;
  text-decoration: none;
  padding: 0 20px;
  margin: 8px 10px;
  border-radius: 3px;
  transition-duration: 0.2s;
  &:not(.active):hover {
    background: rgba(255, 255, 255, 0.1);
  }
  &:not(.active):active {
    transition-duration: 0s;
    background: rgba(0, 0, 0, 0.08);
  }
  &.active {
    background: rgba(255, 255, 255, 0.1);
  }
`
