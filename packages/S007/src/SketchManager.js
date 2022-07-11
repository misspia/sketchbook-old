import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';

const OrbitController = OrbitControls(THREE);

export class SketchManager extends THREE.EventDispatcher {
  constructor(canvas, customOptions = {}) {
    super();
    const options = {
      cameraNear: 0.1,
      cameraFar: 1000,
      ...customOptions,
    };
    this.isInitiated = false;
    this.frag = '';
    this.vert = '';

    this.startTime = Date.now();

    this.canvas = canvas;
    this.mouse = {};
    this.scene = {};
    this.camera = {};

    this.scene = new THREE.Scene();
    if (options.fog) {
      this.scene.fog = options.fog;
    }
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, options.cameraNear, options.cameraFar);
    this.camera.position.set(0, 1, -3);
    this.camera.lookAt(new THREE.Vector3());

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      stencil: false
    });
    
    ////////////////////////////////////////////////////////
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    ////////////////////////////////////////////////////////

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffdddd);
    // const dpr = Math.min(1.5, window.devicePixelRatio);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    window.scene = this.scene;

    this.controls = new OrbitController(this.camera, this.renderer.domElement);

  }

  clear() {}
  triggerUnmount() {
    if(!this.isInitiated) {
      return;
    }
    this.unmount();
  }
  init() { }
  draw() { }
  render() {
    this.init();
    this.draw();

    this.isInitiated = true;
  }

  clearScene() {
    while(this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  }

  createMouseListener() {
    this.mouse = new THREE.Vector2();
    this.canvas.addEventListener('mousemove', e => {
      this.mouse.x = (e.clientX / this.canvas.width) * 2 - 1;
      this.mouse.y = - (e.clientY / this.canvas.height) * 2 + 1;
    });
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);

    this.customResize(width, height);
  }


  /**
   * Sketch specific resize operations
   */
  customResize(width, height) { }

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
