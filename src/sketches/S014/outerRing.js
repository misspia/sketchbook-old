import * as THREE from 'three';
import utils from '../utils';
import frag from './arc.frag';
import vert from './arc.vert';

export default class OuterRing {
  constructor(customConfig) {
    this.config = {
      radius: 10, 
      tube: 1,
      radialSegments: 15,
      tubularSegments: 30,
      numDivisions: 20,
      color: 0x000000,
      wireframe: false,
      ...customConfig
    };
    this.group = new THREE.Group();
    this.arcs = [];
    this.createArcs();

    this.group.rotation.x = utils.toRadians(90);
  }
  createArcs() {
    const { radius, tube, radialSegments, tubularSegments, numDivisions } = this.config;
    const padding = utils.toRadians(2);
    const arcLength = utils.toRadians(360 / numDivisions) - padding * 2;

    const geometry =  new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arcLength);
    
    let rotateZ = 0;
    const radianIncrement = utils.toRadians(360 / numDivisions);
    for(let i = 0; i < numDivisions; i++) {
      const material = new THREE.RawShaderMaterial({
        color: 0xeeaaee,
        uniforms: {
          u_freq: { type: 'f', value: 1.0 },
          u_time: { type: 'f', value: 0.0 },
        },
        fragmentShader: frag,
        vertexShader: vert,
        side: THREE.DoubleSide,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.z += rotateZ;
      this.arcs.push(mesh);
      this.group.add(mesh);

      rotateZ += radianIncrement;
    }
  }
  rotateZ(z) {
    this.mesh.rotation.z = z;
  }
  update(frequencyData, uTime) {
    this.arcs.forEach((arc, index) => {
      const frequency = frequencyData[index];
      arc.material.uniforms.u_freq.value = frequency;
      arc.material.uniforms.u_time.value = uTime;
    });
  }
}