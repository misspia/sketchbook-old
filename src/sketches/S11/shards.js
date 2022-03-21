import * as THREE from 'three';
import Shard from './shard';

export default class Shards {
  constructor({
    num = 10,
  }) {
    this.numShards = num;

    this.shards = [];
    this.pivot = new THREE.Group();

    this.createPetals();
  }

  dispose() {
    this.shards.forEach(shard => shard.dispose());
  }

  createPetals() {
    for(let i = 0; i < this.numShards; i++) {
      const shard = new Shard({x: 0, y: 0, z: 0});
      this.shards.push(shard);
      this.pivot.add(shard.pivot);
    }
  }
  update() {
    this.shards.forEach(shard => shard.update());
  }
}
