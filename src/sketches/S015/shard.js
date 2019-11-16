import * as THREE from 'three';
import utils from '../utils';
import fragmentShader from './shard.frag';
import vertexShader from './shard.vert';

export default class Shard {
  constructor({

  }) {
    const size = utils.randomFloatBetween(0.9, 1.4);
    this.geometry = this.createGeometry(size);

    const rotation = new THREE.Vector3(
      this.getRandomAngle(),
      this.getRandomAngle(),
      this.getRandomAngle(),
    );
    this.material = new THREE.RawShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      fragmentShader,
      vertexShader,
      uniforms: {
        u_freq: { type: 'f', value: 0 },
        u_time: { type: 'f', value: 0 },
        u_rotation: { type: 'v3', value: rotation },
      }
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
  createGeometry(size = 1) {
    const triangle = new THREE.Geometry();
    triangle.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(10 * size, 0, 0),
      new THREE.Vector3(10 * size, 10 * size, 0),
    );
    triangle.faces.push(new THREE.Face3(0, 1, 2));
    triangle.computeFaceNormals();
    return triangle;
  }
  getRandomAngle() {
    return utils.randomFloatBetween(0, 2 * Math.PI);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
  update(freq, time) {
    this.material.uniforms.u_freq.value = freq;
    this.material.uniforms.u_time.value = time;
  }
}
