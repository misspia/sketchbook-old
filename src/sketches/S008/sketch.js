import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';
import AudioNode from './node';
import utils from '../utils';

class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.geometry = {};
    this.material = {};
    // this.audioSrc = Audio.tester;
    this.audioSrc = Audio.S008;
    this.graph = new THREE.Group();
    this.fftSize = 512;

    this.layer0 = { nodes: [], group: new THREE.Group()};
    this.layer1 = { nodes: [], group: new THREE.Group()};
    this.layer2 = { nodes: [], group: new THREE.Group()};

    this.clock = new THREE.Clock();
  }
  unmount() {

  }
  init() {
    this.disableOrbitControls()
    this.setClearColor(0xf1ebeb);
    this.setCameraPos(-20, 50, 10);

    const audioConfig = { fftSize: this.fftSize };
    this.initAudio(audioConfig);

    this.initNodes();
  }
  initNodes() {
    const numNodes = this.audio.frequencyData.length;
    const width = Math.floor(Math.sqrt(numNodes));
    const nodeGapX = 5, nodeGapZ = 5, nodeGapY = 8;
    let x, z = -70;
    let y = 0

    for(let i = 0; i < numNodes; i ++) {
      if(i % width == 0) {
        x = 0;
        z += nodeGapZ;
      }
      this.createNode({ x, y: y, z }, this.layer0);
      this.createNode({ x, y: y + nodeGapY, z }, this.layer1);
      this.createNode({ x, y: y + nodeGapY * 2, z }, this.layer2);

      x += nodeGapX;
    }

    const graph = new THREE.Group();
    graph.add(this.layer0.group);
    graph.add(this.layer1.group);
    graph.add(this.layer2.group);

    this.lookAt(utils.getCenter(graph));
    this.scene.add(graph);
  }
  createNode(coord, layer) {
    const node = new AudioNode(coord);
    layer.group.add(node.mesh);
    layer.nodes.push(node);
  }
  updateNodes() {
    const time = this.clock.getElapsedTime();
    this.audio.frequencyData.forEach((freq, index) => {
      this.layer0.nodes[index].update(freq, time);
      this.layer1.nodes[index].update(freq, time);
      this.layer2.nodes[index].update(freq, time);
    })
  
  }
  draw() {
    this.audio.getByteFrequencyData();
    this.updateNodes();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
