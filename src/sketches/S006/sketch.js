import * as THREE from 'three';
import vert from './vertex.glsl'
import frag from './fragment.glsl'
import SketchManagerThree from '../sketchManagerThree.js'

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.startTime = Date.now();
  }
  init() {
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({color: 0xffff00});
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
