import * as THREE from 'three';

export default class Node {
  constructor(coord) {
    this.coord = coord;
    this.geometry = {};
    this.material = {};
    this.mesh = {};
  }

}