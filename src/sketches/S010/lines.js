import * as THREE from 'three';
import Line from './line';

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
    const width = 20;
    const height = 1;
    const zIncrement = height + 0.0;
    let z = -Math.floor(this.numLines / 2) * zIncrement;
    for(let i = 0; i < this.numLines; i++) {
      const line = new Line({ width, height });
      line.position.z = z;
      this.lines.push(line);
      this.pivot.add(line.pivot);
      this.linesMap[line.uuid] = line;

      z += zIncrement;
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
