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
    const yIncrement = 3;
    let y = -Math.floor(this.numLines / 2) * yIncrement;
    const points = this.generateInitialPoints();
    for(let i = 0; i < this.numLines; i++) {
      const line = new Line({ points });
      line.position.y = y;
      this.lines.push(line);
      this.pivot.add(line.pivot);
      this.linesMap[line.uuid] = line;

      y += yIncrement;
    }
  }
  generateInitialPoints() {
    const lineLength = 30;
    const numPoints = 40;

    const xIncrement = lineLength / numPoints;
    let x = -Math.floor(lineLength / 2)
    const points = [];
    for(let i = 0; i < numPoints; i++) {
      points.push(new THREE.Vector3(x, 0, 0));
      x += xIncrement;
    }
    return points;
  }

  setTouching(uuid) {
    // console.debug(this.linesMap[uuid]);

  }

  update() {

  }
}
