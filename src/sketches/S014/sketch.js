import * as THREE from 'three';
import PostProcessor from '../postProcessor';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';
import BeatManager from './beatManager';

import Lights from './lights';
import Smoke from "./smoke"
import Hextech from "./hextech"
import Skybox from "./skybox"

import { TestGraph } from "../testGraph"

/**
 * https://threejs.org/docs/#api/en/materials/MeshToonMaterial
 * https://github.com/mnmxmx/toon-shading
 * https://github.com/mnmxmx/halftone-effect
 * 
 * https://stackoverflow.com/q/50025798
 * 
 */
class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement, { cameraNear: 1, cameraFar: 3500 });
    // this.audioSrc = Audio.S014;
    this.audioSrc = Audio.tester;
    this.clock = new THREE.Clock();

    this.spectrumStart = {
      bass: 0,
      midrange: 9,
      highrange: 70,
    }
    this.numFrequencyNodes = 300;
    this.beatManager = new BeatManager(this)

    this.composer = {};
    this.pp = new PostProcessor(this);
    this.renderPass = {};
    this.clock = new THREE.Clock();

    this.fftSize = 512;
    this.bars = [];
    this.lights = new Lights()
    this.smoke = new Smoke(this)
    this.hextech = new Hextech(this)
    this.skybox = new Skybox(this)

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

    // this.scene.add(this.skybox.mesh)
    // this.scene.add(this.hextech.group)
    this.scene.add(this.smoke.mesh)
    this.scene.add(this.lights.ambient)
    this.scene.add(this.lights.point1)
    this.scene.add(this.lights.point2)
    this.scene.add(this.lights.point3)
    this.scene.add(this.lights.point4)

    this.render.toneMappingExposure = 0.15


    this.scene.add(this.testGraph.group)
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());

    this.audio.getByteFrequencyData();
    this.beatManager.update();

    const time = this.clock.getElapsedTime() || 0;

    this.smoke.update(time)
    this.hextech.update(time)

    this.testGraph.update(
      this.audio.frequencyData,
      this.beatManager.bassAverages,
      this.beatManager.midrangeAverages,
      this.beatManager.highrangeAverages
    )
  }
}

export default Sketch;
