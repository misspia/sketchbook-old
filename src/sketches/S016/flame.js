import * as THREE from 'three';
import utils from '../utils';

export default class Flame {
  constructor() {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
  }

  scale(multiplier) {
    this.mesh.scale.set(multiplier, multiplier, multiplier);
  }
  update(freq) {
    const multiplier = utils.remap(0, 255, 0.5, 1, freq);
    this.scale(multiplier);
  }
}
