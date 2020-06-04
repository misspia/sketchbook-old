import * as THREE from 'three';

import utils from '../utils';
import fragmentShader from './shaders/cloud.frag';
import vertexShader from './shaders/cloud.vert';


// https://tympanus.net/codrops/2020/01/28/how-to-create-procedural-clouds-using-three-js-sprites/
// https://github.com/dghez/THREEJS_Procedural-clouds/blob/c836e00be15dc92a36cbaf11453f754e1dbcaed0/src/js/components/Canvas/Environment/Cloud/index.js
export default class Cloud {
  constructor({
    shapeTexture,
    noiseTexture,
    centerCoord = new THREE.Vector3(),
  }) {
    this.minY = -50;
    this.maxY = -30;

    this.centerCoord = new THREE.Vector3(
      centerCoord.x,
      utils.randomFloatBetween(this.minY / 2, this.maxY),
      centerCoord.z,
    );

    this.minRadius = utils.randomFloatBetween(25, 40);
    this.maxRadius = utils.randomFloatBetween(60, 80);
    this.radius = 0;
    this.updateRadius();

    this.angle = utils.randomFloatBetween(0, 2 * Math.PI);
    this.angleVelocity = utils.randomFloatBetween(0.001, 0.005);
    this.yVelocity = utils.randomFloatBetween(0.01, 0.04);

    const size = utils.randomFloatBetween(50, 90);
    const geometry = new THREE.PlaneGeometry(size, size, size * 3, size * 3);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        ...THREE.UniformsUtils.clone(THREE.ShaderLib.sprite.uniforms),
        uTime: { value: 0 },
        uTxtShape: { value: shapeTexture },
        uTxtCloudNoise: { value: noiseTexture },
        uFac1: { value: utils.randomFloatBetween(15, 18) },
        uFac2: { value: utils.randomFloatBetween(2, 7) },
        uTimeFactor1: { value: utils.randomFloatBetween(0.0001, 0.005) },
        uTimeFactor2: { value: utils.randomFloatBetween(0.0001, 0.003) },
        uDisplStrenght1: { value: utils.randomFloatBetween(0.01, 0.05) },
        uDisplStrenght2: { value: utils.randomFloatBetween(0.001, 0.15) },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
    this.pivot = new THREE.Mesh(geometry, this.material);
    this.updatePostion();
  }

  get position() {
    return this.pivot.position;
  }

  updateRadius() {
    this.radius = utils.remap(this.minY, this.maxY, this.minRadius, this.maxRadius, this.centerCoord.y);
  }
  updatePostion() {
    this.position.x = this.centerCoord.x + this.radius * Math.cos(this.angle);
    this.position.z = this.centerCoord.z + this.radius * Math.sin(this.angle);

    this.centerCoord.y += this.yVelocity;
    this.position.y = this.centerCoord.y;
  }

  update(uTime) {
    this.material.uniforms.uTime.value = uTime;

    this.angle += this.angleVelocity;
    if(this.position.y > this.maxY || this.position.y < this.minY) {
      this.yVelocity = -this.yVelocity;
    }
    this.updateRadius();
    this.updatePostion();
  }
}
