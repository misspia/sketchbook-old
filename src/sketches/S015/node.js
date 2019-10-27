import * as THREE from 'three';
import utils from '../utils';

export default class Node {
  constructor({
    nodeIndex = 0,
    totalNodes = 0, 
    radius = 0,

  }) {
    this.geometry = new THREE.BoxGeometry(10, 10, 10);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    const { x, y, z } = this.getSphereCoord(nodeIndex, totalNodes, radius);
    console.debug(x, y, z)
    this.setPosition(x, y, z);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
  getSphereCoord(nodeIndex, totalNodes, radius) {
    console.group('SPHERE COORD');
    const angleIncrement = totalNodes / 360;
    const radians = utils.toRadians(nodeIndex * angleIncrement);
    console.debug('inc', angleIncrement)
    console.debug('radians', radians)
    console.debug('radius', radius)

    console.groupEnd();
    return {
      x: radius * Math.cos(radians) * Math.sin(radians),
      y: radius * Math.sin(radians) * Math.sin(radians),
      z: radius * Math.cos(radians),
    }
  }
}
