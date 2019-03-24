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
class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.raycaster = {};
    this.audioSrc = Audio.tester;

    this.noise = new THREE.Vector3(2.5, 2.5, 1.0);
    this.amp = 1.0;
    this.clock = new THREE.Clock();

    this.skybox = {};
    this.numBoids = 20;
    this.boids = [];
  }
  unmount() {

  }
  init() {
    this.createStats();

    this.setCameraPos(20, 15, -25);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xeeeeff);
    this.createMouseListener();


    this.raycaster = new THREE.Raycaster();    

    this.container = new Container();
    this.scene.add(this.container.mesh);

    this.initBoids();
  }
  initBoids() {
    for(let i = 0; i < this.numBoids; i++) {
      const boid = new Boid();
      this.scene.add(boid.mesh);
      this.boids.push(boid);
    }
  }
  draw() {
    this.stats.begin();

    this.renderer.render(this.scene, this.camera);
    this.raycaster.setFromCamera(this.mouse, this.camera);

    this.stats.end();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
