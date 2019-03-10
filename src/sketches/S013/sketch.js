import * as THREE from 'three';
import glsl from 'glslify';

import Line from './line';

// https://codepen.io/alexandrejosephdev/pen/yVvqWr
// https://github.com/spite/ccapture.js
// https://www.reddit.com/r/ImaginaryMindscapes/comments/aycnoj/reach_by_scott_uminga/
// https://github.com/spite/polygon-shredder/blob/master/js/Simulation.js

// https://codepen.io/noeldelgado/pen/QwWRwg?editors=0010


import SketchManagerThree from '../sketchManagerThree';

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);

    this.amp = 3;
    this.noise = new THREE.Vector3(1, 1, 1);
    this.tile = {};
    this.lines = [];
  }
  unmount() {

  }
  init() {
    this.setCameraPos(0, 20, -55);
    this.lookAt(0, 0, 0);
    this.createLines();
  }
  createLines() {
    for(let i = 0; i < 10; i ++) {
      const line = new Line();

      this.scene.add(line.mesh);
      this.lines.push(line);

    }
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    
    this.lines.forEach(line => line.update());

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
