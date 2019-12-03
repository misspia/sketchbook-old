import * as THREE from 'three';
import Shard from './shard';

export default class Shards {
  constructor({
    numShards = 0,
  }) {
    this.numShards = numShards;
    this.shards = [];

    this.mesh = new THREE.Group();
    
    this.createShards();
  }
  createShards() {
    for(let i = 0; i < this.numShards; i++) {
      const shard = new Shard({});
      this.mesh.add(shard.mesh);
      this.shards.push(shard);
    }
  }
  update(frequencies, time) {

  }
}
