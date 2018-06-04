import * as THREE from 'three';
import vert from './vertex.glsl';
import frag from './fragment.glsl';
import SketchManagerThree from '../sketchManagerThree.js';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.tunnel = {};
    this.geometry = {};
    this.material = {};
    this.spotLight = {};
    this.ambientLight = {};
  }
  init() {
    this.setClearColor(0xf1ebeb);
    this.createTunnel();
  }
  createTunnel() {
    let points = [];
    for(let i = 0; i < 5; i += 1) {
      points.push(new THREE.Vector3(0, 0, 2.5 * (i / 4)));
    }
    const curve = new THREE.CatmullRomCurve3(points);

    const geometry = new THREE.TubeGeometry(curve, 70, 0.02, 50, false);
    const material = new THREE.MeshStandardMaterial({
      side: THREE.BackSide,
      color: 0x00ff00,
    });
    const tube = new THREE.Mesh(geometry, material);
    this.scene.add(tube);
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
