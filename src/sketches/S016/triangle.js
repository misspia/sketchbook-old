import * as THREE from 'three';

export default class Triangle {
  constructor() {
    const geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(40, 0, 0),
      new THREE.Vector3(40, 30, 0),
    );
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.computeFaceNormals();
  
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    
    this.mesh = new THREE.Mesh(geometry, this.material);
  }
  update() {

  }

}