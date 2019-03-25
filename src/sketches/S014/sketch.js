import * as THREE from 'three';
import glsl from 'glslify';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import { Audio } from '../../themes/themes' 

import frag from './plane.frag';
import vert from './plane.vert';
import audioFrag from './audio.frag';
import audioVert from './audio.vert';

import Container from './container';
import Boid from './boid';

/**
 * https://twitter.com/motions_work/status/927346292283490305
 * https://gamedevelopment.tutsplus.com/tutorials/3-simple-rules-of-flocking-behaviors-alignment-cohesion-and-separation--gamedev-3444
 */
// class Sketch extends SketchManagerThree {
//   constructor(canvas) {
//     super(canvas);
//     this.raycaster = {};
//     this.audioSrc = Audio.tester;

//     this.noise = new THREE.Vector3(2.5, 2.5, 1.0);
//     this.amp = 1.0;
//     this.clock = new THREE.Clock();

//     this.skybox = {};
//     this.numBoids = 20;
//     this.boids = [];
//   }
//   unmount() {

//   }
//   init() {
//     this.createStats();

//     this.setCameraPos(20, 15, -25);
//     this.lookAt(0, 0, 0);
//     this.setClearColor(0xeeeeff);
//     this.createMouseListener();


//     this.raycaster = new THREE.Raycaster();    

//     this.container = new Container();
//     this.scene.add(this.container.mesh);

//     this.initBoids();
//   }
//   initBoids() {
//     for(let i = 0; i < this.numBoids; i++) {
//       const boid = new Boid();
//       this.scene.add(boid.mesh);
//       this.boids.push(boid);
//     }
//   }
//   draw() {
//     this.stats.begin();

//     this.renderer.render(this.scene, this.camera);
//     this.raycaster.setFromCamera(this.mouse, this.camera);

//     this.stats.end();
//     requestAnimationFrame(() => this.draw());
//   }
// }

// export default Sketch;


import Ring from './ring';
/**
 * https://youtu.be/K7cnJPrOzy4?t=236
 * https://threejs.org/examples/?q=bloom#webgl_postprocessing_unreal_bloom
 * https://www.shutterstock.com/blog/who-or-what-is-hatsune-miku-the-making-of-a-virtual-pop-star
 * https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant
 * https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
 * https://github.com/Jam3/analyser-frequency-average/blob/master/index.js
 * https://youtu.be/w6vzMDKSVvo?t=1528
 */
class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.raycaster = {};
    this.audioSrc = Audio.tester;

    this.noise = new THREE.Vector3(2.5, 2.5, 1.0);
    this.amp = 1.0;
    this.clock = new THREE.Clock();

    this.skybox = {};

    this.fftSize = 512;
    this.vertices = [];

    this.numRings = 5;
    this.rings = [];

  }
  unmount() {
    this.audio.stop();
  }
  init() {
    this.createStats();

    this.setCameraPos(30, 30, -50);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xeeeeff);

    const audioConfig = { fftSize: this.fftSize };
    this.initAudio(audioConfig);

    this.createRings();
  }
  createSkybox() {
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({
      // color: 0xffffff,
      color: 0x000000,
      wireframe: true,
    });
    this.skybox = new THREE.Mesh(geometry, material);
    this.skybox.receiveShadow = true;
    this.skybox.position.set(0, 100, 0);

    this.scene.add(this.skybox);
  }
  createRings() {
    const color = 0x00bbff;
    for(let i = 0; i < this.numRings; i ++) {
      const radius = utils.randomFloatBetween(5, 35);
      const arc = utils.randomFloatBetween(Math.PI * 0.3, Math.PI * 0.8);
      const rotateZ = utils.toRadians(utils.randomFloatBetween(0, 360));
      const ring = new Ring({
        color,
        tube: 0.7,
        arc,
        radius,
      });
      ring.rotateZ(rotateZ);
      this.scene.add(ring.mesh);
      this.rings.push(ring);
    }
  }
  updateRings() {
    const averageFreq = this.audio.getAverageFrequency();
    this.rings.forEach((ring) => {
      const velocity = utils.remap(0, 255, 0, 0.1, averageFreq);
      ring.update(velocity)
    })
  }
  draw() {
    this.stats.begin();

    this.audio.getByteFrequencyData();

    this.updateRings();
    this.renderer.render(this.scene, this.camera);

    this.stats.end();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;