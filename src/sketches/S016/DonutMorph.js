import * as THREE from 'three';
import utils from '../utils';

const MorphIndex = {
  TWIST: 0,
  SPHERE: 1,
  TORUS: 2,
};

export default class DonutMorph {
  constructor() {
    this.twistPositions = [];

    const geometry = this.createGeometry();
    const material = new THREE.MeshNormalMaterial({
      flatShading: true,
      morphTargets: true
    });

    this.mesh = new THREE.Mesh(geometry, material);
  }

  setRotation(x, y, z) {
    this.mesh.rotation.set(x, y, z);
  }
  createGeometry() {

    const geometry = new THREE.TorusBufferGeometry(2, 1, 32, 32);

    geometry.morphAttributes.position = [];
    const positions = geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {

      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      this.pushTwistPosition(x, y, z);

    }
    geometry.morphAttributes.position[MorphIndex.TWIST] = new THREE.Float32BufferAttribute(this.twistPositions, 3);

    return geometry;
  }
  pushTwistPosition(x, y, z) {
    const direction = new THREE.Vector3(0, 0, 1).normalize();
    const vertex = new THREE.Vector3();

    vertex.set(x, y, z * 4);
    vertex.applyAxisAngle(direction, Math.PI * z / 2).toArray(this.twistPositions, this.twistPositions.length);
  }
  remapFreq(min, max, freq) {
    return utils.remap(0, 255, min, max, freq);
  }

  update(beat, freqs) {
    this.mesh.morphTargetInfluences[MorphIndex.TWIST] = this.remapFreq(0, 1, beat);
  }
}
