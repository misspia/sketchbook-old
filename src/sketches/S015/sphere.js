import * as THREE from 'three';
import utils from '../utils';
import vert from './sphere.vert';
import frag from './sphere.frag';

export default class Sphere {
  constructor() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    this.mesh = new THREE.Mesh(geometry, material);
  }
  update(frequency) {
    const scale = utils.remap(0, 255, 1, 5, frequency);
    this.mesh.scale.set(scale, scale, scale);
  }
}