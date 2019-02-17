import * as THREE from 'three';
import glsl from 'glslify';
import utils from '../utils';

import frag from './plane.frag';
import vert from './plane.vert';

import SketchManagerThree from '../sketchManagerThree';

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.plane = {};
  }
  unmount() {

  }
  init() {
    this.setCameraPos(0, 0, -30);
    this.lookAt(0, 0, 0);
    this.createPlane();
  }
  createPlane() {
    const geometry = new THREE.PlaneGeometry(20, 20, 20, 20);
    const material = new THREE.MeshBasicMaterial({
      color: 0xddcccc,
      side: THREE.DoubleSide,
    });
    this.plane = new THREE.Mesh(geometry, material);
    this.scene.add(this.plane);
    console.log(this.plane.geometry)
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
