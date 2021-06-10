import * as THREE from 'three';

export default class MusicBox {
  constructor(context) {
    this.context = context;
    
    this.geometry = new THREE.CylinderGeometry(5, 5, 5, 32);
    this.material = new THREE.MeshBasicMaterial({ color: 0x00aaff })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  
  update() {

  }

}
