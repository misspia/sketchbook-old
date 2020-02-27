import * as THREE from 'three';
import utils from '../utils';

const MorphIndex = {
  SPHERE: 0,
  TWIST: 1,
  TORUS: 2,
};

export default class Morph {
  constructor() {
    this.cubePositions = [];
    this.spherePositions = [];
    this.twistPositions = [];
    this.torusPositions = [];

    const geometry = this.createGeometry();
    const material = new THREE.MeshNormalMaterial({
      flatShading: true,
      morphTargets: true
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.set(0.5, 0.5, 0.5);
  }

  createGeometry() {

    const geometry = new THREE.BoxBufferGeometry(2, 2, 2, 32, 32, 32);
    const torusGeometry = new THREE.TorusBufferGeometry(2, 2, 80, 80);

    geometry.morphAttributes.position = [];
    const positions = geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {

      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      this.pushSpherePosition(x, y, z);
      this.pushTwistPosition(x, y, z);
      this.pushTorusPosition(torusGeometry.attributes.position.array, i, i + 1, i + 2);

    }
    geometry.morphAttributes.position[MorphIndex.SPHERE] = new THREE.Float32BufferAttribute(this.spherePositions, 3);
    geometry.morphAttributes.position[MorphIndex.TWIST] = new THREE.Float32BufferAttribute(this.twistPositions, 3);
    geometry.morphAttributes.position[MorphIndex.TORUS] = new THREE.Float32BufferAttribute(this.torusPositions, 3);

    return geometry;
  }
  pushTwistPosition(x, y, z) {
    const direction = new THREE.Vector3(0, 0, 1).normalize();
    const vertex = new THREE.Vector3();

    vertex.set(x, y, z * 2);
    vertex.applyAxisAngle(direction, Math.PI * z / 2).toArray(this.twistPositions, this.twistPositions.length);
  }
  pushSpherePosition(x, y, z) {
    this.spherePositions.push(
      x * Math.sqrt(1 - (y * y / 2) - (z * z / 2) + (y * y * z * z / 3)),
      y * Math.sqrt(1 - (z * z / 2) - (x * x / 2) + (z * z * x * x / 3)) * 0.7,
      z * Math.sqrt(1 - (x * x / 2) - (y * y / 2) + (x * x * y * y / 3))
    );
  }
  pushTorusPosition(positions, x, y, z) {
    this.torusPositions.push(
      positions[x],
      positions[y],
      positions[z],
    );
  }
  remapFreq(min, max, freq) {
    return utils.remap(0, 255, min, max, freq);
  }

  update(freq) {
    this.mesh.morphTargetInfluences[MorphIndex.SPHERE] = 1 - this.remapFreq(0, 0.2, freq);
    this.mesh.morphTargetInfluences[MorphIndex.TWIST] = this.remapFreq(0, 1, freq);
  }
}
