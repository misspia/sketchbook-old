import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Image, HiddenContainer, Title } from './preview.styles.js'
import Icon from '../../../shared/icon/icon';
import { Icons } from '../../../themes';

class Preview extends Component {
  static defaultProps = {
    to: '',
    title: '',
    image: '',
    isAudio: false,
  }
  render() {
    return (
      <Container>
        <Image src={this.props.image} />
        <NavLink to={this.props.to} />
        <HiddenContainer>
          <Icon name={Icons.audio}/>
        </HiddenContainer>
      </Container>
    );
  }
}

export default Preview;
