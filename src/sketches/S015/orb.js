import * as THREE from 'three';
import utils from '../utils';

// import fragmentShader from './orb.frag';
// import vertexShader from './orb.vert';

// export default class Orb {
//   constructor({
//     radius = 0,
//     widthSegments = 0,
//     heightSegments = 0,
//   }) {
//     this.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

//     this.material = new THREE.RawShaderMaterial({
//       side: THREE.DoubleSide,
//       transparent: true,
//       fragmentShader,
//       vertexShader,
//       uniforms: {
//         u_amp: { type: 'f', value: 1.0 }, 
//         u_time: { type: 'f', value: 0.0 },
//       }
//     });

//     this.mesh = new THREE.Mesh(this.geometry, this.material);
//   }
//   getRandomAngle() {
//     return utils.randomFloatBetween(0, 2 * Math.PI);
//   }
//   update(avgFreq, time) {

//     this.material.uniforms.u_amp.value = avgFreq;
//     this.material.uniforms.u_time.value = time;
//   }
// }

// import Shard from './shard';

// export default class Orb {
//   constructor({
//     numShards = 0,
//     numFrequencyNodes = 0,
//   }) {
//     this.numShards = numShards;
//     this.numFrequencyNodes = numFrequencyNodes;
//     this.shards = [];
//     this.mesh = new THREE.Group();

//     this.createShards();

//   }
//   createShards() {
//     for(let i = 0; i < this.numShards; i++) {
//       const shard = new Shard({});
//       this.shards.push(shard);
//       this.mesh.add(shard.mesh);
//     }
//   }
//   update(frequencies, time) {
//     this.shards.forEach((shard, index) => (
//       shard.update(
//         frequencies[index % this.numFrequencyNodes],
//         time
//       )
//     ));
//   }
// }

import { Images } from '../../themes';
import fragmentShader from './particle.frag';
import vertexShader from './particle.vert';

// https://codepen.io/ykob/pen/QjxBmq?editors=1010
// line 371

// https://medium.com/@joshmarinacci/threejs-particles-556b37b20c41
// https://html5gamedevelopment.com/how-to-create-a-particle-system-in-three-js/
export default class Orb {
  constructor({
    numShards = 0,
    numFrequencyNodes = 0,
  }) {
    this.particles = [];
    this.geometry = new THREE.Geometry();
    this.createParticles();

    const texture = new THREE.TextureLoader().load(Images.T015);
    this.material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        u_freq: { type: 'f', value: 0.0 },
        u_texture: { type: 't', value: texture },
      },
      transparent: true,
      dewWrite: false,
      blending: THREE.AdditiveBlending,
      // blending: THREE.SubtractiveBlending,
      // blending: THREE.MultiplyBlending,
      // blending: THREE.CustomBlending,
      // blending: THREE.NormalBlending,
    })

    this.mesh = new THREE.Points(this.geometry, this.material);
  }
  createParticles() {
    for(let i = 0; i < 100; i++) {
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
  update(frequencies, time) {

  }
}

