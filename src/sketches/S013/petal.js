import * as THREE from 'three';
import utils from '../utils';

import frag from './petal.frag';
import vert from './petal.vert';

export default class Petal {
  constructor(cameraDistance, pivotCoord) {
    const palette = [
      0xffbbbb,
      0xff3333,
      0xeeddaa,
    ];
    this.minY = -cameraDistance * 1.2;
    this.maxY = cameraDistance * 1.2;
    this.dimension = cameraDistance;

    this.centerCoord = {
      ...pivotCoord,
      y: this.maxY,
    };
    this.radius = utils.randomFloatBetween(
      this.dimension * 0.7,
      this.dimension
    );
    this.angle = utils.randomFloatBetween(0, 2 * Math.PI);

    this.angleVelocity = utils.randomFloatBetween(0.005, 0.015);
    this.velocity = utils.randomFloatBetween(0.5, 1.5);
    this.rotateVelocityX = utils.randomFloatBetween(0.002, 0.05);
    this.rotateVelocityY = utils.randomFloatBetween(0.005, 0.05);
    this.rotateVelocityZ = utils.randomFloatBetween(0.002, 0.05);

    this.geometry = this.createPetalGeometry(utils.randomFloatBetween(0.05, 0.08));
    this.geometry.center();

    const paletteIndex = utils.randomIntBetween(0, palette.length - 1);
    const color = palette[paletteIndex];
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        u_color: { type: 'v3', value: new THREE.Color(color) },
      },
      fragmentShader: frag,
      vertexShader: vert,
      side: THREE.DoubleSide,
    });
    
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;
    this.updatePosition();
  }
  createPetalGeometry(size = 1) {
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(50, 100, -50, 100, 0, 0);

    const extrudeSettings = {
      amount: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 15,
      bevelThickness: 0.5
    };
    const geometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
    geometry.scale(size, size, size);

    return geometry;
  }
  updatePosition() {
    const { x, y, z } = this.centerCoord;
    const newX =  x + this.radius * Math.cos(this.angle);
    const newZ = z + this.radius * Math.sin(this.angle);
    
    this.mesh.position.set(newX, y, newZ);
  }
  update() { 
    this.mesh.rotation.x += this.rotateVelocityX;
    this.mesh.rotation.y += this.rotateVelocityY;
    this.mesh.rotation.z += this.rotateVelocityZ;

    this.centerCoord.y -= this.velocity;
    if(this.centerCoord.y < this.minY) {
      this.centerCoord.y = this.maxY;
    }
    this.angle += this.angleVelocity;
    this.updatePosition();
  }
}