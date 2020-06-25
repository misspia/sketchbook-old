import * as THREE from 'three';

export default class Pillar {
  constructor() {
    this.geometry = new THREE.CylinderGeometry(3, 3, 50, 50);
    this.material = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0,
      metalness: 0,
    });

    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.bbox = new THREE.Box3();
  }

  get position() {
    return this.pivot.position;
  }

  get height() {
    const { max, min } = this.bbox.setFromObject(this.pivot);
    return max.y - min.y;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }

  update() {

  }
}
