import React, { Component } from 'react';

import {
  Container, Header, Title, Subtitle,
  SocialContainer, SocialLink
} from './home.styles'
import Icon from '../../shared/icon'
import SketchList from './sketchList/sketchList'

import Metadata from './home.metadata'

class Home extends Component {
  constructor(props) {
    super(props);
  }
  renderHeader() {
    return <Header>
      <Title>Sketchbook</Title>
      <Subtitle>a collection of WebGL experiments</Subtitle>
      {this.renderSocialLinks()}
    </Header>
  }
  renderSocialLinks() {
    const links = Metadata.socialLinks.map((link, index) => {
      return <SocialLink
          key={index}
          href={link.url}
          target='_blank'>
        <Icon name={link.icon}/>
      </SocialLink>
    })
    return <SocialContainer>{links}</SocialContainer>
  }
  render() {
    return <Container>
        {this.renderHeader()}
        <SketchList />
    </Container>
  }
}

export default Home
