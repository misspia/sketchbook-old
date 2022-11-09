import { SketchManager } from './SketchManager';

import { Clouds } from './Clouds';
import { Shards } from './Shards';
import { Environment } from './Environment';
import { Crystal } from './Crystal';
import { EffectManager } from './EffectManager';

/**
 * TODO: override resize
 * https://github.com/mrdoob/three.js/blob/400acd3c78c8e631087322eb1e0e9fc00a16b375/examples/webgl_postprocessing_unreal_bloom.html#L129-L140
 */

export class Sketch extends SketchManager {
  constructor(canvas) {
    super(canvas, null);
    this.time = 50;
    this.timeIncrement = 1;
    this.composer = {};

    this.environment = new Environment(this.renderer);
    this.crystal = new Crystal({
      environment: this.environment,
      size: 20,
    });
    this.shards = new Shards({
      num: 8,
    });
    this.clouds = new Clouds({
      numClouds: 10,
    });
    this.effectManager = new EffectManager(this);
  }

  unmount() {
    this.environment.dispose();
    this.crystal.dispose();
    this.shards.dispose();
    this.clouds.dispose();
    this.clearScene();
  }

  init() {
    this.disableOrbitControls();
    this.setClearColor(0x111111);
    this.setCameraPos(-100, 100, 150);

    this.lookAt(0, 0, 0, 0);

    this.crystal.position.set(0, 5, 0);
    this.scene.add(this.crystal.pivot);
    this.scene.add(this.clouds.pivot);
    this.scene.add(this.shards.pivot);
  }

  draw() {
    this.time += this.timeIncrement;
    this.shards.update();
    this.crystal.update();
    this.clouds.update(this.time);

    this.effectManager.render();

    requestAnimationFrame(() => this.draw());
  }
}
