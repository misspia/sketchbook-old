import * as THREE from 'three';
import glsl from 'glslify';

import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import { Images } from '../../themes/themes';

import planeFrag from './plane.frag';
import planeVert from './plane.vert';
import coreFrag from './core.frag';
import coreVert from './core.vert';
import auraFrag from './aura.frag';
import auraVert from './aura.vert';

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
    this.coreNoise = new THREE.Vector3(1, 1, 1);
    this.auraNoise = new THREE.Vector3(2, 6, 1);

    this.planeMaterial = {};
    this.coreMaterial = {};
    this.auraMaterial = {};

    this.raycaster = {};
  }
  unmount() {

  }
  init() {
    this.setClearColor(0x555555);
    this.setCameraPos(0, 50, -70);
    this.lookAt(0, 0, 0);
    this.raycaster = new THREE.Raycaster();
    this.createMouseListener();

    this.createPlane();
    // this.createCore();
    // this.createAura();
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
      fragmentShader: glsl(planeFrag),
      vertexShader: glsl(planeVert),
      shading: THREE.FlatShading,
      // wireframe: true,
      uniforms: {
        u_time: { type: 'f', value: 0 },
        u_amp: { type: 'f', value: this.amp },
        u_noise: {type: 'v3', value: this.planeNoise },
        u_texture_a: { type: 't', value: textureA },
        u_texture_b: { type: 't', value: textureB },
        u_mouse: { type: 'v2', value: new THREE.Vector2() },
        u_interact_radius: { type: 'f', value: this.interactRadius },
      }
    });
    const plane = new THREE.Mesh(geometry, this.planeMaterial);
    plane.rotation.x += utils.toRadians(90);
    this.scene.add(plane);
  }
  createCore() {
    const geometry = new THREE.IcosahedronGeometry(10, 5);
    this.coreMaterial = new THREE.RawShaderMaterial({
      vertexShader: glsl(coreVert),
      fragmentShader: glsl(coreFrag),
      uniforms: {
        u_time: { type: 'f', value: 0, },
        u_amp: { type: 'f', value: this.amp },
        u_noise: { type: 'v3', value: this.coreNoise },
      }
    });
    const core = new THREE.Mesh(geometry, this.coreMaterial);
    this.scene.add(core);
  }
  createAura() {
    const geometry = new THREE.IcosahedronGeometry(20, 5);
    this.auraMaterial = new THREE.RawShaderMaterial({
      transparent: true,
      vertexShader: glsl(auraVert),
      fragmentShader: glsl(auraFrag),
      uniforms: {
        u_time: { type: 'f', value: 0, },
        u_amp: { type: 'f', value: this.amp },
        u_noise: { type: 'v3', value: this.auraNoise },
      }
    });
    const aura = new THREE.Mesh(geometry, this.auraMaterial);
    this.scene.add(aura);
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    this.updateRaycaster();

    this.planeMaterial.uniforms.u_time.value = this.getUTime();
    this.planeMaterial.uniforms.u_amp.value = this.amp;

    // this.coreMaterial.uniforms.u_time.value = this.getUTime();
    // this.coreMaterial.uniforms.u_amp.value = this.amp;
    // this.auraMaterial.uniforms.u_time.value = this.getUTime();
    // this.auraMaterial.uniforms.u_amp.value = this.amp;

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
