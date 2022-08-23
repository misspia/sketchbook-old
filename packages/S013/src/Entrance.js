import * as THREE from 'three';
import { Arc } from './Arc';
import { ArcLight } from './ArcLight';
import { Bats } from './Bats';

export class Entrance {
  constructor({
    numArcs = 5,
    arcMaxHeight = 20,
    arcMinHeight = 15,
    arcWidth = 5,
    arcDepth = 5,
    gap = 2,
    material,
  }) {
    this.arcMaxHeight = arcMaxHeight;
    this.arcMinHeight = arcMinHeight;
    this.arcWidth = arcWidth;
    this.arcDepth = arcDepth;
    this.gap = gap;

    this.numArcs = numArcs;
    this.arcs = [];
    this.arcLights = [];
    this.bats = [];

    this.geometry = new THREE.Geometry();

    this.material = material
    this.pivot = new THREE.Group();
    this.frame = new THREE.Mesh(this.geometry, this.material);
    this.frame.castShadow = true;
    this.frame.receiveShadow = true;
    this.pivot.add(this.frame);

    this.createArcs();
  }

  get position() {
    return this.pivot.position;
  }

  dispose() {
    this.geometry.dispose();
    this.arcs.forEach(arc => arc.dispose());
    this.arcLights.forEach(arcLight => arcLight.dispose());
    this.bats.forEach(bats => bats.dispose());
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

      this.createArc({ height, x, y: 0, z: this.arcDepth / 2 });
      this.createArcLight({ height, x, y: 0, z: 0 });
      this.createBats({ x, y: height / 2, z: this.arcDepth / 2 });

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
      material: this.material,
    });
    arc.position.set(x, y, z);
    arc.updateMatrix();

    this.geometry.merge(arc.geometry, arc.matrix);
    this.arcs.push(arc);
  }

  createArcLight({ height, x, y, z }) {
    const arcLight = new ArcLight({
      height,
      width: this.arcWidth,
      depth: this.arcDepth,
    });
    arcLight.position.set(x, y, z);

    this.pivot.add(arcLight.pivot);
    this.arcLights.push(arcLight);
  }

  createBats({ x, y, z }) {
    const bats = new Bats();
    bats.position.set(x, y, z);

    this.pivot.add(bats.pivot);
    this.bats.push(bats);
  }

  update() {
    this.arcLights.forEach(arcLight => arcLight.update());
    this.bats.forEach(bat => bat.update());
  }
}
