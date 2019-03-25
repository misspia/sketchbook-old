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
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.velocity = 0;
    this.direction = utils.randomBool() ? 1 : -1;
    this.velocityMultiplier = utils.randomFloatBetween(0.8, 1.2);

  }
  rotateZ(z) {
    this.mesh.rotation.z = z;
  }
  update(velocity) {
    this.velocity = velocity * this.direction * this.velocityMultiplier;
    this.mesh.rotation.z += this.velocity;
  }
}