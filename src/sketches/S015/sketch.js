import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import Leaf from './leaf';
import PillarNode from './pillarNode';
import Tile from './tile';

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
  }
  unmount() {

  }
  init() {
    this.createStats();

    this.setCameraPos(-40, 80, -70);
    this.lookAt(0, 0, 0);
    this.setClearColor(0x222222);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);

    this.createTiles();
    this.createLeaves();
    // this.createPillar();

  }
  createLeaves() {
    for (let i = 0; i < this.numLeaves; i++) {
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
  createTiles() {
    const width = 30;
    const tilesPerRow = Math.sqrt(this.numTiles);
    const incrementX = width;
    const incrementZ = width;
    
    const coordReset = -width * (tilesPerRow - 1) / 2; 
    let x = coordReset;
    let y = 0;
    let z = coordReset;
    

    for(let i = 0; i < this.numTiles; i++) {
      if(i % tilesPerRow === 0) {
        x = coordReset;
        z += incrementZ;
      }
      const tile = new Tile({ width });
      tile.setPosition(x, y, z);

      this.tiles.push(tile);
      this.scene.add(tile.mesh);

      x += incrementX;
    }
  }
  draw() {
    this.stats.begin();

    const time = this.clock.getElapsedTime();
    this.audio.getByteFrequencyData();
    this.audio.frequencyData.forEach((freq, index) => {
      this.tiles[index].update(freq);
      this.leaves[index].update(freq, time);
    });
    
    this.renderer.render(this.scene, this.camera);
    

    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
