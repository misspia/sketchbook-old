import * as THREE from 'three';
import vert from './vertex.glsl';
import frag from './fragment.glsl';
import SketchManagerThree from '../sketchManagerThree.js';
import { Audio } from '../../themes/themes.js';
import AudioNode from './node.js';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.geometry = {};
    this.material = {};
    this.audioFileName = Audio.tester;
    this.graph = {};
    this.fftSize = 64;
  }
  init() {
    this.setClearColor(0xf1ebeb);
    this.createCenterPiece();
    this.initAudio(this.audioFileName);
    this.initNodes();
  }
  initNodes() {
    const numNodes = Math.sqrt(this.fftSize);
    this.graph = new THREE.Group();
    for(let i = 0; i < numNodes; i ++) {
      this.graph.add(new AudioNode());
    }
    this.scene.add(this.graph);
  }
  updateNodes() {
    // this.nodes.forEach((node, index) => {
    //   const freq = this.audio.data[index];
    //   this.scene.add(new AudioNode());
    // })
  }
  createCenterPiece() {
    this.geometry = new THREE.SphereGeometry(1, 1);
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        u_time: { type: 'f', value: 0 },
      }
    });
    const sphere = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(sphere);
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
