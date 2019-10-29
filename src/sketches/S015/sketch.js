import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import Leaf from './leaf';
import PillarNode from './pillarNode';
import { Audio } from '../../themes/themes';

/**
 * https://twitter.com/felixfaire/status/979094649653612544
 * 
 */
class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.clock = new THREE.Clock();
    this.numFrequencyNodes = 100;
    this.fftSize = 512;

    this.numLeaves = 100;
    this.leaves = [];

    this.sphereRadius = 80;
    this.numNodes = 100;
    this.pillarNodes = [];
    this.audioSrc = Audio.tester;
  }
  unmount() {

  }
  init() {
    this.createStats();

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    this.audio.volume(1);

    this.setCameraPos(-32, 74, -77);
    this.lookAt(0, 0, 0);
    this.setClearColor(0x222222);

    this.createLeaves();
    this.createPillar();

  }
  createLeaves() {
    for(let i = 0; i < this.numLeaves; i++) {
      const leaf = new Leaf();
      this.leaves.push(leaf);
      this.scene.add(leaf.mesh);
    }
  }
  createPillar() {
    const cylinderGeometry = new THREE.CylinderGeometry(18, 25, 80, 10, 5);
    cylinderGeometry.vertices.forEach(vertex => {
      const node = new PillarNode();

      const { x, y, z } = vertex;
      node.setPosition(x, y, z);
      
      this.scene.add(node.mesh);
      this.pillarNodes.push(node);
    })
  }
  draw() {
    this.stats.begin();

    const time = this.clock.getElapsedTime();

    this.audio.getByteFrequencyData();
    this.audio.frequencyData.forEach((frequency, index) => {
      this.leaves[index].update(time, frequency);
    });

    this.renderer.render(this.scene, this.camera);

    this.leaves.forEach(leaf => leaf.update(time));
   
    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
