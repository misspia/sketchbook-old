import * as THREE from 'three';
import utils from '../utils';

/**
 * https://www.reddit.com/r/ImaginaryMindscapes/comments/aao0yx/voyager_by_archist/
 * https://www.reddit.com/r/ImaginaryMonuments/comments/9ywnkr/the_middle_of_eternity_by_alex_andreyev/
 * https://www.reddit.com/r/ImaginaryLandscapes/comments/9x1sf4/s_e_n_s_o_r_y_by_me/
 * https://www.reddit.com/r/ImaginaryMindscapes/comments/9ah51q/d_a_y_b_r_e_a_k_by_me/
 */
export default class Crystal {
  constructor({
    environment,
    size = 20,

  }) {
    this.environment = environment;

    this.size = size;
    this.rotationVelocity = -0.003;
    this.crystal = {};

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
    this.createCrystal();
    this.pivot.add(this.crystal);
  }

  createCrystal() {
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      metalness: 0.4,
      roughness: 0.0,
      opacity: 0.85,
      transparent: true,
      premulcrystalliedAlpha: true,
      envMap: this.environment.envMap,
      side: THREE.DoubleSide,
      sheen: new THREE.Color(0x0000ff).convertGammaToLinear(2.2),
      color: new THREE.Color(0xffffff).convertGammaToLinear(2.2),
      refractionRatio: 1.0 / 1.6,
    });
    const geometry = new THREE.Geometry();

    const top = this.createHalf();
    const topBbox = new THREE.Box3().setFromObject(top);
    top.position.y += topBbox.max.y - topBbox.min.y;
    top.updateMatrixWorld();

    const bottom = this.createHalf();
    bottom.rotation.x += utils.toRadians(180);
    bottom.updateMatrix();

    geometry.merge(top.geometry, top.matrix);
    geometry.merge(bottom.geometry, bottom.matrix);

    this.crystal = new THREE.Mesh(geometry, glassMaterial);
  }

  createHalf() {
    const geometry = new THREE.ConeGeometry(this.size, this.size * 1.5, 4);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    return new THREE.Mesh(geometry, material);
  }

  update() {
    this.pivot.rotation.y += this.rotationVelocity;
  }
}
