import * as THREE from 'three';

export default class Orb {
  constructor() {
    const geometry = new THREE.IcosahedronGeometry(5, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x3333ff });
    this.mesh = new THREE.Mesh(geometry, material);
  }
}