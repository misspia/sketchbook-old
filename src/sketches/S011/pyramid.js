import * as THREE from 'three';
import utils from '../utils';

import outlineFrag from './shaders/outline.frag';
import outlineVert from './shaders/outline.vert';

/**
 * https://www.reddit.com/r/ImaginaryMindscapes/comments/aao0yx/voyager_by_archist/
 * https://www.reddit.com/r/ImaginaryMonuments/comments/9ywnkr/the_middle_of_eternity_by_alex_andreyev/
 * https://www.reddit.com/r/ImaginaryLandscapes/comments/9x1sf4/s_e_n_s_o_r_y_by_me/
 * https://www.reddit.com/r/ImaginaryMindscapes/comments/9ah51q/d_a_y_b_r_e_a_k_by_me/
 */
export default class Pyramid {
  constructor({
    environment,
    size = 20,

  }) {
    this.environment = environment;

    this.rotationVelocity = -0.003;
    this.tipGeometry = new THREE.ConeGeometry(size, size * 1.5, 4);
    this.tip = {};
    this.tipOutline = {};

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
    this.createTip();
    this.createTipOutline();

    this.pivot.add(this.tip);

    // this.rotation.x += utils.toRadians(180);
  }

  createTip() {
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      metalness: 0.4,
      roughness: 0.0,
      opacity: 0.85,
      transparent: true,
      premultipliedAlpha: true,
      envMap: this.environment.envMap,
      side: THREE.DoubleSide,
      sheen: new THREE.Color(0x0000ff).convertGammaToLinear(2.2),
      color: new THREE.Color(0xffffff).convertGammaToLinear(2.2),
      refractionRatio: 1.0 / 1.6,
    });
    this.tip = new THREE.Mesh(this.tipGeometry, glassMaterial);
  }

  createTipOutline() {
    const material = new THREE.RawShaderMaterial({
      fragmentShader: outlineFrag,
      vertexShader: outlineVert,
      wireframe: true,
    });
    this.tipOutline = new THREE.Mesh(this.tipGeometry, material);
  }

  update() {
    this.pivot.rotation.y += this.rotationVelocity;
  }
}
