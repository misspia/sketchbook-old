import * as THREE from 'three';
import utils from '../utils';

export default class Shard {
  constructor(environment) {
    this.environment = environment;
    this.pivot = new THREE.Group();
    this.topShard = {};
    this.bottomShard = {};
    this.material = {};

    this.createShardMaterial();
    this.createShardGeometry();
  }

  createShardGeometry() {
    const height = 1.5;
    const geometry = new THREE.ConeBufferGeometry(1, height, 4);

    this.topShard = new THREE.Mesh(geometry, this.material);
    this.bottomShard = new THREE.Mesh(geometry, this.material);
    this.bottomShard.position.y -= height;
    this.bottomShard.rotation.z += utils.toRadians(180);
    this.bottomShard.rotation.y -= utils.toRadians(90);


    this.pivot.add(this.topShard);
    this.pivot.add(this.bottomShard);
  }

  createShardMaterial() {
    const glassParams = {
      metalness: 0.1,
      roughness: 0,
      opacity: 0.8,
      transparent: true,
      premultipliedAlpha: true,
      envMap: this.environment.envMap,
      side: THREE.DoubleSide,
      sheen: new THREE.Color(0xffffff).convertGammaToLinear(2.2),
      color: new THREE.Color(0xffffff).convertGammaToLinear(2.2),
      refractionRatio: 1.0 / 1.6,
    };
    this.material = new THREE.MeshPhysicalMaterial(glassParams);
  }

}
