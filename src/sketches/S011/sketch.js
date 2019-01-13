import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import glsl from 'glslify';

import frag from './outline.frag';
import vert from './outline.vert';
import utils from '../utils';
import Petal from './petal';

/**
 * Inspo: https://i.redd.it/5u2xbx7eo9721.jpg
 * https://twitter.com/mattdesl/status/1079879696978927616
 */
class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.cubeCamera = {};
    this.composer = {};

    this.pyramid = {};
    this.outlilneMaterial = {};

    this.petals = [];
    this.numPetals = 20;
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
  }
  createPyramid() {
    this.cubeCamera = new THREE.CubeCamera(1, 1000, 90);
    this.scene.add(this.cubeCamera);

    const geometry = new THREE.ConeGeometry(20, 30, 4);

    const mirrorMaterial = new THREE.MeshBasicMaterial({
      color: 0xddddff,
      envMap: this.cubeCamera.renderTarget,
    });
    const mirrorPyramid = new THREE.Mesh(geometry, mirrorMaterial);    

    const outlineMaterial = new THREE.RawShaderMaterial({
      wireframe: true,
      vertexShader: vert,
      fragmentShader: frag,
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
      const petal = new Petal({x: 0, y: 0, z: 0});
      this.petals.push(petal);
      this.scene.add(petal.mesh);
    }
    console.log(this.petals)
  }
  updatePetals() {
    this.petals.forEach(petal => {
      petal.updatePosition();
    })
  }
  draw() {
    this.cubeCamera.position.copy(this.pyramid.position);
    this.cubeCamera.update(this.renderer, this.scene);
    this.renderer.render(this.scene, this.camera);

    this.updatePetals();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;

// https://github.com/yiwenl/Sketches/blob/51304376af420d37a2e843234a8c91ca74d0a501/experiments/Hannya/src/shaders/petals.vert