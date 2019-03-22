import * as THREE from 'THREE';

export default class Shard {
  constructor(vertices) {
    // const geometry = new THREE.Geometry();
    // const [ v1, v2, v3 ] = vertices;
    // geometry.vertices.push(v1, v2, v3);
    const geometry = new THREE.PlaneGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffeeee,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    const { x, y, z } = vertices;
    this.mesh.position.set(x, y, z);
  }
  update() {

  }
}