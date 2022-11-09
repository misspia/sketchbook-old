import * as THREE from 'three';
import { Line } from './Line';

const palette = [
  [0.96, 0.72, 0.84],
  [0.96, 0.83, 0.68],
  [0.93, 0.92, 0.61],
  [0.79, 0.95, 0.67],
  [0.36, 0.91, 0.95],
  [0.6, 0.73, 0.96],
  [0.8, 0.73, 1.0],
];


export class Lines {
  constructor() {
    this.numRepititions = 6;

    this.lineWidth = 50;
    this.lineHeight = 4;
    this.padding = 0.15;
    this.lines = [];
    this.linesMap = {};
    this.bbox = new THREE.Box3()

    this.pivot = new THREE.Group();
    this.createLines();
    this.createInActiveLines();
  }

  get position() {
    return this.pivot.position;
  }

  get children() {
    return this.pivot.children;
  }

  get width () {
    this.bbox.setFromObject(this.pivot)
    return this.bbox.max.x - this.bbox.min.x
  }

  dispose() {
    this.lines.forEach(line => line.dispose());
  }

  createLines() {
    const zIncrement = this.lineHeight + this.padding;
    let z = -Math.floor((palette.length - 1) / 2) * zIncrement * this.numRepititions;

    for(let i = 0; i < this.numRepititions; i ++) {
      palette.forEach((color) => {
        const line = new Line({
          width: this.lineWidth,
          height: this.lineHeight,
          color,
          isInteractable: true,
        });
        line.position.z = z;
        this.lines.push(line);
        this.pivot.add(line.pivot);
        this.linesMap[line.uuid] = line;

        z += zIncrement;
      });
    }
  }

  createInActiveLines() {
    const zIncrement = this.lineHeight + this.padding;
    let z = -Math.floor((palette.length - 1) / 2) * zIncrement * this.numRepititions;

    for(let i = 0; i < this.numRepititions; i++) {
      palette.forEach((color) => {
        const line = new Line({
          width: this.lineWidth,
          height: this.lineHeight,
          color,
          isInteractable: false,
        });
        line.rotation.y += Math.PI / 2;
        line.position.set(
          -this.lineWidth / 2,
          this.lineWidth / 2,
          z,
        );
        this.lines.push(line);
        this.pivot.add(line.pivot);
        this.linesMap[line.uuid] = line;

        z += zIncrement;
      });
    }
  }

  setActive(uuid) {
    this.lines.forEach(line => {
      if(line.uuid === uuid) {
        line.setActive(true);
      } else {
        line.setActive(false);
      }
    })
  }

  update() {
    this.lines.forEach(line => line.update());
  }
}
