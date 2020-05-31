import * as THREE from 'three';

import fragmentShader from './shaders/cloud.frag';
import vertexShader from './shaders/cloud.vert';


// https://tympanus.net/codrops/2020/01/28/how-to-create-procedural-clouds-using-three-js-sprites/
// https://github.com/dghez/THREEJS_Procedural-clouds/blob/c836e00be15dc92a36cbaf11453f754e1dbcaed0/src/js/components/Canvas/Environment/Cloud/index.js
export default class Cloud {
  constructor({
    shapeTexture,
    noiseTexture,
  }) {

    const size = 20;
    const geometry = new THREE.PlaneGeometry(size, size, size * 3, size * 3);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        ...THREE.UniformsUtils.clone(THREE.ShaderLib.sprite.uniforms),
        uTime: { value: 0 },
        uTxtShape: { value: shapeTexture },
        uTxtCloudNoise: { value: noiseTexture },
        uFac1: { value: 17.8 },
        uFac2: { value: 2.7 },
        uTimeFactor1: { value: 0.2 },
        uTimeFactor2: { value: 0.15 },
        uDisplStrenght1: { value: 0.04 },
        uDisplStrenght2: { value: 0.08 },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
    this.pivot = new THREE.Mesh(geometry, this.material);
  }

  update(uTime) {
    this.material.uniforms.uTime.value = uTime;

  }
}
