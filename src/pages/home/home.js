import React, { useState } from 'react';

import {
  Container, Header, Title, Subtitle,
  SocialContainer, SocialLink
} from './home.styles'
import Icon from '../../components/icon'
import Loader from '../../components/loader'
import SketchList from './sketchList/sketchList'

import Metadata from './home.metadata'

export default function Home() {
  const [progress, setProgress] = useState(0);
  return (
    <Container>
      {
        progress < 100 &&
        <Loader progress={progress}/>
      }
      <Header>
        <Title>Sketchbook</Title>
        <Subtitle>a collection of WebGL experiments</Subtitle>
        <SocialContainer>
          {Metadata.socialLinks.map((link, index) => (
            <SocialLink
              key={index}
              href={link.url}
              target='_blank'>
              <Icon name={link.icon} />
            </SocialLink>
          ))}
        </SocialContainer>
      </Header>
      <SketchList 
        onLoad={(loadedItems, total) => {
          setProgress(loadedItems / total * 100);
        }}
      />
    </Container>)
}
