import * as THREE from 'three';
import PostProcessor from '../postProcessor';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';
import BeatManager from './beatManager';

import Lights from './lights';
import Particles from "./particles"
import Hextech from "./hextech"

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
    this.numFrequencyNodes = 100;
    this.beatManager = new BeatManager(this)

    this.composer = {};
    this.pp = new PostProcessor(this);
    this.renderPass = {};
    this.clock = new THREE.Clock();

    this.fftSize = 512;
    this.bars = [];
    this.lights = new Lights()
    this.particles = new Particles(this)
    this.hextech = new Hextech(this)
  }

  unmount() {
    this.audio.close();
    this.clearScene();
  }

  init() {
    // this.disableOrbitControls();

    this.setCameraPos(0, 0, 6);
    // this.setCameraPos(600, 500, 350);
    this.scene.fog = new THREE.Fog(0x050505, 2000, 3500);
    this.lookAt(0, 0, 0);
    // this.setClearColor(0xffeeee);
    this.setClearColor(0x000000);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    this.audio.setSmoothingTimeConstant(0.75);
    this.audio.volume(0)

    this.scene.add(this.hextech.group)
    this.scene.add(this.particles.mesh)
    this.scene.add(this.lights.ambient)
    this.scene.add(this.lights.point1)
    this.scene.add(this.lights.point2)
    this.scene.add(this.lights.point3)
    this.scene.add(this.lights.point4)

    this.render.toneMappingExposure = 0.15

    // this.createBars()
  }
  createBars() {
    const width = 0.1
    const X_OFFSET = -5;
    for (let i = 0; i < this.numFrequencyNodes; i++) {
      let color = null
      if (i < this.spectrumStart.midrange) {
        color = 0xeeaaaa;
      } else if (i < this.spectrumStart.highrange) {
        color = 0xaaeeaa;
      } else {
        color = 0xeeeeaa
      }
      const g = new THREE.BoxGeometry(width, 0.02, width)
      const m = new THREE.MeshBasicMaterial({ color })
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(width * i + X_OFFSET, 0, 1);
      this.scene.add(mesh);
      // this.bars.push(mesh)
    }
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());

    this.audio.getByteFrequencyData();
    this.beatManager.update();

    const time = this.clock.getElapsedTime();
    // this.particles.update()
    this.hextech.update(time)

    // const scale = 1.8
    // this.audio.frequencyData.forEach((freq, i) => {
    //   const averages
    //     = i < this.spectrumStart.midrange ?
    //       this.beatManager.bassAverages :
    //       i < this.spectrumStart.highrange ?
    //         this.beatManager.midrangeAverages :
    //         this.beatManager.highrangeAverages
    //   const average = averages[averages.length - 1]
      
    //   const diff = freq - average
    //   // this.bars[i].scale.y = (Math.abs(freq - average) + 0.01) * scale
    //   // this.bars[i].scale.y = (diff <= 0 ? 0.01 : diff) * scale
    //   // this.bars[i].scale.y = (diff > 0 ? 0.01 : diff) * scale
    //   this.bars[i].scale.y = freq + 0.01
    // })
  }
}

export default Sketch;
