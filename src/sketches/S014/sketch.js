import * as THREE from 'three';
import PostProcessor from '../postProcessor';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';
import BeatManager from './beatManager';
import EffectManager from "./effectManager"
import { Layers } from "./constants"

import Smoke from "./smoke"
import Spirits from "./spirits"
import VolumetricSpotlight from './volumetricSpotlight';
import Water from './water'
import Lights from './lights'
import Lightning from './lightning';

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
      midrange: 28,
      highrange: 185,
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
    this.spot = new VolumetricSpotlight(this)
    this.water = new Water(this)
    this.lights = new Lights(this)
    this.lightning = new Lightning(this)

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

    this.setCameraPos(0, 20, -65);
    this.lookAt(0, 0, 0);
    this.setClearColor(0x000000);
    // this.setClearColor(0x010101);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    this.audio.setSmoothingTimeConstant(0.75);
    this.audio.volume(1)

    this.scene.add(this.smoke.mesh)
    this.scene.add(this.spirits.mesh)
    this.scene.add(this.lightning.mesh)

    this.render.toneMappingExposure = 0.15
    
    this.smoke.position.set(0, -22, 0)
    this.spirits.position.set(0, -22, 0)

    this.lights.point.position.set(15, 10, -8)

    this.spirits.mesh.layers.set(Layers.AFTERIMAGE)

    this.scene.add(this.testGraph.group)
    this.testGraph.position.set(0, 30, 0)
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
    this.lightning.update(time)

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
