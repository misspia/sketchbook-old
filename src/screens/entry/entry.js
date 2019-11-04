import React, { Component } from 'react'

import Header from './header'

import { Container } from './entry.styles'

import Sketches from '../../sketches/sketches'
import MediaActivator from './mediaActivator/mediaActivator';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      sketch: null,
      activateMediaRequired: false, 
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
    const Sketch = Sketches[sketchIndex];
    this.setState({
      title: Sketch.title,
      instructions: Sketch.instructions,
      sketch: new Sketch.sketch(this.canvas, this.audio),
    }, () => {
      if(this.state.sketch.audioElement) {
        this.setState(() => ({
          activateMediaRequired: true,
        }));
      } else {
        this.state.sketch.render()
      }
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
  renderMediaActivator() {
    if(!this.state.activateMediaRequired) return;
    return (
      <MediaActivator
        onClick={e => {
          this.setState( () => ({
            activateMediaRequired: false,
          }), () => {
            this.state.sketch.render();
          })
        }}
      />
    )
  }
  render() {
    return (
      <Container ref={ref => this.container = ref }>
          {this.renderMediaActivator()}
          <Header 
            title={this.state.title}
            instructions={this.state.instructions}
          />
          <canvas ref={ref => this.canvas = ref }></canvas>
          <audio ref={ref => this.audio = ref} loop />
      </Container>
    );
  }
}

export default Entry;
