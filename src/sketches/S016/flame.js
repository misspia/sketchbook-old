import * as THREE from 'three';
import utils from '../utils';

// https://threejs.org/examples/?q=morp#webgl_buffergeometry_morphtargets
export default class Flame {
  constructor() {
    this.spherePositions = [];
    this.cubePositions = [];
    this.twistPositions = [];

    const geometry = this.createGeometry();

    const material = new THREE.MeshNormalMaterial({
      color: 0xff0000,
      flatShading: true,
      morphTargets: true
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.set(0.5, 0.5, 0.5);
  }

  createGeometry() {

    const geometry = new THREE.BoxBufferGeometry(2, 2, 2, 32, 32, 32);

    geometry.morphAttributes.position = [];
    const positions = geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {

      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      this.pushSpherePosition(x, y, z);
      this.pushTwistPosition(x, y, z);

    }
    geometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(this.spherePositions, 3);
    geometry.morphAttributes.position[1] = new THREE.Float32BufferAttribute(this.twistPositions, 3);

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
  remapFreq(min, max, freq) {
    return utils.remap(0, 255, min, max, freq);
  }

  update(freq) {
    this.mesh.morphTargetInfluences[1] = this.remapFreq(0, 1, freq);
    this.mesh.morphTargetInfluences[0] = 1 - this.remapFreq(0, 0.5, freq);
  }
}
