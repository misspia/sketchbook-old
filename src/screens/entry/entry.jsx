import React, { Component } from 'react'

import Header from './header.jsx'

import { Audio } from '../../themes/themes.js'
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
    this.removeResizeHandler();
    this.state.sketch.unmount();
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
      sketch: new Sketches[sketchIndex].sketch(this.canvas, this.audio),
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
    window.removeEventListener('resize', this.resizeHandler);
  }
  resizeHandler() {
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
    return <Container innerRef={ref => this.container = ref }>
        <Header title={this.state.title}/>
        <canvas ref={ref => this.canvas = ref }></canvas>
        <audio ref={ref => this.audio = ref} loop />
    </Container>
  }
}

export default Entry;
