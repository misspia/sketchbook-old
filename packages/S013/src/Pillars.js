import * as THREE from 'three';
import { Pillar } from './Pillar';

export class Pillars {
  constructor({
    minZ = 0,
    maxZ = 0,
    numPerSide = 1,
    gap = 1,
    color = 0x111111,
  }) {
    this.numPerSide = numPerSide;
    this.minZ = minZ;
    this.maxZ = maxZ;
    this.numPerSide = numPerSide;
    this.gap = gap;

    this.pillars = [];
    this.pivot = new THREE.Group();

    this.createPillars();
  }

  get position() {
    return this.pivot.position;
  }

  createPillars() {
    let z = this.minZ;
    const zIncrement = (this.maxZ - this.minZ) / (this.numPerSide - 1);
    for(let i = 0; i < this.numPerSide; i++) {
      const leftPillar = new Pillar({ color: 0x111111 });
      const rightPillar = new Pillar({ color: 0x111111 });

      this.pillars.push(leftPillar, rightPillar);
      this.pivot.add(leftPillar.pivot, rightPillar.pivot);

      leftPillar.position.set(
        -this.gap / 2,
        leftPillar.height / 2,
        z
      );
      rightPillar.position.set(
        this.gap / 2,

        rightPillar.height / 2,
        z
      );

      z += zIncrement;
    }
  }

  dispose() {
    this.pillars.forEach(pillar => pillar.dispose());
  }

  update() {
    this.pillars.forEach(pillar => pillar.update());
  }
}
