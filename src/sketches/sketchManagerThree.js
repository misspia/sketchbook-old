import * as THREE from 'three';
import dat from 'dat.gui';
import OrbitControls from 'three-orbit-controls';

import Audio from './audio.js';

const OrbitController = OrbitControls(THREE);

class SketchManagerThree {
  constructor(canvas) {
    this.frag = '';
    this.vert = '';

    this.audio = {};

    this.startTime = Date.now();

    this.canvas = canvas;
    this.mouse = {};
    this.gui = {};
    this.scene = {};
    this.camaera = {};
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialis: true,
      alpha: false,
      stencil: false
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor( 0x29233b );
    const dpr = Math.min(1.5, window.devicePixelRatio);
    this.renderer.setPixelRatio(dpr);

    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.01, 200);
    this.camera.position.set(0, 1, -3);
    this.camera.lookAt(new THREE.Vector3());

    this.scene = new THREE.Scene();
    window.scene = this.scene;

    this.controls = new OrbitController(this.camera, this.renderer.domElement);

    // initial resize
    this.resize();

    // event listeners
    window.addEventListener('resize', () => this.resize());
  }
  init() {}
  draw() {}
  render() {
    this.init();
    this.draw();
  }

  // create audio context
  initAudio(audioFile, additionalConfig) {
    const config = {
      audioFile,
      camera: this.camera,
      ...additionalConfig
    };
    this.audio = new Audio(config);
  }
  createDatGUI() {
    this.gui = new dat.GUI();
  }
  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
  setCameraPos(x, y, z) {
    this.camera.position.set(x, y, z);
  }
  lookAt(x, y, z) {
    this.camera.lookAt(x, y, z);
  }
  setClearColor(hex) {
    this.renderer.setClearColor(hex);
  }
  disableOrbitControls() {
    this.controls.enabled = false;
  }
  getUTime() {
    const deltaTime = (Date.now() - this.startTime) / 1000.0;
    return deltaTime;
  }
}

export default SketchManagerThree;
