import * as THREE from 'three';

import utils from '../utils';
import frag from './petal.frag';
import vert from './petal.vert';

const minRadius = 23;
const maxRadius = 35;
const minVelocity = 0.006;
const maxVelocity = 0.02;

export default class Petal {
  constructor(pivotCoord) {
    this.minY = -25;
    this.maxY = 10;

    this.centerCoord = {
      x: pivotCoord.x,
      y: utils.randomFloatBetween(this.minY, this.maxY),
      z: pivotCoord.z,
    };

    this.radius = utils.randomFloatBetween(minRadius, maxRadius);
    this.angle = utils.randomFloatBetween(0, 2 * Math.PI);
    this.yVelocity = utils.randomFloatBetween(minVelocity, maxVelocity);
    this.angleVelocity = utils.randomFloatBetween(minVelocity, maxVelocity);
    this.rotateVelocity = utils.randomFloatBetween(minVelocity, maxVelocity);

    this.geometry = this.createPetalGeometry(utils.randomFloatBetween(0.01, 0.04));
    this.material = new THREE.RawShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        viewVector: { type: 'v3', value: new THREE.Vector3() }
      },
      fragmentShader: frag,
      vertexShader: vert,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.setPosition(this.getInitialCoord())
    this.mesh.doubleSide = true;
    this.mesh.rotation.y = Math.PI / 2;
  }
  createPetalGeometry(size = 1) {
    var heartShape = new THREE.Shape();
    heartShape.moveTo( 25, 25 );
    heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
    heartShape.bezierCurveTo( -30, 0, -30, 35, -30, 35 );
    heartShape.bezierCurveTo( -30, 55, -10, 77, 25, 95 );
    heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
    heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
    heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

    var extrudeSettings = {
      amount: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 15,
      bevelThickness: 0.1
    };
    const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
    geometry.scale(size, size, size);

    return geometry;
  }
  getInitialCoord() {
    const { x, y, z } = this.centerCoord;
    return {
      x: x + this.radius * Math.cos(this.angle),
      y,
      z: z + this.radius * Math.sin(this.angle),
    }
  }
  update() {
    this.updateRotation();
    this.updatePosition();
  }
  updateRotation() {
    this.mesh.rotation.x += this.rotateVelocity;
    this.mesh.rotation.y += this.rotateVelocity;
    this.mesh.rotation.z += this.rotateVelocity;
  }
  updatePosition() {
    this.incrementCenterY();
    this.angle += this.angleVelocity;

    const { x, y, z } = this.centerCoord;
    const coord = {
      x: x + this.radius * Math.cos(this.angle),
      y,
      z: z + this.radius * Math.sin(this.angle),
    };
    this.setPosition(coord);
  }
  // refactor
  incrementCenterY() {
    if(
      this.centerCoord.y >= this.maxY ||
      this.centerCoord.y <= this.minY
    ) {
      this.yVelocity = -this.yVelocity;
    }
    this.centerCoord.y += this.yVelocity;
  }
  setPosition({ x, y, z }) {
    this.mesh.position.set(x, y, z);
  }
  setRotation() {

  }
};