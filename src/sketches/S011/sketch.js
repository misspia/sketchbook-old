import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';

import utils from '../utils';

import Clouds from './clouds';
import Petals from './petals';
import Environment from './environment';
import Pyramid from './pyramid';
import EffectManager from './effectManager';
import Lights from './lights';

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
    this.clock = new THREE.Clock();
    this.composer = {};

    this.lights = new Lights();
    this.environment = new Environment(this.renderer);
    this.pyramid = new Pyramid({
      environment: this.environment,
      size: 20,
    });
    this.petals = new Petals({
      numPetals: 10,
    });
    this.clouds = new Clouds({
      radius: 50,
      numClouds: 25,
      maxY: -10,
      minY: -50,
    });
    this.effectManager = new EffectManager(this);
  }
  unmount() {

  }
  init() {
    this.setClearColor(0x111111);
    this.setCameraPos(-40, 40, 90);

    this.lookAt(0, 0, 0, 0);

    this.pyramid.position.set(0, 5, 0);
    this.scene.add(this.pyramid.pivot);
    this.scene.add(this.clouds.pivot);
    this.scene.add(this.petals.pivot);
  }

  draw() {
    const time = this.clock.getElapsedTime();
    this.petals.update();
    this.pyramid.update();
    this.clouds.update(time);

    this.effectManager.render();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
