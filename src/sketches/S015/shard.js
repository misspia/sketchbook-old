import * as THREE from 'three';
import fragmentShader from './shard.frag';
import vertexShader from './shard.vert';

export default class Shard {
  constructor({

  }) {
    // const shardShape = new 
    this.geometry = new THREE.SphereGeometry(5, 5, 5);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffdddd,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
  createGeometry() {

  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
}
