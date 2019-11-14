import * as THREE from 'three';
import Shard from './shard';

export default class Orb {
  constructor({
    radius = 0,
    numShards = 0,
  }) {
    this.radius = radius;
    this.numShards = numShards;

    this.shards = [];
    this.mesh = new THREE.Group();
    
    this.createShards();
  }
  createShards() {
    for(let i = 0; i < this.numShards; i++) {
      const shard = new Shard({});
      this.shards.push(shard);
      this.mesh.add(shard.mesh);
    }
  }
  update(frequencies) {
    this.shards.forEach((shard, index) => {
      shard.update(frequencies[index]);
    })
  }
}
