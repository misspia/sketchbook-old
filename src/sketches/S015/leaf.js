import * as THREE from 'three';
import frag from './leaf.frag'; 
import vert from './leaf.vert'; 

export default class Leaf {
  constructor() {
    const geometry = this.createGeometry(0.1);
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
  }
  createGeometry(size = 1) {
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(50, 100, -50, 100, 0, 0);

    const extrudeSettings = {
      amount: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 15,
      bevelThickness: 0.5
    };
    const geometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
    geometry.scale(size, size, size);

    return geometry;
  }
  update() {

  }
}