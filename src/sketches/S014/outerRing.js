import * as THREE from 'three';

export default class OuterRing {
  constructor(customConfig) {
    this.config = {
      radius: 10, 
      tube: 1,
      radialSegments: 8,
      tubularSegments: 15,
      numDivisions: 20,
      color: 0x000000,
      wireframe: false,
      ...customConfig
    };
    this.group = new THREE.Group();
    this.arcs = [];
    this.createArcs();
  }
  createArcs() {
    const { radius, tube, radialSegments, tubularSegments, numDivisions } = this.config 
    const arc = numDivisions; /////
    const geometry =  new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    for(let i = 0; i < numDivisions; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      this.arcs.push(mesh);
      this.group.add(mesh);
    }
  }
  update(frequency) {

  }
}