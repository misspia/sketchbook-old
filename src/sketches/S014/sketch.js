import * as THREE from 'three';
import PostProcessor from '../postProcessor';
import BeatManager from '../beatManager';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';
import BeatDetector from './beatDetector';

import Lights from './lights';
import Orb from './orb';
import Wall from './wall';
import Staircase from './staircase';

// https://youtu.be/5gZrYyi-XRQ?t=62
class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    // this.audioSrc = Audio.S014;
    this.clock = new THREE.Clock();
    this.audioSrc = Audio.tester;
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
    this.staircase = new Staircase(this)
    this.orb = new Orb(this);
    this.lights = new Lights()
    // this.wall = new Wall(this);
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
    this.initAudio(audioConfig);
    this.audio.setSmoothingTimeConstant(0.75);
    this.audio.volume(1)
    this.beat.onStart(this.audioSrc, this.audio.context)

    // this.scene.add(this.orb.mesh);
    // this.scene.add(this.wall.mesh);
    // this.orb.position.set(0, 0, 2)
    this.scene.add(this.staircase.mesh)
    this.scene.add(this.lights.ambient)
    this.scene.add(this.lights.directional)
    
    this.staircase.position.set(0, -5, 0)

    this.createBars()

    
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
    
    const time = this.clock.getElapsedTime();
    // this.orb.update(time)
    // this.wall.update(time)

    this.staircase.update()
    this.audio.frequencyData.forEach((freq, i) => {
      this.bars[i].scale.y = freq + 0.01
    })
  }
}

export default Sketch;
