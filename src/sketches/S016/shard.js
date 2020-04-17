import * as THREE from 'three';
import utils from '../utils';

export default class Shard {
  constructor() {
    this.pivot = new THREE.Group();
    this.topShard = {};
    this.bottomShard = {};
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    this.createShardComponents();
  }

  createShardComponents() {
    const height = 1.5;
    const geometry = new THREE.ConeBufferGeometry(1, height, 4);

    this.topShard = new THREE.Mesh(geometry, this.material);
    this.bottomShard = new THREE.Mesh(geometry, this.material);
    this.bottomShard.position.y -= height;
    this.bottomShard.rotation.z += utils.toRadians(180);


    this.pivot.add(this.topShard);
    this.pivot.add(this.bottomShard);
  }


}
