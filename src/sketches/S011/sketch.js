import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';

import haloFrag from './shaders/halo.frag';
import haloVert from './shaders/halo.vert';
import utils from '../utils';

import Clouds from './clouds';
import Petals from './petals';
import Environment from './environment';
import Pyramid from './pyramid';
import EffectManager from './effectManager';

/**
 * Inspo: https://i.redd.it/5u2xbx7eo9721.jpg
 * https://twitter.com/mattdesl/status/1079879696978927616
 */

const config = {
  fog: new THREE.FogExp2(0x111111, 0.011),
}

/**
 * TODO: override resize
 * https://github.com/mrdoob/three.js/blob/400acd3c78c8e631087322eb1e0e9fc00a16b375/examples/webgl_postprocessing_unreal_bloom.html#L129-L140
 */

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas, null, config);
    this.clock = new THREE.Clock();
    this.composer = {};

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
      maxY: 35,
      minY: 10,
    });
    this.effectManager = new EffectManager(this);

    this.halo = {};

  }
  unmount() {

  }
  init() {
    // this.setClearColor(0x111111);
    // this.setClearColor(0xffffff);
    this.setClearColor(0x5555ff);
    this.setCameraPos(-9, -50, 74);

    this.lookAt(0, 0, 0, 0);

    this.pyramid.position.set(0, 5, 0);
    this.scene.add(this.pyramid.pivot);
    this.scene.add(this.clouds.pivot);
    this.scene.add(this.petals.pivot);

    this.createHalo();
  }

  createHalo() {
    const geometry = new THREE.TorusGeometry( 45, 0.6, 15, 90 );
    geometry.computeFlatVertexNormals();
    this.haloMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        uTime: { type: 'f', value: 0.0 },
        fogColor: { type: 'c', value: this.scene.fog.color },
        fogDensity: { type: 'f', value: this.scene.fog.density },
      },
      vertexShader: haloVert,
      fragmentShader: haloFrag,
      transparent: true,
    });
    this.halo = new THREE.Mesh(geometry, this.haloMaterial);
    this.halo.rotateX(utils.toRadians(90));

    this.halo.position.set(0, -25, 0);
    this.scene.add(this.halo);
  }

  draw() {

    const time = this.clock.getElapsedTime();
    this.haloMaterial.uniforms.uTime.value = time;
    this.petals.update();
    this.pyramid.update();
    this.clouds.update(time)

    this.effectManager.render();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
