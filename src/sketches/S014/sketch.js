import * as THREE from 'three';
import PostProcessor from '../postProcessor';
import BeatManager from '../beatManager';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';
import BeatDetector from './beatDetector';

import Lights from './lights';
import Particles from "./particles"


// https://www.instagram.com/p/CR9sVtwqupS/
// https://www.instagram.com/p/CQq6f6lNIBk/
// https://www.instagram.com/p/CR3QW1DqUD_/
// https://www.instagram.com/p/CO-LszCqhD-/
// https://www.pinterest.ca/pin/79798224637824408/
// https://www.pinterest.ca/pin/93660867241814246/

/**
 * https://threejs.org/docs/#api/en/materials/MeshToonMaterial
 * https://github.com/mnmxmx/toon-shading
 * https://github.com/mnmxmx/halftone-effect
 */

/**
 * https://stackoverflow.com/q/50025798
 * https://threejs.org/docs/?q=points#api/en/objects/Points
 * https://stackoverflow.com/q/12337660
 * https://stackoverflow.com/q/33845623
 * https://blog.mozvr.com/threejs-particles-recycling/
 * 
 * https://www.youtube.com/watch?v=OFqENgtqRAY&ab_channel=SimonDev
 * https://github.com/simondevyoutube/ThreeJS_Tutorial_ParticleSystems/blob/master/main.js
 */
class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
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
    this.numFrequencyNodes = 100;
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

    this.setCameraPos(0, 0, 10);
    this.lookAt(0, 0, 0);
    this.setClearColor(0x000000);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    // this.initAudio(audioConfig);
    // this.audio.setSmoothingTimeConstant(0.75);
    // this.audio.volume(1)
    // this.beat.onStart(this.audioSrc, this.audio.context)

    this.scene.add(this.particles.mesh)
    this.scene.add(this.lights.ambient)
    this.scene.add(this.lights.directional)
    

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
    // this.audio.getByteFrequencyData();

    // this.beatManager.update();
    
    const time = this.clock.getElapsedTime();

    this.particles.update()
    // this.audio.frequencyData.forEach((freq, i) => {
    //   this.bars[i].scale.y = freq + 0.01
    // })
  }
}

export default Sketch;
