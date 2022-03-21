import * as THREE from 'three';

import { Layers } from './effectManager';
import utils from '../utils';
import frag from './shaders/shard.frag';
import vert from './shaders/shard.vert';

const minRadius = 25;
const maxRadius = 40;
const minRotationVelocity = 0.01;
const maxRotationVelocity = 0.03;
const minYVelocity = 0.01;
const maxYVelocity = 0.05;
const minAngleVelocity = 0.005;
const maxAngleVelocity = 0.03;

export default class Shard {
  constructor(pivotCoord) {
    this.minY = 0;
    this.maxY = 60;

    this.centerCoord = {
      x: pivotCoord.x,
      y: utils.randomFloatBetween(this.minY, this.maxY),
      z: pivotCoord.z,
    };

    this.radius = utils.randomFloatBetween(minRadius, maxRadius);
    this.angle = utils.randomFloatBetween(0, 2 * Math.PI);
    this.yVelocity = utils.randomFloatBetween(minYVelocity, maxYVelocity);
    this.angleVelocity = utils.randomFloatBetween(minAngleVelocity, maxAngleVelocity);
    this.rotateVelocity = utils.randomFloatBetween(minRotationVelocity, maxRotationVelocity);

   this.geometry = this.createShardGeometry(utils.randomFloatBetween(0.01, 0.04));
    this.material = new THREE.RawShaderMaterial({
     side: THREE.DoubleSide,
      uniforms: {},
      fragmentShader: frag,
      vertexShader: vert,
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.setPosition(this.getInitialCoord())
    this.pivot.doubleSide = true;
    this.pivot.rotation.y = Math.PI / 2;
    this.pivot.layers.enable(Layers.BLOOM);
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }

  createShardGeometry(size = 1) {
    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([
      -0.5, 0.5, 0.0,
      2.0, 2.0, 0.0,
      0.5, -0.5, 0.0,
      -2.0, -2.0, 0.0
    ]);

    const uvs = new Float32Array([
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ]);

    const indices = new Uint32Array([
      0, 2, 1, 0, 3, 2
    ]);

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

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
    this.pivot.rotation.x += this.rotateVelocity;
    this.pivot.rotation.y += this.rotateVelocity;
    this.pivot.rotation.z += this.rotateVelocity;
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
    if (
      this.centerCoord.y >= this.maxY ||
      this.centerCoord.y <= this.minY
    ) {
      this.yVelocity = -this.yVelocity;
    }
    this.centerCoord.y += this.yVelocity;
  }
  setPosition({ x, y, z }) {
    this.pivot.position.set(x, y, z);
  }
  setRotation() {

  }
};
