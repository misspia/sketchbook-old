import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';

import haloFrag from './shaders/halo.frag';
import haloVert from './shaders/halo.vert';
import utils from '../utils';

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

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas, null, config);
    this.clock = new THREE.Clock();
    this.composer = {};

    this.environment = new Environment(this.renderer);
    this.pyramid = new Pyramid(this.environment);
    this.effectManager = new EffectManager(this);
    this.petals = new Petals({
      numPetals: 25,
    });

    this.halo = {};

  }
  unmount() {

  }
  init() {
    // this.setClearColor(0x111111);
    this.setClearColor(0xffffff);
    this.setCameraPos(-9, -17, 94);

    this.lookAt(0, 0, 0, 0);

    this.pyramid.position.set(0, 5, 0);
    this.scene.add(this.pyramid.pivot);
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

    this.haloMaterial.uniforms.uTime.value = this.clock.getElapsedTime();
    this.petals.update();
    this.pyramid.update();

    this.effectManager.render();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
