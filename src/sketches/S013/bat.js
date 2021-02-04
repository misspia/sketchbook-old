import * as THREE from 'three';
import utils from '../utils';

export default class Bat {
  constructor() {
    this.progressX = 0;
    this.progressY = 0;
    this.progressZ = 0;

    this.progressVelocityX = utils.randomFloatBetween(0.004, 0.007);
    this.progressVelocityY = utils.randomFloatBetween(0.006, 0.009);
    this.progressVelocityZ = utils.randomFloatBetween(0.004, 0.007);

    this.signX = utils.randomBool() ? 1 : -1;
    this.signY = utils.weightedRandomBool(0.1) ? 1 : -1;
    this.signZ = 1;

    this.startX = 0;
    this.endX = utils.randomFloatBetween(2, 11);

    this.startY = 0;
    this.endY = utils.randomFloatBetween(5, 50);

    this.startZ = 0;
    this.endZ = 150;

    this.startWingAngle = utils.toRadians(0);
    this.endWingAngle = utils.toRadians(80);
    this.wingVelocity = utils.randomFloatBetween(0.2, 0.5);

    this.rightWing = {};
    this.leftWing = {};
    this.geometry = new THREE.Geometry();

    this.material = new THREE.MeshBasicMaterial({
      color: 0xffaaff,
      side: THREE.DoubleSide,
    });

    this.pivot = new THREE.Group();
    this.createGeometry();
    this.pivot.rotation.y = Math.PI / 2;

  }

  get position() {
    return this.pivot.position;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }

  createWingGeometry(scale = 1) {
    const triangle = new THREE.Geometry();
    triangle.vertices.push(
      new THREE.Vector3(-1, 1, 0),
      new THREE.Vector3(-1, -1, 0),
      new THREE.Vector3(1, -1, 0),
    );
    triangle.faces.push(new THREE.Face3(0, 1, 2));
    triangle.computeBoundingSphere();
    /**
     * change pivot point
     */
    triangle.applyMatrix4( new THREE.Matrix4().makeTranslation(-1, 1, 0));
    triangle.scale(scale, scale, scale);
    return triangle;
  }
  createGeometry() {
    const wingGeometry = this.createWingGeometry(1);

    this.rightWing = new THREE.Mesh(wingGeometry, this.material);
    this.leftWing = new THREE.Mesh(wingGeometry, this.material);

    this.leftWing = new THREE.Mesh(wingGeometry, this.material);
    this.rightWing = new THREE.Mesh(wingGeometry, this.material);

    this.leftWing.rotation.x += utils.toRadians(-45);
    this.rightWing.rotation.x += utils.toRadians(45);

    this.pivot.add(this.rightWing);
    this.pivot.add(this.leftWing);
  }

  updateWings() {
    if(
      this.rightWing.rotation.x > this.maxWingAngle ||
      this.rightWing.rotation.x < this.minWingAngle
    ) {
      this.wingVelocity = -this.wingVelocity;
    }
      this.leftWing.rotation.x -= this.wingVelocity;
      this.rightWing.rotation.x += this.wingVelocity;
  }

  getXPos() {
    return this.signX * utils.remap(0, 1, this.startX, this.endX, this.progressX);
  }

  getYPos() {
    return this.signY * utils.remap(0, 1, this.startY, this.endY, this.progressY);
  }

  getZPos() {
    return this.signZ * utils.remap(0, 1, this.startZ, this.endZ, this.progressZ);
  }

  update() {
    if(this.progressX < 1) {
      this.progressX += this.progressVelocityX;
    }
    if(this.progressY < 1) {
      this.progressY += this.progressVelocityY;
    }
    if(this.progressZ < 1) {
      this.progressZ += this.progressVelocityZ;
    }


    if(this.progressX >= 1 && this.progressY >= 1 && this.progressZ >= 1) {
      this.progressX = 0;
      this.progressY = 0;
      this.progressZ = 0;
    }

    this.updateWings();

    this.position.x = this.getXPos();
    this.position.y = this.getYPos();
    this.position.z = this.getZPos();
  }
}
