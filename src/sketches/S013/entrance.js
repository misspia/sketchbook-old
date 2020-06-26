import * as THREE from 'three';
import Arc from './arc';

export default class Entrance {
  constructor({
    numArcs = 5,
    arcMaxHeight = 20,
    arcMinHeight = 15,
    arcWidth = 5,
    arcDepth = 5,
    gap = 2,
  }) {
    this.arcMaxHeight = arcMaxHeight;
    this.arcMinHeight = arcMinHeight;
    this.arcWidth = arcWidth;
    this.arcDepth = arcDepth;
    this.gap = gap;

    this.numArcs = numArcs;
    this.arcs = [];

    this.geometry = new THREE.Geometry();

    this.material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);

    this.createArcs();

  }

  get position() {
    return this.pivot.position;
  }

  dispose() {
    this.arcs.forEach(arc => arc.dispose());
  }

  createArcs() {
    const midIndex = Math.floor(this.numArcs / 2);
    let height = this.arcMinHeight;
    const heightDelta = this.arcMaxHeight - this.arcMinHeight
    let heightIncrement = heightDelta / midIndex;

    const totalWidth =
    (this.arcWidth + this.gap) * this.numArcs
     - (this.arcWidth + this.gap) / 2 - this.gap;
    let x = -totalWidth / 2;
    const xIncrement = this.gap + this.arcWidth;

    for(let i = 0; i < this.numArcs; i ++) {

      const arc = new Arc({
        height,
        width: this.arcWidth,
        depth: this.arcDepth,
      });
      arc.position.set(x, 0, 0);
      arc.updateMatrix();

      this.geometry.merge(arc.geometry, arc.matrix);
      this.arcs.push(arc);

      if(i === midIndex) {
        // decrease height after reaching peak
        heightIncrement *= -1;
      }

      height += heightIncrement;
      x += xIncrement;
    }
  }
}
