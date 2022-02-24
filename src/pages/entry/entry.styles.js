import styled, { css } from 'styled-components'
import { Colors, Styles } from '../../themes'

export const Container = styled(Styles.SectionContainer)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;


export const HeaderContainer = styled.header`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 1em 0;
  box-sizing: border-box;

  height: 1.5em;
  font-size: 1.0em;

  & > * {
    margin: 0;
    padding: 0 0.5em;
    color: ${Colors.greyDark};
  }
  a {
    ${Styles.anchorReset}
    &:hover {
      transition: 0.3s all;
      color: ${Colors.black};
    }
  }
`;

export const Instructions = styled.div`
  font-size: 0.9em;
  margin-left: 0.5em;
  padding: 0.1em 0.5em;
  background-color: ${Colors.whiteTranslucent};
  letter-spacing: 0.1em;

`;


export const SketchContainer = styled.div`
  z-index: 1;
`;
