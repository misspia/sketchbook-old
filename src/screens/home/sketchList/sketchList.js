import React, { Component } from 'react'
import Routes from '../../../router/routes'
import Preview from '../preview/preview'

import { Container } from './SketchList.styles'

import Sketches from '../../../sketches/sketches'

class SketchList extends Component {
  constructor(props) {
    super(props);
  }
  renderList() {
    const reversedList = Sketches.slice().reverse(); // display newest at top
    const total = Sketches.length - 1;
    return reversedList.map((sketch, index) => {
      const originalIndex = total - index;
      return this.renderPreview(sketch, originalIndex);
    })
  }
  renderPreview(sketch, index) {
    const path = Routes.toSketch(index);

    return (
      <Preview
        key={index}
        to={path}
        title={sketch.title}
        image={sketch.image}
        isAudio={sketch.isAudio}
      />
    );
  }
  render() {
    return <Container>
        {this.renderList()}
    </Container>
  }
}

export default SketchList;
