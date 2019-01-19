import * as THREE from 'three';
import * as PP from 'postprocessing';
import SketchManagerThree from '../sketchManagerThree';

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

const config = {
  fog: new THREE.FogExp2(0x111111, 0.011),
}

 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas, null, config);
    this.clock = new THREE.Clock();
    this.composer = {};
    this.cubeCamera = {};

    this.pyramid = {};
    this.outlilneMaterial = {};
    
    this.water = {};

    this.petals = [];
    this.numPetals = 20;
  }
  unmount() {

  }
  init() {
    this.disableOrbitControls();
    this.setClearColor(0x111111);
    this.setCameraPos(-13, -40, -92);

    this.lookAt(0, 0, 0, 0);

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
    const height = 80;
    const geometry = new THREE.CylinderGeometry( height + 10, 20, height, 4, 1 );
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        uTime: { type: 'f', value: 0.0 },
        fogColor: { type: 'c', value: this.scene.fog.color },
        fogDensity: { type: 'f', value: this.scene.fog.density },
      },
      vertexShader: baseVert,
      fragmentShader: baseFrag,
      fog: true,
    });
    const pyramidPositionY = height - 10;
    const pyramid = new THREE.Mesh(geometry, material);
    pyramid.position.set(0, pyramidPositionY, 0);
    this.scene.add(pyramid);

    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: 0x020202,
      wireframe: true,
    });
    const pyramidOutline = new THREE.Mesh(geometry, outlineMaterial);
    pyramidOutline.position.set(0, pyramidPositionY, 0);
    this.scene.add(pyramidOutline);
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
    this.petals.forEach(petal => petal.update());
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
