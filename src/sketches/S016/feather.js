import * as THREE from 'three';

export default class Feather {
  constructor({
    color,
    velocityRotateX,
    velocityRotateY,
    velocityRotateZ,
    velocityTranslateX,
    velocityTranslateY,
    velocityTranslateZ,
    minX,
    minY,
    minZ,
    maxX,
    maxY,
    maxZ,
  }) {
    this.color = color || 0xffffff;
    this.velocityRotateX = velocityRotateX || 0.1;
    this.velocityRotateY = velocityRotateY || 0.1;
    this.velocityRotateZ = velocityRotateZ || 0.1;
    this.velocityTranslateX = velocityTranslateX || 0.1;
    this.velocityTranslateY = velocityTranslateY || 0.1;
    this.velocityTranslateZ = velocityTranslateZ || 0.1;
    this.minX = minX || 0;
    this.minY = minY || 0;
    this.minZ = minZ || 0;
    this.maxX = maxX || 1;
    this.maxY = maxY || 1;
    this.maxZ = maxZ || 1;

    const geometry = this.createFeatherGeometry(0.005);
    this.material = new THREE.MeshBasicMaterial({
      color: this.color,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.pivot = new THREE.Group();

    this.pivot.add(this.mesh);

    const bbox = new THREE.Box3().setFromObject(this.mesh);
    this.mesh.position.y -= (bbox.max.y + bbox.min.y) / 2;
  }

  get position() {
    return this.pivot.position;
  }

  get rotation() {
    return this.pivot.rotation;
  }

  get opacity() {
    return this.material.opacity;
  }

  set opacity(value) {
    this.material.opacity = value;
    // console.debug(this.material.opacity)
  }

  createFeatherGeometry(size = 1) {
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(20, 100, -20, 100);

    const extrudeSettings = {
      depth: 1,
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

  update() {

  }
}
