import * as THREE from 'three';
import palette from './palette';
import Line from './line';

export default class Lines {
  constructor() {
    this.numRepititions = 6;

    this.lineWidth = 50;
    this.lineHeight = 4;
    this.padding = 0.15;
    this.lines = [];
    this.linesMap = {};

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
