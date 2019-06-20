import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import Sphere from './sphere';
import Leaf from './leaf';

/**
 * https://twitter.com/felixfaire/status/979094649653612544
 */
class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.spheres = [];

    this.clock = new THREE.Clock();
    this.numLeaves = 100;
    this.leaves = [];
  }
  unmount() {

  }
  init() {
    this.createStats();

    this.setCameraPos(-32, 74, -77);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xddddff);

    this.createLeaves();

  }
  createLeaves() {
    for(let i = 0; i < this.numLeaves; i++) {
      const leaf = new Leaf();
      this.leaves.push(leaf);
      this.scene.add(leaf.mesh);
    }
  }
  draw() {
    this.stats.begin();

    this.renderer.render(this.scene, this.camera);

    const time = this.clock.getElapsedTime();
    this.leaves.forEach(leaf => leaf.update(time));
   
    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;