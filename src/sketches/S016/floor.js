import * as THREE from 'three';
import Tile from './tile';
import utils from '../utils';

export default class Floor {
  constructor({ size = 1, divisions = 1 }) {
    this.size = size;
    this.divisions = divisions;
    this.tiles = [];

    this.floor = {};

    this.pivot = new THREE.Group();
    this.createFloor();
    this.createTiles();
  }

  get position() {
    return this.pivot.position;
  }

  createFloor() {
    const geometry = new THREE.PlaneGeometry(
      this.size,
      this.size,
      this.divisions,
      this.divisions
    );
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
    });
    this.floor = new THREE.Mesh(geometry, material);
    this.floor.rotation.x += utils.toRadians(90);
    this.pivot.add(this.floor);
  }

  createTiles() {
    const tilesPerRow = this.divisions;
    const numTiles = Math.pow(this.divisions, 2);
    const borderWidth = 0.1;
    const totalTilesWidth = this.size - borderWidth * 2;
    const tileSize = totalTilesWidth / this.divisions - borderWidth;

    const floorBbox = new THREE.Box3().setFromObject(this.floor);
    const xStart = floorBbox.min.x + tileSize / 2 + borderWidth;
    const zStart = floorBbox.min.z + tileSize / 2 + borderWidth;
    let x = xStart;
    let y = 0.1;
    let z = zStart;

    const xIncrement = tileSize + borderWidth;
    const zIncrement = tileSize + borderWidth;

    for(let i = 1; i <= numTiles; i++) {
      const tile = new Tile(tileSize);

      tile.position.set(x, y, z);

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
    this.tiles.forEach(tile => tile.update());
  }

}
