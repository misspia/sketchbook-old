import * as THREE from 'three';
import vert from './vertex.glsl';
import frag from './fragment.glsl';
import SketchManagerThree from '../sketchManagerThree.js';
import { Audio } from '../../themes/themes.js';
import AudioNode from './node.js';
import utils from '../utils.js';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.geometry = {};
    this.material = {};
    this.audioFileName = Audio.tester;
    this.graph = [];
    this.fftSize = 512;
    this.nodeGap = 5;
  }
  init() {
    this.setClearColor(0xf1ebeb);
    this.setCameraPos(-20, 60, 20);

    const audioConfig = { fftSize: this.fftSize };
    this.initAudio(this.audioFileName, audioConfig);
    this.initNodes();
  }
  initNodes() {
    let group = new THREE.Group();

    const numNodes = this.fftSize / 2;
    const width = Math.floor(Math.sqrt(numNodes));
    let x, z = -70;

    for(let i = 0; i < numNodes; i ++) {
      if(i % width == 0) {
        x = 0;
        z += this.nodeGap;
      }
      const coord = { x, y: 0, z };
      const node = new AudioNode(coord);
      this.graph.push(node);
      group.add(node.mesh);
      x += this.nodeGap;
    }
    this.lookAt(utils.getCenter(group));
    this.scene.add(group);
  }
  updateNodes() {
    this.graph.forEach((node, index) => {
      const freq = this.audio.data[index];
      node.update(freq);
    })
  }
  draw() {
    this.audio.getFrequencyData();
    this.updateNodes();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
