import React, { Component } from 'react';
import Sketches from '../../sketches/sketches.js'

import { Container } from './entry.styles.js'

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      renderer: () => {}
    }
  }
  componentDidMount() {
      this.initCanvas()
      this.setResizeHandler()
      const sketchIndex = this.props.match.params.index;
      console.log('mouunted', sketchIndex)

      this.setState({
        title: Sketches[sketchIndex].title,
        renderer: Sketches[sketchIndex].renderer,
      }, () => {
        this.state.renderer(this.canvas)
      })
  }
  componentWillUnmount() {
    // TODO remove canvas
    console.log('unmounting sketch', this.props.match.params.index)
  }
  componentWillReceiveProps() {
    // if different sketch index,
    // clear context for new sketch
  }
  initCanvas() {
    this.canvas.width = this.getDimensions().x;
    this.canvas.height = this.getDimensions().y;
  }
  setResizeHandler() {
    window.addEventListener('resize', () => {
      this.canvas.width = this.getDimensions().x;
      this.canvas.height = this.getDimensions().y;
    })
  }
  getDimensions() {
    return {
      x: document.documentElement.clientWidth,
      y: document.documentElement.clientHeight
    }
  }
  render() {
    return <Container innerRef={(ref) => this.container = ref }>
        <div>sketch entry {this.props.match.params.index}</div>
        <canvas ref={(ref) => this.canvas = ref }></canvas>

    </Container>
  }
}

export default Entry;
