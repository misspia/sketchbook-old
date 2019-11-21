import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import Leaf from './leaf';
import Tile from './tile';
import Orb from './orb';
import Shards from './shards';

import { Audio } from '../../themes';

/**
 * https://www.pinterest.ca/misspialeung/abstract-3d/
 * 
 * https://codepen.io/ykob/pen/QjxBmq
 * https://www.pinterest.ca/pin/516295544779434530/
 * https://codepen.io/ykob/pen/qbwLaY?editors=1010
 * 
 */
class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    
    this.audioSrc = Audio.tester;
    this.numFrequencyNodes = 25;
    this.fftSize = 512;

    this.clock = new THREE.Clock();

    this.numLeaves = this.numFrequencyNodes;
    this.leaves = [];

    this.sphereRadius = 5;
    this.numNodes = 100;
    this.pillarNodes = [];

    this.numTiles = this.numFrequencyNodes;
    this.tiles = [];

    this.orb = {};
    this.numPoints = this.numFrequencyNodes / 2;
  }
  unmount() {

  }
  init() {
    this.createStats();

    this.setCameraPos(0, 0, -150);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xffffff);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);

    this.createTiles();
    this.createLeaves();
    this.createOrb();
  }
  createLeaves() {
    const radius = 50;
    let angle = 0;
    const angleIncrement = 2 * Math.PI / this.numLeaves;
    for (let i = 0; i < this.numLeaves; i++) {
      const leaf = new Leaf({ 
        radius,
        angle,
      });
      this.leaves.push(leaf);
      this.scene.add(leaf.mesh);

      angle += angleIncrement;
    }
  }
  createTiles() {
    const width = 30;
    const radius = 80;
    let angle = 0;
    const angleIncrement = 2* Math.PI / this.numTiles;
    for(let i = 0; i < this.numTiles; i++) {
      const tile = new Tile({
        width,
        radius,
        angle,
      });
      this.tiles.push(tile);
      this.scene.add(tile.mesh);

      angle += angleIncrement;
    }
  }
  createOrb() {
    this.orb = new Orb({
      numPoints: this.numPoints,
      numFrequencyNodes: this.numFrequencyNodes,
    });
    this.scene.add(this.orb.mesh);
  }
  draw() {
    this.stats.begin();

    const time = this.clock.getElapsedTime();
    this.audio.getByteFrequencyData();
    this.audio.frequencyData.forEach((freq, index) => {
      this.tiles[index].update(freq);
      this.leaves[index].update(freq, time);
    });
    // this.orb.update(this.audio.frequencyData, time);
    this.orb.update(this.audio.getAverageFrequency(), time);
    
    this.renderer.render(this.scene, this.camera);

    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
