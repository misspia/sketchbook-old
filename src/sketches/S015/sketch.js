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
  constructor(canvas) {
    super(canvas);
    this.clock = new THREE.Clock();

    this.numLeaves = 100;
    this.leaves = [];

    this.sphereRadius = 80;
    this.numNodes = 100;
    this.pillarNodes = [];

    this.numTiles = 16;
    this.tiles = [];
  }
  unmount() {

  }
  init() {
    this.createStats();

    this.setCameraPos(-32, 74, -77);
    this.lookAt(0, 0, 0);
    this.setClearColor(0x222222);

    this.createTiles();
    // this.createLeaves();
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
    let x = 0;
    let y = 0;
    let z = 0;

    const width = 4;
    const incrementX = 20;
    const incrementZ = 20;

    for(let i = 0; i < this.numTiles; i++) {
      if(i % width === 0) {
        x = 0;
        z += incrementZ;
      }
      const tile = new Tile();
      tile.setPosition(x, y, z);

      this.tiles.push(tile);
      this.scene.add(tile.mesh);

      x += incrementX;
    }
  }
  draw() {
    this.stats.begin();

    
    this.renderer.render(this.scene, this.camera);
    
    // const time = this.clock.getElapsedTime();
    // this.leaves.forEach(leaf => leaf.update(time));

    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
