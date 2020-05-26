import * as THREE from 'three';
import utils from '../utils';

export default class CameraManager {
  constructor(context) {
    this.context = context;
    this.camera = context.camera;

    this.radius = 18;
    this.angleVelocity = -0.001;
    this.minAngleVelocity = -0.0005;
    this.maxAngleVelocity = -0.0025;
    this.angle = 0;

    this.centerCoord = new THREE.Vector3(0, 8, 0);
    this.target = new THREE.Vector3();
  }

  get position() {
    return this.camera.position;
  }

  updatePosition() {
    this.position.set(
      this.centerCoord.x + this.radius * Math.cos(this.angle),
      this.centerCoord.y,
      this.centerCoord.z + this.radius * Math.sin(this.angle),
    );
  }

  getAngleVelocity() {
    const { overallAverages } = this.context.beatManager;
    return utils.remap(
      0, 255,
      this.minAngleVelocity, this.maxAngleVelocity,
      overallAverages[overallAverages.length - 1],
    );
  }

  update() {
    this.angle += this.getAngleVelocity();

    this.updatePosition();
    this.camera.lookAt(this.target);
  }
}
