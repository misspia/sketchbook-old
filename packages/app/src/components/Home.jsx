import React, { useState } from 'react';
import styled from 'styled-components'

import { Icon } from './Icon'
import { Loader } from './Loader'
import { SketchPreviews } from './SketchPreviews'

import { Colors, Fonts, Styles, Icons } from '../themes'

export const Container = styled(Styles.SectionContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

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
  font-size: 2.5em;
  margin: 0;
`;

export const Subtitle = styled.h2`
  margin: 0 0 0.2em 0;
  font-size: 1.1em;
  font-style: italic;
  font-weight: ${Fonts.weightLight};
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

export default function Home() {
  const [progress, setProgress] = useState(0);
  return (
    <Container>
      {
        progress < 100 &&
        <Loader progress={progress} />
      }
      <Header>
        <Title>Sketchbook</Title>
        <Subtitle>a collection of WebGL experiments</Subtitle>
        <SocialContainer>
          <SocialLink
            href="https://github.com/misspia/sketchbook"
            target='_blank'>
            <Icon name={Icons.github} />
          </SocialLink>
        </SocialContainer>
      </Header>
      <SketchPreviews
        onLoad={(loadedItems, total) => {
          console.debug(loadedItems);
          setProgress(loadedItems / total * 100)
        }}
      />
    </Container>)
}
