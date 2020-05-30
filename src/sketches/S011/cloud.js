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

    const geometry = new THREE.PlaneGeometry(3, 3, 15, 15);
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
        uTimeFactor1: { value: 0.002 },
        uTimeFactor2: { value: 0.0015 },
        uDisplStrenght1: { value: 0.04 },
        uDisplStrenght2: { value: 0.08 },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
    this.pivot = new THREE.Mesh(geometry, this.material);
  }

  update(noiseTexture, shapeTexture, uTime) {
    this.material.uniforms.uTxtCloudNoise.value = noiseTexture;
    this.material.uniforms.uTxtShape.value = shapeTexture;
    this.material.uniforms.uTime.value = uTime;

  }
}
