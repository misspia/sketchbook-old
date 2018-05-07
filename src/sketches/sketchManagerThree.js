import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';

const OrbitController = OrbitControls(THREE);

class SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.canvas = canvas;
    this.scene = {};
    this.camaera = {};
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setClearColor();
    const dpr = Math.min(1.5, window.devicePixelRatio);
    this.renderer.setPixelRatio(dpr);

    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.01, 100);
    this.target = new THREE.Vector3();
    this.camera.position.set(0, 1, -3);

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
}
