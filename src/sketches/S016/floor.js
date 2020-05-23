import * as THREE from 'three';
import Tile from './tile';
import FloorBack from './floorBack';
import utils from '../utils';

export default class Floor {
  constructor(context, { size = 1, divisions = 1 }) {
    this.context = context;
    this.spectrumStart = context.spectrumStart;

    this.tileBorderWidth = 0.05;
    this.size = size;
    this.divisions = divisions;
    this.tiles = [];

    this.floorBack = new FloorBack(size);

    this.pivot = new THREE.Group();
    this.pivot.add(this.floorBack.pivot)
    this.createTiles();
  }

  get position() {
    return this.pivot.position;
  }

  createTiles() {
    const { bass, midrange, highrange } = this.spectrumStart;
    const tilesPerRow = this.divisions;
    const numTiles = Math.pow(this.divisions, 2);
    const borderWidth = 0.02;
    const tileSize = this.size / this.divisions - borderWidth;

    const xStart = this.floorBack.min.x + tileSize / 2;
    const zStart = this.floorBack.min.z + tileSize / 2;
    let x = xStart;
    let z = zStart;

    const xIncrement = tileSize + borderWidth;
    const zIncrement = tileSize + borderWidth;

    for(let i = 1; i <= numTiles; i++) {
      let isActive = utils.weightedRandomBool(0.1);
      const freqIndex = isActive ? utils.randomIntBetween(midrange, highrange) : -1;
      const tile = new Tile(tileSize, freqIndex);

      tile.position.set(x, 0, z);
      tile.realignY();

      this.tiles.push(tile);
      this.pivot.add(tile.pivot);

      if(i % tilesPerRow === 0) {
        x = xStart;
        z += zIncrement;
      } else {
        x += xIncrement;
      }
    }
  }

  update() {
    this.tiles.forEach(tile => {
      const freq = tile.freqIndex === -1 ? 0 : this.context.audio.frequencyData[tile.freqIndex];
      tile.update(freq);
    });
  }
}
