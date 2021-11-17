import * as THREE from 'three';
import PostProcessor from '../postProcessor';
import BeatManager from '../beatManager';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';
import BeatDetector from './beatDetector';

import Lights from './lights';
import Particles from "./particles"

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
    this.beat = new BeatDetector(this)

    this.spectrumStart = {
      bass: 0,
      midrange: 9,
      highrange: 70,
    }
    this.beatManager = new BeatManager(this)

    this.composer = {};
    this.pp = new PostProcessor(this);
    this.renderPass = {};
    this.clock = new THREE.Clock();

    this.fftSize = 512;
    this.numFrequencyNodes = 50000;
    this.bars = [];
    this.lights = new Lights()
    this.particles = new Particles(this)
  }

  unmount() {
    this.audio.close();
    this.clearScene();
  }

  init() {
    // this.disableOrbitControls();

    // this.setCameraPos(0, 0, 10);
    this.setCameraPos(600, 500, 800);
    this.scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );
    this.lookAt(0, 0, 0);
    this.setClearColor(0xffeeee);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    this.audio.setSmoothingTimeConstant(0.75);
    this.audio.volume(1)
    this.beat.onStart(this.audioSrc, this.audio.context)

    this.scene.add(this.particles.mesh)
    this.scene.add(this.lights.ambient)
    this.scene.add(this.lights.directional)
    this.scene.add(this.lights.directional2)
    

    // this.createBars()

    
  }
  createBars() {
    const width = 0.1
    const X_OFFSET = -10;
    for(let i = 0; i < this.numFrequencyNodes; i++) {
      let color = null
      if(i < this.spectrumStart.midrange) {
        color = 0xeeaaaa;
      } else if(i < this.spectrumStart.highrange) {
        color = 0xaaeeaa;
      } else {
        color = 0xeeeeaa
      }
      const g = new THREE.BoxGeometry(width, 0.02, width)
      const m = new THREE.MeshBasicMaterial({ color })
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(width * i + X_OFFSET, 0, 1);
      this.scene.add(mesh);
      this.bars.push(mesh)
    }
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());

    this.audio.getByteFrequencyData();
    this.beatManager.update();
    
    // const time = this.clock.getElapsedTime();

    this.particles.update()
    // this.audio.frequencyData.forEach((freq, i) => {
    //   this.bars[i].scale.y = freq + 0.01
    // })
  }
}

export default Sketch;
