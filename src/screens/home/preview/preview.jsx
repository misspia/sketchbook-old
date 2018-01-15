import React, { Component} from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Image, HiddenContainer, Title } from './preview.styles.js'

class Preview extends Component {
  static defaultProps = {
    to: '',
    title: '',
    image: ''
  }
  renderImage() {
    return <Image src={this.props.image} />
  }
  renderLink() {
    return <NavLink to={this.props.to} />
  }
  renderHiddenContainer() {
    return <HiddenContainer>
      <Title>{this.props.title}</Title>
    </HiddenContainer>
  }
  render() {
    return <Container>
      {this.renderImage()}
      {this.renderLink()}
      {this.renderHiddenContainer()}
    </Container>
  }
}

export default Preview;
