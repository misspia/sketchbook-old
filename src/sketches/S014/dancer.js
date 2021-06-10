import * as THREE from 'three';

export default class Dancer {
  constructor() {
    this.geometry = new THREE.SphereGeometry(1, 20, 20);
    this.material = new THREE.MeshBasicMaterial({ color: 0xeeeeee })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  update() {
    
  }
}
