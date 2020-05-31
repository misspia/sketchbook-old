import * as THREE from 'three';

import utils from '../utils';
import frag from './shaders/petal.frag';
import vert from './shaders/petal.vert';

const minRadius = 23;
const maxRadius = 35;
const minVelocity = 0.006;
const maxVelocity = 0.02;

/**
 * color palette:
 * https://www.pinterest.ca/pin/666603182331068421/
 */
const palettes = [
  new THREE.Vector3(0.97, 0.97, 0.97), // #f8f8f8
  new THREE.Vector3(0.94, 0.91, 0.93), // #f8f8f8
  new THREE.Vector3(0.24, 0.88, 0.89), // #3ee1e3
  new THREE.Vector3(0.49, 0.8, 0.94), // #7dcdef
  new THREE.Vector3(0.92, 0.83, 0.74), // #ead3bc
  new THREE.Vector3(0.9, 0.74, 0.92), // #e6bdea
  new THREE.Vector3(0.92, 0.93, 0.82), // #eaeed1
  new THREE.Vector3(0.81, 0.95, 0.67), // #f3eed1
];

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

    const paletteIndex = utils.randomIntBetween(0, palettes.length - 1);
    const palette = palettes[paletteIndex];

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
      depth: 1,
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
