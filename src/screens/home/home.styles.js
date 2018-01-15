import styled from 'styled-components'
import { Colors, Fonts, Styles } from '../../themes/themes.js'

export const Container = Styles.SectionContainer.extend`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${Colors.cream};
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  box-sizing: border-box;
  width: 100%;

  font-family: ${Fonts.familyTitle};
`;

export const Title = styled.h1`
  font-size: 2em;
  margin: 0;
`;

export const Subtitle = styled.h2`
  font-size: 1em;
  margin: 0;
  font-family: ${Fonts.familyBody};
`;

export const SocialContainer = styled.div`
  display: flex;
  font-size: 1.1em;
`;

export const SocialLink = styled.a`
  color: ${Colors.black};
  transition: 0.2s all;

  &:hover {
    color: ${Colors.pink};
  }
`;
