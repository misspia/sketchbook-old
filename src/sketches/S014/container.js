import * as THREE from 'three';

export default class Container {
  constructor() {
    this.geometry = new THREE.BoxGeometry(30, 30, 30);
    this.material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.innerBounds = this.getInnerBounds(0.9);
  }
  getInnerBounds(percentFilled) {
    const { min, max } = new THREE.Box3().setFromObject(this.mesh);
    return {
      minX: min.x * percentFilled,
      maxX: max.x * percentFilled,
      minY: min.y * percentFilled,
      maxY: max.y * percentFilled,
      minZ: min.z * percentFilled,
      maxZ: max.z * percentFilled,
    }
  }
}