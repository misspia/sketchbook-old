import * as THREE from 'three';

export default class CameraManager {
  constructor(context) {
    this.context = context;
    this.camera = context.camera;

    this.radius = 16;
    this.angleVelocity = -0.001;
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

  update() {
    this.angle += this.angleVelocity;

    this.updatePosition();
    this.camera.lookAt(this.target);
  }
}
