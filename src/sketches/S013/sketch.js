import * as THREE from 'three';
import glsl from 'glslify';
import utils from '../utils';

import tileFrag from './tile.frag';
import tileVert from './tile.vert';


// https://codepen.io/alexandrejosephdev/pen/yVvqWr
// https://www.reddit.com/r/ImaginaryMindscapes/comments/aycnoj/reach_by_scott_uminga/

// https://codepen.io/noeldelgado/pen/QwWRwg?editors=0010

// https://www.pinterest.ca/pin/46795283613549106/
// https://www.pinterest.ca/pin/723390758873941202/

import SketchManagerThree from '../sketchManagerThree';

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);

    this.amp = 3;
    this.noise = new THREE.Vector3(1, 1, 1);
    this.tile = {};
  }
  unmount() {

  }
  init() {
    this.setCameraPos(0, 20, -25);
    this.lookAt(0, 0, 0);
    this.createTiles();
  }
  createTiles () {
    this.tile = this.createTile();
    this.scene.add(this.tile);
  }
  createTile () {
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.RawShaderMaterial({
      color: 0xddcccc,
      side: THREE.DoubleSide,
      fragmentShader: tileFrag,
      vertexShader: tileVert,
      uniforms: {
        u_time: { type: 'f', value: 0 },
        u_amp: { type: 'f', value: this.amp },
        u_noise: { type: 'v3', value: this.noise },
      }
    });
    const tile = new THREE.Mesh(geometry, material);
    return tile;
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    
    this.tile.material.uniforms.u_time.value = this.getUTime();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
