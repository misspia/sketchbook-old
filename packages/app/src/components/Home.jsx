import React from 'react';
import styled from 'styled-components'

import { Colors, typography } from '../themes'
import { Images } from "../assets"
import { Sketches } from '../sketches'
import { Routes } from './Router/routes'
import { Preview } from './Preview'

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

export const SketchesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;

  justify-items: center;
  
  @media (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 580px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default function Home() {
  return (
    <Container>
      <Header>
        <Title>Sketchbook</Title>
        <Subtitle>a collection of WebGL experiments</Subtitle>
        <SocialLink
          href="https://github.com/misspia/sketchbook"
          target='_blank'>
          <GithubImg src={Images.Github} />
        </SocialLink>
      </Header>
      <SketchesContainer>
        {Sketches.map((sketch, index) => (
          <Preview
            key={index}
            to={Routes.toSketch(index)}
            image={sketch.image}
          />
        )).reverse()}
      </SketchesContainer>
    </Container>
  )
}
