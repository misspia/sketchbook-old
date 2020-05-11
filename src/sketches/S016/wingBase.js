import * as THREE from 'three';
import utils from '../utils';

export default class WingBase {
  constructor(environment, customParams = {}) {
    const points = new Array(10).fill(0).map((_empty, index) => (
      new THREE.Vector2(Math.sin(index * 0.2) * 10 + 5, (index - 5) * 2)
    ));

    const params = {
      metalness: 0.1,
      roughness: 1,
      opacity: 1.0,
      sheen: 0xb5b5b5,
      color: 0xb5b5b5,
      ...customParams,
    }
    const geometry = new THREE.LatheGeometry(points, 2, 0, 3.7);
    const material = new THREE.MeshPhysicalMaterial({
      metalness: params.metalness,
      roughness: params.roughness,
      opacity: params.opacity,
      transparent: true,
      premultipliedAlpha: true,
      envMap: environment.envMap,
      side: THREE.DoubleSide,
      sheen: new THREE.Color(params.sheen).convertGammaToLinear(2.2),
      color: new THREE.Color(params.color).convertGammaToLinear(2.2),
      refractionRatio: 1.0 / 1.6,
    });
    this.pivot = new THREE.Mesh(geometry, material);

    const scale = 0.08;
    this.pivot.scale.set(scale, scale, scale)
    this.pivot.rotation.y = utils.toRadians(180);
    this.pivot.rotation.z = utils.toRadians(70);
  }

  get position() {
    return this.pivot.position;
  }

  get rotation() {
    return this.pivot.rotation;
  }

  get scale() {
    return this.pivot.scale;
  }
}
