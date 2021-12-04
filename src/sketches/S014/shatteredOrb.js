import * as THREE from 'three';
import fragmentShader from './shaders/orb.frag';
import vertexShader from './shaders/orb.vert';

export default class Orb {
  constructor(context) {
    this.context = context;
    this.beatManager = context.beatManager;
    
    this.geometry = new THREE.IcosahedronGeometry(1, 2);
    this.geometry.computeFlatVertexNormals();
    this.material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        u_time: { value: 0 },
        u_freq: { value: 0 },
        u_amp: { value: new THREE.Vector3(0, 0, 0) },
      }
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  get position() {
    return this.mesh.position;
  }

  get uniforms() {
    return this.material.uniforms;
  }

  mapFreqToAmp(freq) {

  }

  update(time) {
    this.uniforms.u_time.value = 7;
    // this.uniforms.u_amp.value = this.mapFreqToAmp();
    
  }
}
