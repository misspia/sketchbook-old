import * as THREE from 'three';
import utils from '../utils';

import fragmentShader from './orb.frag';
import vertexShader from './orb.vert';

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

import Shard from './shard';

export default class Orb {
  constructor({

  }) {
    this.numShards = 100;
    this.shards = [];
    this.mesh = new THREE.Group();

    this.createShards();

  }
  createShards() {
    for(let i = 0; i < this.numShards; i++) {
      const shard = new Shard({});
      this.shards.push(shard);
      this.mesh.add(shard.mesh);
    }
  }
  update(frequencies, time) {

  }
}
