import * as THREE from 'three';
import PostProcessor from '../postProcessor';
import BeatManager from '../beatManager';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import { Audio } from '../../themes';
import BeatDetector from './beatDetector';

import Lights from './lights';

// https://dribbble.com/shots/7033454-vinnexyuna
class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.raycaster = {};
    this.audioSrc = Audio.tester;
    this.beat = new BeatDetector(this)

    this.spectrumStart = {
      bass: 0,
      midrange: 13,
      highrange: 75,
    }
    this.beatManager = new BeatManager(this)
    // this.audioSrc = Audio.S014;

    this.composer = {};
    this.pp = new PostProcessor(this);
    this.renderPass = {};
    this.clock = new THREE.Clock();

    this.fftSize = 512;
    this.numFrequencyNodes = 100;
    this.vertices = [];

    this.lights = new Lights();

  }

  unmount() {
    this.audio.close();
 
    this.clearScene();
  }

  init() {
    this.disableOrbitControls();
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.soft = true;

    // this.setCameraPos(110, 105, -110);
    this.setCameraPos(0, 0, 80);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xffffff);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    this.audio.setSmoothingTimeConstant(0.75);
    this.beat.onStart(this.audioSrc, this.audio.context)
  }

  draw() {

  }
}

export default Sketch;
