import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components'

import { Icon } from './Icon'
import { Loader } from './Loader'
import { SketchPreviews } from './SketchPreviews'

import { Colors, Fonts, Styles, Icons } from '../themes'
import typography from "toolkit/typography"

const GlobalStyle = createGlobalStyle`
  ${typography.import}
`

export const Container = styled(Styles.SectionContainer)`

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${Colors.cream};
  height: 100%;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  box-sizing: border-box;
  width: 100%;

`;

export const Title = styled.h1`
  font-size: 2.5em;
  margin: 0;
  font-family: ${typography.title};
`;

export const Subtitle = styled.h2`
  margin: 0.2em 0;
  font-size: 1.1em;
  font-weight: ${typography.bodyWeight};
  font-family: ${typography.body};
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
    <>
      <GlobalStyle />
      <Container>
        {/* {
        progress < 100 &&
        <Loader progress={progress} />
      } */}
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
            console.debug(loadedItems, total)
            setProgress(loadedItems / total * 100)

          }}
        />
      </Container>
    </>
  )
}
