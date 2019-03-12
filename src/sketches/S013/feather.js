import * as THREE from 'three';
import utils from '../utils';

export default class Feather {
  constructor(cameraDistance) {
    const palette = [
      0xbbeebb,
      0xbbbbff,
      0xffbbbb,
      0xffffbb,
    ];

    this.velocity = utils.randomFloatBetween(0.03, 0.3);
    this.rotateVelocityX = utils.randomFloatBetween(0.002, 0.05);
    this.rotateVelocityY = utils.randomFloatBetween(0.005, 0.05);
    this.rotateVelocityZ = utils.randomFloatBetween(0.002, 0.05);

    this.minY = -cameraDistance * 1.2;
    this.maxY = cameraDistance * 1.2;
    this.dimension = cameraDistance;

    this.geometry = this.createFeatherGeometry(utils.randomFloatBetween(0.01, 0.07));
    this.geometry.center();

    const paletteIndex = utils.randomIntBetween(0, palette.length - 1);
    this.material = new THREE.MeshBasicMaterial({
      color: palette[paletteIndex]
    });
    
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = utils.randomFloatBetween(-this.dimension, this.dimension);
    this.mesh.position.y = utils.randomFloatBetween(-this.dimension, this.dimension);
    this.mesh.position.z = utils.randomFloatBetween(-this.dimension, this.dimension);
  }
  createFeatherGeometry(size = 1) {
    var featherShape = new THREE.Shape();
    featherShape.moveTo(0, 0);

    // // butterflies
    // featherShape.bezierCurveTo(-50, 60, -10, 180, 0, 0);
    // featherShape.bezierCurveTo(180, 35, 80, 0, 50, 0);

    // feather/petal
    featherShape.bezierCurveTo(50, 100, -50, 100, 0, 0);

    var extrudeSettings = {
      amount: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 15,
      bevelThickness: 0.5
    };
    const geometry = new THREE.ExtrudeGeometry(featherShape, extrudeSettings);
    geometry.scale(size, size, size);

    return geometry;
  }
  update() {
    // if(this.mesh.position.y > this.maxY || this.mesh.position.y < this.minY) {
    //   this.velocity = -this.velocity;
    // }
    this.mesh.rotation.x += this.rotateVelocityX;
    this.mesh.rotation.y += this.rotateVelocityY;
    this.mesh.rotation.z += this.rotateVelocityZ;

    this.mesh.position.y -= this.velocity;
    if(this.mesh.position.y < this.minY) {
      this.mesh.position.y = this.maxY;
    }
  }
}