import * as THREE from 'three';
import utils from '../utils';
import { RGBAIntegerFormat } from 'three';

export default class Wing {
  constructor() {
    this.pivot = new THREE.Group();

    this.base = {};


    this.createBase();

    this.pivot.add(this.base);
  }

  get position() {
    return this.pivot.position;
  }

  createBase() {
    const points = new Array(10).fill(0).map((_el, index) => (
      new THREE.Vector2(Math.sin(index * 0.2) * 10 + 5, (index - 5) * 2)
    ));
    const geometry = new THREE.LatheGeometry(points, 2, 0, 3.7);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    this.base = new THREE.Mesh(geometry, material);

    const scale = 0.08;
    this.base.scale.set(scale, scale, scale)
    this.base.rotation.y += utils.toRadians(180);
    this.base.rotation.z += utils.toRadians(90);
  }
}
