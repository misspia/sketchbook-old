import * as THREE from 'three';
import Line from './line';

const palette = [
  new THREE.Vector3(0.96, 0.72, 0.84),
  new THREE.Vector3(0.96, 0.83, 0.68),
  new THREE.Vector3(0.93, 0.92, 0.61),
  new THREE.Vector3(0.79, 0.95, 0.67),
  new THREE.Vector3(0.36, 0.91, 0.95),
  new THREE.Vector3(0.6, 0.73, 0.96),
  new THREE.Vector3(0.8, 0.73, 1.0),
];
export default class Lines {
  constructor({
    num = 10,
  }) {
    this.numLines = num;
    this.lines = [];
    this.linesMap = {};

    this.pivot = new THREE.Group();
    this.createLines();
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
    const width = 50;
    const height = 3;
    const zIncrement = height + 0.1;
    let z = -Math.floor((palette.length - 1) / 2) * zIncrement;
    palette.forEach((color, i) => {
      const line = new Line({ width, height, color });
      line.position.z = z;
      this.lines.push(line);
      this.pivot.add(line.pivot);
      this.linesMap[line.uuid] = line;

      z += zIncrement;
    });
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
