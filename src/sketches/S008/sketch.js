import * as THREE from 'three';
import vert from './vertex.glsl';
import frag from './fragment.glsl';
import SketchManagerThree from '../sketchManagerThree.js';
import '../spotify.js';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.geometry = {};
    this.material = {};

  }
  init() {
    this.setClearColor(0xf1ebeb);
    this.createCenterPiece();
  }
  createCenterPiece() {
    this.geometry = new THREE.IcosahedronGeometry(1, 2);
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        u_time: { type: 'f', value: 0 },
      }
    });
    const sphere = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(sphere);
  }
  draw() {
    this.material.uniforms.u_time.value = this.getUTime();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
