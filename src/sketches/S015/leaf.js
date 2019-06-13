import * as THREE from 'three';
import frag from './leaf.frag'; 
import vert from './leaf.vert'; 

export default class Leaf {
  constructor() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
  }
  update() {

  }
}