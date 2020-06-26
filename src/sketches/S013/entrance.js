import * as THREE from 'three';
import Arc from './arc';
import ArcLight from './arcLight';

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
    this.arcLights = [];

    this.geometry = new THREE.Geometry();

    this.material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
    });
    this.pivot = new THREE.Group();
    this.frame = new THREE.Mesh(this.geometry, this.material);
    this.pivot.add(this.frame);
    this.createArcs();

  }

  get position() {
    return this.pivot.position;
  }

  dispose() {
    this.arcs.forEach(arc => arc.dispose());
    this.arcLights.forEach(arcLight => arcLight.dispose());
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

      this.createArc({ height, x, y: 0, z: 0 });
      this.createArcLight({ height, x, y: 0, z: -this.arcDepth / 2 });

      if(i === midIndex) {
        // decrease height after reaching peak
        heightIncrement *= -1;
      }

      height += heightIncrement;
      x += xIncrement;
    }
  }

  createArc({ height, x, y, z }) {
    const arc = new Arc({
      height,
      width: this.arcWidth,
      depth: this.arcDepth,
    });
    arc.position.set(x, y, z);
    arc.updateMatrix();

    this.geometry.merge(arc.geometry, arc.matrix);
    this.arcs.push(arc);
  }

  createArcLight({ width, height, x, y, z }) {
    const arcLight = new ArcLight({
      height,
      width: this.arcWidth,
      depth: this.arcDepth,
    });
    arcLight.position.set(x, y, z);

    this.pivot.add(arcLight.pivot);
    this.arcLights.push(arcLight);
  }
}
