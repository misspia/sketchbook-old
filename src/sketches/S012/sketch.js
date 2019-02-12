import * as THREE from 'three';
import glsl from 'glslify';

import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import { Images } from '../../themes';

import frag from './plane.frag';
import vert from './plane.vert';

/**
 * https://codepen.io/ykob/pen/BzwQGb?editors=1010
 */

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.amp = 0.5;
    this.noiseX = 1;
    this.noiseY = 1;
    this.noiseZ = 1;

    this.planeMaterial = {};
  }
  unmount() {

  }
  init() {
    this.setClearColor(0x555555);
    this.createPlane();
  }
  createPlane() {
    const geometry = new THREE.PlaneGeometry(5, 3, 20, 12);

    const texture = new THREE.TectureLoader().load(Images.T12);
    this.planeMaterial = new THREE.RawShaderMaterial({
      side: THREE.DoubleSide,
      fragmentShader: glsl(frag),
      vertexShader: glsl(vert),
      shading: THREE.FlatShading,
      uniforms: {
        u_time: { type: 'f', value: 0 },
        u_amp: { type: 'f', value: this.amp },
        U_noise_x: { type: 'f', value: this.noiseX },
        u_texture: { type: 't', value: texture }
      }
    });
    const plane = new THREE.Mesh(geometry, this.planeMaterial);
    plane.rotation.x += utils.toRadians(90);
    this.scene.add(plane);
  }
  draw() {
    this.renderer.render(this.scene, this.camera);

    this.planeMaterial.uniforms.u_time.value = this.getUTime();
    this.planeMaterial.uniforms.u_amp.value = this.amp;

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
