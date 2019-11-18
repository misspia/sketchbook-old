import * as THREE from 'three';
import utils from '../utils';
import fragmentShader from './shard.frag';
import vertexShader from './shard.vert';

export default class Shard {
  constructor({

  }) {
    this.incrementSign = utils.randomSign();
    this.minAngleIncrement = utils.randomFloatBetween(
      utils.toRadians(0.0),
      utils.toRadians(0.0),
    );
    this.maxAngleIncrement = utils.randomFloatBetween(
      utils.toRadians(1.0),
      utils.toRadians(2),
    );

    const size = utils.randomFloatBetween(0.1, 0.3);
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
  // createGeometry(size = 1) {
  //   const triangle = new THREE.Geometry();
  //   triangle.vertices.push(
  //     new THREE.Vector3(0, 0, 0),
  //     new THREE.Vector3(10 * size, 0, 0),
  //     new THREE.Vector3(10 * size, 10 * size, 0),
  //   );
  //   triangle.faces.push(new THREE.Face3(0, 1, 2));
  //   triangle.computeFaceNormals();
  //   return triangle;
  // }

  createGeometry(size = 1) {
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(25, 50, -25, 50, 0, 0);

    const extrudeSettings = {
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 15,
      bevelThickness: 0.5
    };
    const geometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
    geometry.scale(size, size, size);

    return geometry;
  }
  
  getRandomAngle() {
    return utils.randomFloatBetween(0, 2 * Math.PI);
  }
  remap(min1, max1, min2, max2, value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
  }
  frequencyToAngleIncrement(freq) {
    return this.remap(0, 255, this.minAngleIncrement, this.maxAngleIncrement, freq);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
  update(freq, time) {
    this.material.uniforms.u_freq.value = freq;
    this.material.uniforms.u_time.value = time;
    // this.material.uniforms.u_rotation.value.x += this.frequencyToAngleIncrement(freq);
    this.material.uniforms.u_rotation.value.y += this.incrementSign * this.frequencyToAngleIncrement(freq);
    this.material.uniforms.u_rotation.value.z += this.incrementSign * this.frequencyToAngleIncrement(freq);
  }
}
