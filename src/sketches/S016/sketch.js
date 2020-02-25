import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';
import Toon from './toon';
import createToonShader from './toonShader';

class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.audioSrc = Audio.tester;
    this.fftSize = 512;
    this.sphere = {};
    this.floor = {};

    this.toonShader = null;
    this.normalMaterial = new THREE.MeshNormalMaterial({
      shadowSide: THREE.BackSide,
    });
    this.shadowMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 0.0,
      shadowSide: THREE.FrontSide,
    });
    this.shadowBuffer = new THREE.WebGLRenderTarget(1, 1, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false,
    });

  }
  unmount() {

  }
  customResize(width, height) {
    if (!this.toonShader) {
      return;
    }
    const resolution = this.getResolution();
    this.toonShader.uniforms.iResolution.value.set(resolution);

    this.shadowBuffer.setSize(width, height)
  }
  getResolution() {
    return new THREE.Vector2(
      this.canvas.width,
      this.canvas.height,
    );
  }
  init() {
    this.createStats();

    // const audioConfig = { fftSize: this.fftSize, dataLength: 25 };
    // this.initAudio(audioConfig);

    this.camera.fov = 45;
    this.camera.near = 0.1;
    this.camera.far = 1000;
    this.setCameraPos(-2, 2, 2);
    this.setClearColor(0x000000);
    this.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();

    this.renderer.shadowMap.enabled = true;

    this.createEffects();

    const fGeometry = new THREE.PlaneGeometry(2, 2);
    this.floor = new THREE.Mesh(fGeometry, this.shadowMaterial);
    this.floor.rotation.x -= Math.PI / 2;
    this.floor.position.set(0, -0.5, 0);
    this.floor.receiveShadow = true;


    const sGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    this.sphere = new THREE.Mesh(sGeometry, this.shadowMaterial);
    this.sphere.castShadow = true;
    this.sphere.receiveShadow = true;

    this.scene.add(this.sphere);
    this.scene.add(this.floor);

    const SHADOW_MAP_SIZE = 2048;
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(-1, 1.75, 1);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = SHADOW_MAP_SIZE;
    directionalLight.shadow.mapSize.height = SHADOW_MAP_SIZE;
    directionalLight.shadow.camera.far = 35000;
    directionalLight.shadow.bias = -0.0001;

    this.scene.add(directionalLight);
  }

  createEffects() {
    const resolution = this.getResolution();
    this.toonShader = createToonShader(resolution);
    const toonPass = new ShaderPass(this.toonShader);
    toonPass.renderToScreen = true;

    this.pp.addPass(toonPass);
  }


  draw() {
    this.stats.begin();

    this.floor.material = this.shadowMaterial;
    this.sphere.material = this.shadowMaterial;

    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(this.shadowBuffer);

    this.toonShader.uniforms.tShadow.value = this.shadowBuffer.texture;

    // this.floor.material = this.normalMaterial;
    // this.sphere.material = this.normalMaterial;

    // this.pp.render();
    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
