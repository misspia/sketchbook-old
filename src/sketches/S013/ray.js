import  * as THREE from 'three';
import utils from '../utils';

import frag from './ray.frag';
import vert from './ray.vert';

export default class Line  {
  constructor(cameraDistance, pivotCoord) {
    const palette = [
      0xdddddd,
      0xaaaaaa,
      0x555555,
    ];
    this.velocity = utils.randomFloatBetween(0.1, 1);
    this.rotateVeocityY = 0.02;

    const height = utils.randomFloatBetween(50, 70)
    this.dimension = cameraDistance;
    this.minY = -this.dimension - height;
    this.maxY = this.dimension + height;

    this.geometry = new THREE.BoxGeometry(2, height, 2);

    const paletteIndex = utils.randomIntBetween(0, palette.length - 1);
    const color = palette[paletteIndex];
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        u_color: { type: 'v3', value: new THREE.Color(color) },
      },
      fragmentShader: frag,
      vertexShader: vert,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;

    this.centerCoord = {
      x: pivotCoord.x,
      y: utils.randomFloatBetween(-this.dimension, this.dimension),
      z: pivotCoord.z,
    };
    const { x, y, z } = this.getInitialCoord();
    this.mesh.position.set(x, y, z);
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }

  getInitialCoord() {
    const { x, y, z } = this.centerCoord;
    const radius = utils.randomFloatBetween(this.dimension * 0.7, this.dimension);
    const angle = utils.randomFloatBetween(0, 2 * Math.PI);
    return {
      x: x + radius * Math.cos(angle),
      y,
      z: z + radius * Math.sin(angle),
    }
  }
  update() {
    this.mesh.position.y -= this.velocity;
    this.mesh.rotation.y += this.rotateVeocityY;

    if(this.mesh.position.y < this.minY) {
      /**
       * reset position
       */
      const { x, z }  = this.getInitialCoord();
      this.mesh.position.x = x;
      this.mesh.position.z = z;
      this.mesh.position.y = this.maxY;
    }
  }
}
