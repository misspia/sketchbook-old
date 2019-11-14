import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import Leaf from './leaf';
import Tile from './tile';
import Orb from './orb';

import { Audio } from '../../themes';

/**
 * https://www.pinterest.ca/misspialeung/abstract-3d/
 * https://www.pinterest.ca/pin/663858801302520810/?nic=1a&sender=516295682189999701
 * https://www.pinterest.ca/pin/516295544779692812/?nic=1a&sender=516295682189999701
 * https://www.pinterest.ca/pin/516295544781803742/?nic=1a&sender=516295682189999701
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

    this.sphereRadius = 80;
    this.numNodes = 100;
    this.pillarNodes = [];

    this.numTiles = this.numFrequencyNodes;
    this.tiles = [];

    this.orb = {};
    this.numOrbShards = this.numFrequencyNodes;
  }
  unmount() {

  }
  init() {
    this.createStats();

    this.setCameraPos(0, 0, -150);
    this.lookAt(0, 0, 0);
    this.setClearColor(0x222222);

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
      radius: 30,
      numShards: this.numOrbShards,
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
    this.orb.update(this.audio.frequencyData);
    
    this.renderer.render(this.scene, this.camera);

    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
