import * as THREE from 'three';

export default class Feather {
  constructor({
    color
  }) {
    const geometry = this.createFeatherGeometry(0.01);
    this.material = new THREE.MeshBasicMaterial({
      color
    });

    this.pivot = new THREE.Mesh(geometry, this.material);
  }

  get position() {
    return this.pivot.position;
  }

  createFeatherGeometry(size = 1) {
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(20, 100, -20, 100);

    const extrudeSettings = {
      amount: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 5,
      bevelThickness: 0.5
    };
    const geometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
    geometry.scale(size, size, size);

    return geometry;
  }
}
