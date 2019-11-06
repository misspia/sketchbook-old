import * as THREE from 'three';
import fragmentShader from './tile.frag';
import vertexShader from './tile.vert';

export default class Tile {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(20, 20, 2, 2);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x += Math.PI / 2;
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
  update() {

  }
}
