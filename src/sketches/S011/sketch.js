import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import glsl from 'glslify';

import frag from './fragment.glsl';
import vert from './vertex.glsl';
import utils from '../utils';

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
  }
  unmount() {

  }
  init() {
    // this.disableOrbitControls();
    this.setClearColor(0x111111)
    this.setCameraPos(0, 0, -50);
    this.lookAt(0, 0, 0);

    this.createPyramid();
    this.createTest();
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
  /**
   * to test reflection
   */
  createTest() {
    const test = new THREE.Mesh(
      new THREE.BoxGeometry(10, 2,2),
      new THREE.MeshBasicMaterial({ color: 0xddddff })
      );
      test.position.set(1, -10, 20);
      this.scene.add(test);
  }

  draw() {
    this.cubeCamera.position.copy(this.pyramid.position);
    this.cubeCamera.update(this.renderer, this.scene);
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
