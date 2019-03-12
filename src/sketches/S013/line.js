import  * as THREE from 'three';
import utils from '../utils';

export default class Line  {
  constructor(cameraDistance, pivotCoord) {    
    this.minY = -cameraDistance;
    this.maxY = cameraDistance;
    this.dimension = cameraDistance;
    this.velocity = utils.randomFloatBetween(0.1, 1);
    this.rotateVeocityY = 0.01;
    
    const height = utils.randomFloatBetween(30, 50)
    this.geometry = new THREE.BoxGeometry(2, height, 2);
    this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    
    this.centerCoord = {
      x: pivotCoord.x,
      y: utils.randomFloatBetween(-this.dimension, this.dimension),
      z: pivotCoord.z,
    };
    const { x, y, z } = this.getInitialCoord();
    this.mesh.position.set(x, y, z);
  }
  getInitialCoord() {
    const { x, y, z } = this.centerCoord;
    const radius = utils.randomFloatBetween(this.dimension * 0.7, this.dimension);
    const angle = utils.randomFloatBetween(0, 2 * Math.PI);
    return {
      x: x + radius * Math.cos(angle),
      y,
      z: z + radius * Math.sin(angle),
    }
  }
  update() {
    this.mesh.position.y -= this.velocity;
    this.mesh.rotation.y += this.rotateVeocityY;

    if(this.mesh.position.y < this.minY) {
      /**
       * reset position
       */
      const { x, z }  = this.getInitialCoord();
      this.mesh.position.x = x;
      this.mesh.position.z = z;
      this.mesh.position.y = this.maxY;
    }

  }
}