import  * as THREE from 'three';
import utils from '../utils';

const minHeight = 10;
const maxHeight = 20;
const minY = -100;
const maxY = 100;
const minVelocity = 0.01;
const maxVelocity = 0.5;

export default class Line  {
  constructor() {
    this.velocity = utils.randomFloatBetween(minVelocity, maxVelocity);

    const height = utils.randomFloatBetween(minHeight, maxHeight)
    this.geometry = new THREE.BoxGeometry(1, height, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
   
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = utils.randomFloatBetween(-30, 30);
    this.mesh.position.y = utils.randomFloatBetween(-20, 10);
    this.mesh.position.z = utils.randomFloatBetween(-30, 30);

  }
  update() {
    this.mesh.position.y -= this.velocity;
    if(this.mesh.position.y < minY) {
      this.mesh.position.y = maxY;
    }

  }
}