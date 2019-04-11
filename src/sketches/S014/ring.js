import * as THREE from 'three';
import utils from '../utils';

export default class Ring {
  constructor(customConfig) {
    const config = {
      radius: 10, 
      tube: 1,
      radialSegments: 8,
      tubularSegments: 15,
      arc: Math.PI * 2,
      color: 0x000000,
      wireframe: false,
      ...customConfig
    }
    const geometry = new THREE.TorusGeometry(
      config.radius,
      config.tube,
      config.radialSegments,
      config.tubularSegments,
      config.arc
    );
    const material = new THREE.MeshBasicMaterial({
      color: config.color,
      wireframe: config.wireframe,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = utils.toRadians(90);
    this.velocity = 0;
    this.direction = utils.randomBool() ? 1 : -1;
    this.minVelocity = 0;
    this.maxVelocity = utils.randomFloatBetween(0.05, 0.15);

  }
  getRadius() {
    console.log(this.mesh.geometry.boundingSphere.radius)
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
  rotateZ(z) {
    this.mesh.rotation.z = z;
  }
  update(frequency) {
    const velocity = utils.remap(0, 255, this.minVelocity, this.maxVelocity, frequency);
    this.velocity = velocity * this.direction;
    this.mesh.rotation.z += this.velocity;
  }
}