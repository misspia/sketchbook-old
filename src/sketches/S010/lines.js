import * as THREE from 'three';
import Line from './line';

export default class Lines {
  constructor({
    num = 10,
  }) {
    this.numLines = num;
    this.lines = [];

    this.pivot = new THREE.Group();
    this.createLines();
  }

  get position() {
    return this.pivot.position;
  }

  dispose() {
    this.lines.forEach(line => line.dispose());
  }

  createLines() {
    let y = -Math.floor(this.numLines / 2);
    const yIncrement = 1;
    for(let i = 0; i < this.numLines; i++) {
      const line = new Line();
      line.position.y = y;
      this.lines.push(line);
      this.pivot.add(line.pivot);

      y += yIncrement;
    }
  }

  update() {

  }
}
