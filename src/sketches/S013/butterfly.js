import * as THREE from 'three';
import utils from '../utils';

export default class Butterfly {
  constructor(cameraDistance, pivotCoord) {
    this.dimension = cameraDistance;
    this.minY = -cameraDistance * 5;
    this.maxY = this.dimension * 1.5;
    this.minWingAngle = utils.toRadians(20);
    this.maxWingAngle = utils.toRadians(140);

    this.velocity = utils.randomFloatBetween(1, 1.2);
    this.wingVelocity = 0.35;
    this.angleVelocity = utils.randomFloatBetween(0.05, 0.1);
    this.rotateVelocityX = utils.randomFloatBetween(0.01, 0.05);
    this.rotateVelocityY = utils.randomFloatBetween(0.001, 0.03);
    this.rotateVelocityZ = utils.randomFloatBetween(0.01, 0.05);

    this.centerCoord = {
      ...pivotCoord,
      y: this.minY / 2,
    };
    this.radius = utils.randomFloatBetween(
      this.dimension * 0.15,
      this.dimension * 0.35
    );
    this.angle = utils.randomFloatBetween(0, 2 * Math.PI);

    const wingGeometry = this.createWingGeometry(utils.randomFloatBetween(0.1, 0.5));

    this.material = new THREE.MeshBasicMaterial({
      color:0x0000ff,
      side: THREE.DoubleSide,
    });

    this.leftWing = new THREE.Mesh(wingGeometry, this.material);
    this.rightWing = new THREE.Mesh(wingGeometry, this.material);
    this.leftWing.rotation.x += utils.toRadians(-45);
    this.rightWing.rotation.x += utils.toRadians(45);

    this.group = new THREE.Group();
    this.group.add(this.leftWing);
    this.group.add(this.rightWing);
    this.updatePosition();
  }

  dispose() {
    this.leftWing.geometry.dispose();
    this.leftWing.material.dispose();
    this.rightWing.geometry.dispose();
    this.rightWing.material.dispose();
  }

  createWingGeometry(scale = 1) {
    const triangle = new THREE.Geometry();
    triangle.vertices.push(
      new THREE.Vector3(-10, 10, 0),
      new THREE.Vector3(-10, -10, 0),
      new THREE.Vector3(10, -10, 0),
    );
    triangle.faces.push(new THREE.Face3(0, 1, 2));
    triangle.computeBoundingSphere();
    /**
     * change pivot point
     */
    triangle.applyMatrix( new THREE.Matrix4().makeTranslation(-10, 10, 0));
    triangle.scale(scale, scale, scale);
    return triangle;
  }
  updatePosition() {
    const { x, y, z } = this.centerCoord;
    const newX =  x + this.radius * Math.cos(this.angle);
    const newZ = z + this.radius * Math.sin(this.angle);

    this.group.position.set(newX, y, newZ);
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
  update() {
    this.group.rotation.x += this.rotateVelocityX;
    this.group.rotation.y += this.rotateVelocityY;
    this.group.rotation.z += this.rotateVelocityZ;

    this.centerCoord.y += this.velocity;
    if(this.centerCoord.y > this.maxY) {
      this.centerCoord.y = this.minY;
    }
    this.angle += this.angleVelocity;
    this.updatePosition();
    this.updateWings();
  }
}
