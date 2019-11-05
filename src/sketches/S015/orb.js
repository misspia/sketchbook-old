import * as THREE from 'three';
import fragmentShader from './orb.frag';
import vertexShader from './orb.vert';

export default class Orb {
  constructor({

  }) {
    this.geometry = new THREE.SphereGeometry(5, 5, 5);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffdddd,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
}
