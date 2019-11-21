import * as THREE from 'three';
import utils from '../utils';

import { Images } from '../../themes';
import fragmentShader from './particle.frag';
import vertexShader from './particle.vert';

// https://codepen.io/ykob/pen/QjxBmq?editors=1010
// line 371

// https://medium.com/@joshmarinacci/threejs-particles-556b37b20c41
// https://html5gamedevelopment.com/how-to-create-a-particle-system-in-three-js/
export default class Orb {
  constructor({
    numPoints = 0,
    numFrequencyNodes = 0,
  }) {
    this.numPoints = numPoints;
    this.particles = [];
    this.geometry = new THREE.Geometry();
    this.createParticles();

    const texture = new THREE.TextureLoader().load(Images.T015);
    const translateSpeed = new THREE.Vector3(
      utils.randomFloatBetween(0.01, 0.1),
      utils.randomFloatBetween(0.01, 0.1),
      utils.randomFloatBetween(0.01, 0.1),
    );

    this.material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        u_freq: { type: 'f', value: 0.0 },
        u_time: { type: 'f', value: 0.0 },
        u_texture: { type: 't', value: texture },
        u_translate_speed: { type: 'v3', value: translateSpeed },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.SubtractiveBlending,
    })

    this.mesh = new THREE.Points(this.geometry, this.material);
  }
  createParticles() {
    for(let i = 0; i < this.numPoints; i++) {
      const particle = {
        position: new THREE.Vector3(
          utils.randomFloatBetween(-10, 10),
          utils.randomFloatBetween(-10, 10),
          utils.randomFloatBetween(-10, 10),
        ),
        velocity: new THREE.Vector3(
          utils.randomFloatBetween(-0.1, 0.1),
          0.6,
          utils.randomFloatBetween(-0.1, 0.1),
        ),
        acceleration: new THREE.Vector3(0, -0.001, 0),
      };
      this.particles.push(particle);
      this.geometry.vertices.push(particle.position);
    }
  }
  update(avgFreq, time) {
    this.material.uniforms.u_freq.value = avgFreq; 
    this.material.uniforms.u_time.value = time; 
  }
}

