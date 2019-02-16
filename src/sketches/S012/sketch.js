import * as THREE from 'three';
import glsl from 'glslify';

import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import { Images } from '../../themes/themes';

import planeFrag from './plane.frag';
import planeVert from './plane.vert';

/**
 * https://codepen.io/ykob/pen/BzwQGb?editors=1010
 * https://www.pinterest.ca/pin/516295544779370629/ 
 * http://yiwenl.github.io/Sketches/exps/44/
 */

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.interactRadius = 0.2;
    this.amp = 3;
    this.planeNoise = new THREE.Vector3(1, 1.5, 1);
    this.planeMaterial = {};

    this.raycaster = {};
    this.isMousedown = false;
    this.reveal = 0;
    this.revealIncrement = 0.01;
  }
  unmount() {

  }
  init() {
    this.setClearColor(0xbbbb55);
    this.setCameraPos(0, 50, -70);
    this.lookAt(0, 0, 0);
    this.raycaster = new THREE.Raycaster();
    this.createMouseListener();

    this.createPlane();

    this.canvas.addEventListener('mousedown', (e) => {
      this.isMousedown = true;
    });
    this.canvas.addEventListener('mouseup', (e) => {
      this.isMousedown = false;
    });
  }
  updateRaycaster() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersection = this.raycaster.intersectObjects(this.scene.children)[0];
    
    if(intersection) {
      this.planeMaterial.uniforms.u_mouse.value = intersection.uv;
    }
  }
  createPlane() {
    const width = 100;
    const height = 100;
    const segmentRatio = 1.2;
    const geometry = new THREE.PlaneGeometry(
      width,
      height,
      width * segmentRatio,
      height * segmentRatio
    );

    const textureA = THREE.ImageUtils.loadTexture(Images.T012a);
    const textureB = THREE.ImageUtils.loadTexture(Images.T012b);
    this.planeMaterial = new THREE.RawShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      fragmentShader: glsl(planeFrag),
      vertexShader: glsl(planeVert),
      shading: THREE.FlatShading,
      uniforms: {
        u_time: { type: 'f', value: 0 },
        u_amp: { type: 'f', value: this.amp },
        u_noise: {type: 'v3', value: this.planeNoise },
        u_texture_a: { type: 't', value: textureA },
        u_texture_b: { type: 't', value: textureB },
        u_mouse: { type: 'v2', value: new THREE.Vector2() },
        u_interact_radius: { type: 'f', value: this.interactRadius },
        u_mix_value: { type: 'f', value: this.reveal },
      }
    });
    const plane = new THREE.Mesh(geometry, this.planeMaterial);
    plane.rotation.x += utils.toRadians(40);
    this.scene.add(plane);
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    this.updateRaycaster();

    this.planeMaterial.uniforms.u_time.value = this.getUTime();
    this.planeMaterial.uniforms.u_amp.value = this.amp;


    if(this.isMousedown && this.reveal < 1) {
      this.reveal += this.revealIncrement;
    }
    if(!this.isMousedown && this.reveal > 0) {
      this.reveal -= this.revealIncrement;
    }
    this.planeMaterial.uniforms.u_mix_value.value = this.reveal;

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
