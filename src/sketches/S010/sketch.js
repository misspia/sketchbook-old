import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import glsl from 'glslify';

import frag from './fragment.glsl';
import vert from './vertex.glsl';
import utils from '../utils';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.cubeCamera = {};
    this.composer = {};

    this.diamond = {};
    this.sphere = {};
    this.material = {};
    this.geometry = {};

    this.amp = 6;
    this.ampIncrement = 0.1;
    this.maxAmp = 22;
    this.minAmp = 0;
  }

  unmount() {
    this.diamond.geometry.dispose();
    this.diamond.material.dispose();
    this.square.geometry.dispose();
    this.square.material.dispose();
    this.sphere.geometry.dispose();
    this.sphere.material.dispose();

    this.clearScene();
  }

  init() {
    this.disableOrbitControls();
    this.setClearColor(0x111111)
    this.setCameraPos(0, 0, -100);
    this.lookAt(0, 0, 0);

    this.createDiamond();
    this.createSquare();
    this.createSphere();
  }
  createDiamond() {
    const geometry = new THREE.BoxGeometry(90, 90, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffdadd,
    });
    this.diamond = new THREE.Mesh(geometry, material);
    this.diamond.receiveShadow = true;
    this.diamond.position.set(0, 0, 20);
    this.diamond.rotateZ(utils.toRadians(45));
    this.scene.add(this.diamond);
  }
  createSquare() {
    const geometry = new THREE.BoxGeometry(90, 90, 1);
    this.cubeCamera = new THREE.CubeCamera(1, 1000, 90);
    this.scene.add(this.cubeCamera);

    const material = new THREE.MeshBasicMaterial({
      envMap: this.cubeCamera.renderTarget,
    });
    this.square = new THREE.Mesh(geometry, material);
    this.square.receiveShadow = true;
    this.square.position.set(0, 0, 30);
    this.scene.add(this.square);
  }
  createSphere() {
    this.geometry = new THREE.IcosahedronGeometry(13, 5);
    this.material = new THREE.RawShaderMaterial({
      vertexShader: glsl(vert),
      fragmentShader: glsl(frag),
      uniforms: {
        u_time: { type: 'f', value: 0 },
        u_amp: { type: 'f', value: this.amp },
      },
    });

    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.sphere.castShadow = true;
    this.scene.add(this.sphere);
  }
  draw() {
    this.cubeCamera.position.copy(this.diamond.position); // "skip" reflecting the diamond
    this.cubeCamera.update(this.renderer, this.scene)
    this.renderer.render(this.scene, this.camera);

    if (this.amp >= this.maxAmp || this.amp <= this.minAmp) {
      this.ampIncrement = -this.ampIncrement;
    }
    this.amp += this.ampIncrement;

    /**
     * update uniforms
     */
    this.material.uniforms.u_time.value = this.getUTime();
    this.material.uniforms.u_amp.value = this.amp;

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
