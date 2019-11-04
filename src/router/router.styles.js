import styled from 'styled-components'
import { Fonts } from '../themes'

export const Container = styled.main`
  font-family: ${Fonts.familyBody};
  font-size: 1em;
`;

export const Nav = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
