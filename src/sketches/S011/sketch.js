import SketchManagerThree from '../sketchManagerThree';

import Clouds from './clouds';
import Petals from './petals';
import Environment from './environment';
import Crystal from './crystal';
import EffectManager from './effectManager';

/**
 * Inspo
 * https://twitter.com/mattdesl/status/1079879696978927616
 * https://i.redd.it/5u2xbx7eo9721.jpg
 *
 * TODO: override resize
 * https://github.com/mrdoob/three.js/blob/400acd3c78c8e631087322eb1e0e9fc00a16b375/examples/webgl_postprocessing_unreal_bloom.html#L129-L140
 */

 class Sketch extends SketchManagerThree {
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
    this.petals = new Petals({
      numPetals: 8,
    });
    this.clouds = new Clouds({
      numClouds: 10,
    });
    this.effectManager = new EffectManager(this);
  }
  unmount() {

  }
  init() {
    this.setClearColor(0x111111);
    this.setCameraPos(-80, 130, 130);

    this.lookAt(0, 0, 0, 0);

    this.crystal.position.set(0, 5, 0);
    this.scene.add(this.crystal.pivot);
    this.scene.add(this.clouds.pivot);
    this.scene.add(this.petals.pivot);
  }

  draw() {
    this.time += this.timeIncrement;
    this.petals.update();
    this.crystal.update();
    this.clouds.update(this.time);

    this.effectManager.render();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
