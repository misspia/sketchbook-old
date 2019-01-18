import * as THREE from 'three';
import * as PP from 'postprocessing';
import SketchManagerThree from '../sketchManagerThree';
import glsl from 'glslify';

import baseFrag from './pyramidBase.frag';
import baseVert from './pyramidBase.vert';
import outlineFrag from './outline.frag';
import outlineVert from './outline.vert';
import utils from '../utils';
import Petal from './petal';

/**
 * Inspo: https://i.redd.it/5u2xbx7eo9721.jpg
 * https://twitter.com/mattdesl/status/1079879696978927616
 */
class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.clock = new THREE.Clock();
    this.composer = {};
    this.cubeCamera = {};

    this.pyramid = {};
    this.outlilneMaterial = {};

    this.petals = [];
    this.numPetals = 10;
  }
  unmount() {

  }
  init() {
    // this.disableOrbitControls();
    this.setClearColor(0x111111)
    this.setCameraPos(0, 30, -70);
    this.lookAt(0, 0, 0);

    this.createPyramid();
    this.createPetals();
    this.createEffects();
  }
  createEffects() {
    this.composer = new PP.EffectComposer(this.renderer);
    this.renderPass = new PP.RenderPass(this.scene, this.camera, 0x111111);    
    const bloomPass = new PP.EffectPass(this.camera, new PP.BloomEffect());
    bloomPass.renderToScreen = true;

    this.composer.addPass(this.renderPass);
    this.composer.addPass(bloomPass);
  }
  createPyramid() {
    this.createPyramidBase();
    this.createPyramidTip();
  }
  createPyramidBase() {
    const height = 40;
    const geometry = new THREE.CylinderGeometry( height + 5, 20, height, 4, 1 );
    const material = new THREE.RawShaderMaterial({
      vertexShader: baseVert,
      fragmentShader: baseFrag,
    });
    const pyramid = new THREE.Mesh(geometry, material);
    pyramid.position.set(0, height + 5, 0);
    this.scene.add(pyramid);
    
  }
  createPyramidTip() {
    this.cubeCamera = new THREE.CubeCamera(1, 1000, 90);
    this.scene.add(this.cubeCamera);
    const geometry = new THREE.ConeGeometry(20, 40, 4);

    const mirrorMaterial = new THREE.MeshBasicMaterial({
      color: 0xddddff,
      envMap: this.cubeCamera.renderTarget.texture,
    });
    const mirrorPyramid = new THREE.Mesh(geometry, mirrorMaterial);    

    const outlineMaterial = new THREE.RawShaderMaterial({
      wireframe: true,
      vertexShader: outlineVert,
      fragmentShader: outlineFrag,
    });
    const outlinePyramid = new THREE.Mesh(geometry, outlineMaterial);

    this.pyramid = new THREE.Group();
    this.pyramid.add(mirrorPyramid);
    this.pyramid.add(outlinePyramid);
    this.scene.add(this.pyramid)

    this.pyramid.rotation.x += utils.toRadians(180);
  }
  createPetals() {
    for(let i = 0; i < this.numPetals; i++) {
      const petal = new Petal({x: 0, y: 0, z: 0}, this.composer);
      this.petals.push(petal);
      this.scene.add(petal.mesh);
    }
  }
  updatePetals() {
    this.petals.forEach(petal => {
      petal.update(this.camera.position);
    })
  }
  draw() {
    this.composer.renderer.autoClear = true;
    
    this.cubeCamera.position.copy(this.pyramid.position);
    this.cubeCamera.update(this.composer.renderer, this.scene);
    this.composer.render(this.clock.getDelta());
    
    this.composer.renderer.autoClear = false;

    this.updatePetals();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;

/**
 *  bloom

https://github.com/yiwenl/Sketches/blob/51304376af420d37a2e843234a8c91ca74d0a501/experiments/Hannya/src/shaders/bloom.frag
https://gist.github.com/mebens/4218802
http://kadekeith.me/2017/09/12/three-glow.html

http://bkcore.com/blog/3d/webgl-three-js-animated-selective-glow.html
https://threejs.org/examples/?q=bloom#webgl_postprocessing_unreal_bloom



pp-lib
https://github.com/mattatz/THREE.BloomBlendPass/blob/master/BloomBlendPass.js

smoke
https://codepen.io/misspia/pen/ENzyzr?editors=0010

merge geometry
https://github.com/misspia/threejs-solar-system/blob/master/src/js/solarSystem/planets/planet.js 
 
*/