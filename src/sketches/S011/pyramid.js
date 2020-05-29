import * as THREE from 'three';
import utils from '../utils';

import outlineFrag from './outline.frag';
import outlineVert from './outline.vert';

export default class Pyramid {
  constructor(environment) {
    this.environment = environment;

    this.geometry = new THREE.ConeGeometry(20, 40, 4);
    this.pyramid = {};
    this.outline = {};

    this.pivot = new THREE.Group();

    this.init();

  }

  get position() {
    return this.pivot.position;
  }

  get rotation() {
    return this.pivot.rotation;
  }

  init() {
    this.createPyramid();
    this.createOutline();

    this.pivot.add(this.pyramid);
    this.pivot.add(this.outline);

    this.rotation.x += utils.toRadians(180);
  }

  createPyramid() {
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      metalness: 0.1,
      roughness: 0,
      opacity: 0.8,
      transparent: true,
      premultipliedAlpha: true,
      envMap: this.environment.envMap,
      side: THREE.DoubleSide,
      sheen: new THREE.Color(0xffffff).convertGammaToLinear(2.2),
      color: new THREE.Color(0xffffff).convertGammaToLinear(2.2),
      refractionRatio: 1.0 / 1.6,
    });
    this.pyramid = new THREE.Mesh(this.geometry, glassMaterial);
  }

  createOutline() {
    const material = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: true,
    });
    this.outline = new THREE.Mesh(this.geometry, material);
  }
}
