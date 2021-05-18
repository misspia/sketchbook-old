import * as THREE from 'three';
import fragmentShader from './shaders/wall.frag';
import vertexShader from './shaders/wall.vert';
import utils from '../utils'

export default class Wall {
  constructor(context) {
    this.context = context;
    this.beatManager = context.beatManager;

    this.geometry = new THREE.PlaneGeometry(10, 10, 1, 1)
    this.material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        u_time: { value: 0 },
        u_freq: { value: 0 },
        u_amp: { value: new THREE.Vector3(0.5, 1, 0.2) },
      },
      transparent: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  get position() {
    return this.mesh.position;
  }

  get uniforms() {
    return this.material.uniforms;
  }

  mapAmpX() {
    // console.debug(this.beatManager.latestBassAverage)
    const amp = utils.remapFreq(0, 1, this.beatManager.latestBassAverage)
    return amp;
  }

  update(time) {
    this.uniforms.u_time.value = time;
    this.uniforms.u_amp.value.x = this.mapAmpX();
  }
}
