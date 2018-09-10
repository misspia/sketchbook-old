import * as THREE from 'three';
import vert from './vertex.glsl';
import frag from './fragment.glsl';
import SketchManagerThree from '../sketchManagerThree.js';
import { Audio } from '../../themes/themes.js';
import Node from './node.js';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.geometry = {};
    this.material = {};
    this.audioFileName = Audio.tester;
    this.nodes = [];

  }
  init() {
    this.setClearColor(0xf1ebeb);
    this.createCenterPiece();
    this.initAudio(this.audioFileName);
  }
  // add to group and remove this.nodes
  initNodes() {
    this.audio.data.forEach((node, index) => {
      // this.nodes.push(new Node());
      this.scene.add(new Node());
    })
  }

  updateNodes() {
    this.nodes.forEach((node, index) => {
      const freq = this.audio.data[index];
    })
  }
  createCenterPiece() {
    this.geometry = new THREE.SphereGeometry(1, 1);
    console.log('num vertices ---', this.geometry.vertices.length)
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
    this.audio.getFrequencyData();
    this.updateNodes();
    this.material.uniforms.u_time.value = this.getUTime();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
