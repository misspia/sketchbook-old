import * as THREE from 'three';
import dat from 'dat.gui';
import OrbitControls from 'three-orbit-controls';

const OrbitController = OrbitControls(THREE);

class SketchManagerThree {
  constructor(canvas) {
    this.frag = '';
    this.vert = '';
    this.canvas = canvas;
    this.gui = new dat.GUI();
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
  createDatGUI() {

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
}

export default SketchManagerThree;
