import * as THREE from 'three';
import utils from '../utils';

import { Images } from '../../themes';
import fragmentShader from './orb.frag';
import vertexShader from './orb.vert';

export default class Orb {
  constructor({
    numPoints = 0,
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
    const maxScreenDimmension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    const minSize = utils.randomFloatBetween(0.01, 0.05) * maxScreenDimmension;
    const maxSize = utils.randomFloatBetween(0.1, 0.15) * maxScreenDimmension;

    this.material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        u_freq: { type: 'f', value: 0.0 },
        u_time: { type: 'f', value: 0.0 },
        u_texture: { type: 't', value: texture },
        u_translate_speed: { type: 'v3', value: translateSpeed },
        u_max_screen_dimension: {
          type: 'f',
          value: maxScreenDimmension,
        },
        u_min_size: { type: 'f', value: minSize },
        u_max_size: { type: 'f', value: maxSize },

      },
      transparent: true,
      depthWrite: false,
      blending: THREE.SubtractiveBlending,
    });

    this.mesh = new THREE.Points(this.geometry, this.material);
  }

  createParticles() {
    for (let i = 0; i < this.numPoints; i++) {
      const particle = {
        position: new THREE.Vector3(
          utils.randomFloatBetween(-5, 5),
          utils.randomFloatBetween(-5, 5),
          utils.randomFloatBetween(-5, 5),
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

    this.mesh.geometry.verticesNeedUpdate = true;

    this.mesh.rotation.x += 0.001;
    this.mesh.rotation.y += 0.002;
  }
}

