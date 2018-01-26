import React, { Component } from 'react'

import Header from './header.jsx'

import { Icons } from '../../themes/themes.js'
import Icon from '../../shared/icon/icon.jsx'
import { Container } from './entry.styles.js'

import Sketches from '../../sketches/sketches.js'

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      sketch: null
    }
    this.resizeHandler = this.resizeHandler.bind(this);
  }
  componentDidMount() {
      this.initCanvas()
      this.addResizeHandler()

      const sketchIndex = this.props.match.params.index;
      this.setNewSketch(sketchIndex);
  }
  componentWillUnmount() {
    // TODO remove canvas
    console.log('unmounting sketch', this.props.match.params.index)
    this.removeResizeHandler();
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.match) return; // 404 handler

    const currentIndex = parseInt(this.props.match.params.index);
    const nextIndex = parseInt(nextProps.match.params.index);

    if(currentIndex != nextIndex) {
      this.clearSketchContext();
      this.setNewSketch(nextIndex);
    }
  }
  clearSketchContext() {
    if(this.state.sketch) this.state.sketch.clear();
    this.setState({
      title: '',
      sketch: {}
    })
  }
  setNewSketch(sketchIndex) {
    this.setState({
      title: Sketches[sketchIndex].title,
      sketch: new Sketches[sketchIndex].sketch(this.canvas),
    }, () => {
      this.state.sketch.render()
    })
  }
  initCanvas() {
    this.canvas.width = this.getDimensions().x;
    this.canvas.height = this.getDimensions().y;
  }
  addResizeHandler() {
    window.addEventListener('resize', this.resizeHandler);
  }
  removeResizeHandler() {
    console.log('remove handler')
    window.removeEventListener('resize', this.resizeHandler);
  }
  resizeHandler() {
    console.log('resize')
    this.canvas.width = this.getDimensions().x;
    this.canvas.height = this.getDimensions().y;
    this.state.sketch.resize(this.canvas.width, this.canvas.height)
  }
  getDimensions() {
    return {
      x: document.documentElement.clientWidth,
      y: document.documentElement.clientHeight
    }
  }
  clearCanvas() {

  }
  render() {
    return <Container innerRef={(ref) => this.container = ref }>
        <Header title={this.state.title}/>
        <canvas ref={(ref) => this.canvas = ref }></canvas>

    </Container>
  }
}

export default Entry;
