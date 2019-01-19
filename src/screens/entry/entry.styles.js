import styled, { css } from 'styled-components'
import { Colors, Styles } from '../../themes/themes.js'

export const Container = styled(Styles.SectionContainer)`
  display: flex;
  flex-direction: column;
`;


export const HeaderContainer = styled.header`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  padding: 1em 0;
  box-sizing: border-box;

  height: 1.5em;
  font-size: 1.0em;

  & > * {
    margin: 0;
    padding: 0 0.5em;
    color: ${Colors.grey};
  }
  a {
    ${Styles.anchorReset}
    &:hover {
      transition: 0.3s all;
      color: ${Colors.black};
    }
  }
`;

export const Title = styled.h1`
  letter-spacing: 0.1em;
  text-transform: capitalize;
`;
