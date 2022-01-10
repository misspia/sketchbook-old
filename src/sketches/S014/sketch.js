import * as THREE from 'three';
import PostProcessor from '../postProcessor';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';
import BeatManager from './beatManager';
import EffectManager from "./effectManager"
import { Layers } from "./constants"

import Smoke from "./smoke"
import Spirits from "./spirits"
import Hextech from "./hextech"


import { TestGraph } from "../testGraph"

class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement, { cameraNear: 1, cameraFar: 3500 });
    // this.audioSrc = Audio.S014;
    this.audioSrc = Audio.tester;
    this.clock = new THREE.Clock();
    this.effectManager = new EffectManager(this);

    this.spectrumStart = {
      bass: 0,
      midrange: 16,
      highrange: 165,
    }
    this.numFrequencyNodes = 300;
    this.beatManager = new BeatManager(this)

    this.composer = {};
    this.pp = new PostProcessor(this);
    this.renderPass = {};
    this.clock = new THREE.Clock();

    this.fftSize = 512;
    this.bars = [];
    this.smoke = new Smoke(this)
    this.spirits = new Spirits(this)
    this.hextech = new Hextech(this)

    this.testGraph = new TestGraph({
      numNodes: this.numFrequencyNodes,
      midrange: this.spectrumStart.midrange,
      highrange: this.spectrumStart.highrange,
    })
  }

  unmount() {
    this.audio.close();
    this.clearScene();
  }

  init() {
    // this.disableOrbitControls();

    this.setCameraPos(0, 15, 40);
    this.scene.fog = new THREE.Fog(0x050505, 2000, 3500);
    this.lookAt(0, 0, 0);
    this.setClearColor(0x000000);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    this.audio.setSmoothingTimeConstant(0.75);
    this.audio.volume(1)

    // this.scene.add(this.hextech.group)
    this.scene.add(this.smoke.mesh)
    this.scene.add(this.spirits.mesh)
  

    this.render.toneMappingExposure = 0.15
    
    this.smoke.position.set(0, -22, 0)
    this.spirits.position.set(0, -22, 0)

    this.spirits.mesh.layers.set(Layers.AFTERIMAGE)

    this.scene.add(this.testGraph.group)
  }

  customResize(width, height) { 
    this.smoke.onResize()
    this.spirits.onResize()
    this.effectManager.onResize(width, height)
  }
  
  draw() {
    this.audio.getByteFrequencyData();
    this.beatManager.update();
    this.effectManager.update()

    const time = this.clock.getElapsedTime() || 0;

    this.smoke.update(time)
    this.spirits.update(time)
    // this.hextech.update(time)

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
