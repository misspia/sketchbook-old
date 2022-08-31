import React, { useState } from 'react';
import styled from 'styled-components'

import { Loader } from './Loader'
import { SketchPreviews } from './SketchPreviews'

import { Colors } from '../themes'
import typography from "toolkit/typography"
import { Images } from "../assets"

const Container = styled.div`
  padding: 1em 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${Colors.cream};
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  box-sizing: border-box;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin: 0;
  font-family: ${typography.title};
`;

const Subtitle = styled.h2`
  margin: 0.2em 0;
  font-size: 1.1em;
  font-weight: ${typography.bodyWeight};
  font-family: ${typography.body};
`;

const SocialLink = styled.a`
  margin: 0.5em 0;
  color: ${Colors.black};
  transition: 0.2s all;
`;

const GithubImg = styled.img`
  width: 20px;
  height: auto;
`

export default function Home() {
  const [progress, setProgress] = useState(0);
  return (
    <Container>
      {/* {
        progress < 100 &&
        <Loader progress={progress} />
      } */}
      <Header>
        <Title>Sketchbook</Title>
        <Subtitle>a collection of WebGL experiments</Subtitle>
        <SocialLink
          href="https://github.com/misspia/sketchbook"
          target='_blank'>
          <GithubImg src={Images.Github} />
        </SocialLink>
      </Header>
      <SketchPreviews
        onLoad={(loadedItems, total) => {
          console.debug(loadedItems, total)
          setProgress(loadedItems / total * 100)

        }}
      />
    </Container>
  )
}
