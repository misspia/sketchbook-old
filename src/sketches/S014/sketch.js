import * as THREE from 'three';
import glsl from 'glslify';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';

import frag from './plane.frag';
import vert from './plane.vert';

/**
 * https://twitter.com/vlucendo/status/1088163385827606528
 * https://github.com/mattdesl/codevember/blob/gh-pages/src/1.js
 */
 class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.raycaster = {};

    this.noise = new THREE.Vector3(1.5, 1.5, 1.0);
    this.amp = 1.0;
    this.clock = new THREE.Clock();

    this.bottomPlane = {};
    this.topPlane = {};
    this.bottomMaterial = {};
    this.topMaterial = {};
  }
  unmount() {

  }
  init() {
    this.createStats();

    this.setCameraPos(20, 15, -25);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xeeeeff);
    this.createMouseListener();
    this.raycaster = new THREE.Raycaster();    

    this.createPlanes();
  }
  createPlanes() {
    const geometry = new THREE.PlaneGeometry(30, 30, 30, 30);

    this.bottomMaterial = this.createMaterial(0xaaaaee);
    this.bottomPlane = new THREE.Mesh(geometry, this.bottomMaterial);
    this.bottomPlane.rotation.x += utils.toRadians(90);
    this.bottomPlane.position.y = -2;
    
    this.topMaterial = this.createMaterial(0xeeaaaa);
    this.topPlane = new THREE.Mesh(geometry, this.topMaterial);
    this.topPlane.rotation.x += utils.toRadians(90);
  
    this.scene.add(this.bottomPlane);
    this.scene.add(this.topPlane);
  }
  createMaterial(hex = 0xffaaff) {
    return new THREE.RawShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        u_color: { type: 'c', value: new THREE.Color(hex) },
        u_mouse: { type: 'v2', value: new THREE.Vector2(0.5, 0.5) },
        u_noise: { type: 'v3', value: this.noise },
        u_amp: { type: 'f', value: this.amp },
      },
      vertexShader: glsl(vert),
      fragmentShader: glsl(frag),
      transparent: true,
    });
  }
  draw() {
    this.stats.begin();

    this.renderer.render(this.scene, this.camera);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const firstIntersection = this.raycaster.intersectObjects(this.scene.children)[0];
    if(firstIntersection && firstIntersection.object === this.topPlane) {
      this.topMaterial.uniforms.u_mouse.value = firstIntersection.uv;
      this.bottomMaterial.uniforms.u_mouse.value = firstIntersection.uv;
    }


    this.stats.end();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
