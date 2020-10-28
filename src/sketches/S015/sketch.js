import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import Leaf from './leaf';
import Tile from './tile';
import Orb from './orb';
import Shard from './shard';

import { Audio } from '../../themes';

class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);

    this.audioSrc = Audio.S015;
    // this.audioSrc = Audio.tester;
    this.numFrequencyNodes = 25;
    this.fftSize = 512;

    this.clock = new THREE.Clock();
    this.cameraPositionZ = -200;

    this.numLeaves = this.numFrequencyNodes;
    this.leaves = [];

    this.sphereRadius = 5;
    this.numNodes = 100;
    this.pillarNodes = [];

    this.numTiles = this.numFrequencyNodes;
    this.tiles = [];

    this.orb = {};
    this.numPoints = this.numFrequencyNodes;

    this.shards = [];
    this.numShards = this.numFrequencyNodes;
  }

  unmount() {
    this.audio.close();
    this.leaves.forEach(leaf => leaf.dispose());
    this.tiles.forEach(tile => tile.dispose());
    this.shards.forEach(shard => shard.dispose());
    this.orb.dispose();
    this.clearScene();
  }

  init() {
    this.disableOrbitControls();
    this.setCameraPos(0, 0, this.cameraPositionZ);

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
    this.createShards();

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
  createShards() {
    for(let i = 0; i < this.numShards; i++) {
      const shard = new Shard({
        minZ: this.cameraPositionZ * 1.2,
        maxZ: -this.cameraPositionZ * 1.2,
      });
      this.scene.add(shard.mesh);
      this.shards.push(shard);
    }
  }
  draw() {
    const time = this.clock.getElapsedTime();
    this.audio.getByteFrequencyData();
    this.audio.frequencyData.forEach((freq, index) => {
      this.tiles[index].update(freq);
      this.leaves[index].update(freq, time);
      this.shards[index].update(freq, time);
    });
    this.orb.update(this.audio.frequencyData, time);
    this.orb.update(this.audio.getAverageFrequency(), time);

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
