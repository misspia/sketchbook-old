import * as THREE from 'three';
import PostProcessor from '../postProcessor';
import SketchManagerThree from '../sketchManagerThree';
import BeatManager from './beatManager';
import EffectManager from "./effectManager"
import { Audio } from '../../themes'
import { TestGraph } from '../testGraph'
class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.audioSrc = Audio.tester;

    this.clock = new THREE.Clock();
    this.effectManager = new EffectManager(this);

    this.spectrumStart = {
      bass: 0,
      midrange: 28,
      highrange: 185,
    }
    this.numFrequencyNodes = 300;
    this.beatManager = new BeatManager(this)
    this.pp = new PostProcessor(this);
    this.fftSize = 512;

    this.testGraph = new TestGraph({
      numNodes: this.numFrequencyNodes,
      midrange: this.spectrumStart.midrange,
      highrange: this.spectrumStart.highrange,
    })
  }

  unmount() {

  }

  init() {
    this.disableOrbitControls();

    this.setCameraPos(0, 0, -30);
    this.lookAt(0, 0, 0);
    this.setClearColor(0x000000);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    this.audio.setSmoothingTimeConstant(0.75);
    this.audio.volume(1)

    this.scene.add(this.testGraph.group)
  }

  draw() {
    this.audio.getByteFrequencyData();
    this.beatManager.update();
    this.effectManager.update()

    this.testGraph.update(
      this.audio.frequencyData, 
      this.beatManager.bassAverages, 
      this.beatManager.midrangeAverages, 
      this.beatManager.highrangeAverages
    )

    this.effectManager.render();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
