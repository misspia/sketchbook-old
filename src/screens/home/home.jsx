import React, { Component } from 'react';

import { NavLink } from 'react-router-dom'
import {
  Container, Header, Title, Subtitle,
  SocialContainer, SocialLink
} from './home.styles.js'
import Icon from '../../shared/icon/icon.jsx'
import SketchList from './sketchList/sketchList.jsx'

import Routes from '../../router/routes.js'
import Sketches from '../../sketches/sketches.js'
import Metadata from './home.metadata.js'

class Home extends Component {
  constructor(props) {
    super(props);
  }
  renderHeader() {
    return <Header>
      <Title>Sketchbook</Title>
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
