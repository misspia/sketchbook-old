import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import SimplexNoise from 'simplex-noise';

import fragmentShader from './fragment.glsl';
import vertexShader from './vertex.glsl';
import utils from '../utils';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);

    this.composer = {};

    this.diamond = {};
    this.sphere = {};
    this.material = {};
    this.geometry = {};

    this.noise = new SimplexNoise();
    this.clock = new THREE.Clock();

    this.amp = 6;
    this.ampIncrement = 0.1;
    this.maxAmp = 12;
    this.minAmp = -5;
  }
  unmount() {

  }
  init() {
    this.setClearColor(0x0f0f0f)
    this.setCameraPos(0, 0, -100);
    this.lookAt(0, 0, 0);
    
    this.createDiamond();
    this.createSphere();
  }
  createDiamond() {
    const geometry = new THREE.BoxGeometry(90, 90, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xeedddd,
      side: THREE.BackSide,
    });
    this.diamond = new THREE.Mesh(geometry, material);
    this.diamond.receiveShadow = true;
    this.diamond.position.set(0,0, 20);
    this.diamond.rotateZ(utils.toRadians(45));
    this.scene.add(this.diamond);
  }
  createSphere() {
    this.geometry = new THREE.IcosahedronGeometry(12, 4);
    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { type: 'f', value: 0 },
      },
    });

    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.sphere.castShadow = true;

    this.scene.add(this.sphere);
  }
  disruptSphere() {
    this.sphere.geometry.vertices.forEach((vertex, index) => {
      const offset = this.sphere.geometry.parameters.radius;
      const time = Date.now();
      vertex.normalize();

      const distance = offset + this.noise.noise3D(
        vertex.x + time * 0.0007,
        vertex.y + time * 0.0008,
        vertex.z + time * 0.0009,
      ) * this.amp;

      vertex.multiplyScalar(distance);
    });
    this.sphere.geometry.verticesNeedUpdate = true;
    this.sphere.geometry.normalsNeedUpdate = true;
    this.sphere.geometry.computeVertexNormals();
    this.sphere.geometry.computeFaceNormals();

  }
  draw() {
    this.renderer.render(this.scene, this.camera);

    if(this.amp >= this.maxAmp || this.amp <= this.minAmp) {
      this.ampIncrement = -this.ampIncrement;
    }
    this.amp += this.ampIncrement;

    this.disruptSphere();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;


