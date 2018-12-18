import * as THREE from 'three';

export default class Node {
  constructor(coord) {
    this.geometry = new THREE.BoxGeometry(2, 2, 2);
    this.material = new THREE.MeshBasicMaterial({ color: 0xeeaadd });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    const { x, y, z } = coord;
    this.mesh.position.set(x, y, z);
  }

}