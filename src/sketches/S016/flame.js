import * as THREE from 'three';
import utils from '../utils';

// https://threejs.org/examples/?q=morp#webgl_buffergeometry_morphtargets
export default class Flame {
  constructor() {
    this.spherePositions = [];
    this.cubePositions = [];
    this.twistPositions = [];

    // const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const geometry = this.createGeometry();
    // const material = new THREE.MeshNormalMaterial({
    const material = new THREE.MeshPhongMaterial({
      morphTargets: true,
      flatShading: true,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.morphTargetInfluences[0] = 0.3;
  }

  createGeometry() {
    const boxGeometry = new THREE.BoxBufferGeometry(2, 2, 2, 32, 32, 32);
    boxGeometry.morphAttributes.positions = [];
    this.cubePositions = boxGeometry.attributes.position.array;

    const direction = new THREE.Vector3(1, 0, 0).normalize();
    const vertex = new THREE.Vector3();

    for (let i = 0; i < this.cubePositions.length; i += 3) {
      const x = this.cubePositions[i];
      const y = this.cubePositions[i + 1];
      const z = this.cubePositions[i + 2];

      this.spherePositions.push(
        x * Math.sqrt(1 - (y * y / 2) - (z * z / 2) + (y * y * z * z / 2)),
        y * Math.sqrt(1 - (z * z / 2) - (x * x / 2) + (x * x * z * z / 2)),
        z * Math.sqrt(1 - (x * x / 2) - (y * y / 2) + (x * x * y * y / 2)),
      );

      vertex.set(x * 2, y, z);
      vertex
        .applyAxisAngle(direction, Math.PI * x / 2)
        .toArray(this.twistPositions, this.twistPositions.length);
    }
    boxGeometry.morphAttributes.positions[0] = new THREE.Float32BufferAttribute(this.spherePositions, 3);
    boxGeometry.morphAttributes.positions[1] = new THREE.Float32BufferAttribute(this.twistPositions, 3);

    return boxGeometry;
  }
  scale(multiplier) {
    this.mesh.scale.set(multiplier, multiplier, multiplier);
  }
  update(freq) {
    const multiplier = utils.remap(0, 255, 0.5, 1, freq);
    const morph = utils.remap(0, 255, 0, 1, freq);
    // this.scale(multiplier);
    this.mesh.morphTargetInfluences[1] = morph;
  }
}
