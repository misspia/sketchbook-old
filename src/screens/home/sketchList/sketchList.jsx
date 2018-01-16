import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Routes from '../../../router/routes.js'
import Preview from '../preview/preview.jsx'

import { Container } from './SketchList.styles.js'

import Sketches from '../../../sketches/sketches.js'

class SketchList extends Component {
  constructor(props) {
    super(props);
  }
  renderList() {
    return Sketches.reverse().map((sketch, index) => {
      return this.renderPreview(sketch, index);
    })
  }
  renderPreview(sketch, index) {
    const path = Routes.toSketch(index);

    return <Preview
      key={index}
      to={path}
      title={sketch.title}
      image={sketch.image}/>
  }
  render() {
    return <Container>
        {this.renderList()}
    </Container>
  }
}

export default SketchList;
