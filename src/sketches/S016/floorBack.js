import * as THREE from 'three';
import fragmentShader from './shaders/plane.frag';
import vertexShader from './shaders/plane.vert';
import utils from '../utils';

export default class FloorBack {
  constructor(size) {
    this.geometry = new THREE.PlaneGeometry(size, size, size, size);
    this.material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      side: THREE.DoubleSide,
      transparent: true,
    });

    this.frame = {};
    this.tint = {};
    this.pivot = new THREE.Group();

    this.createFrame(size);
    this.createTint(size / 2);

    this.tint.position.y -= 0.01;

    this.bbox = new THREE.Box3().setFromObject(this.pivot);
  }

  createFrame(size) {
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
    });
    this.frame = new THREE.Mesh(geometry, material);
    this.frame.rotation.x -= utils.toRadians(90);
    this.frame.visible = false;
    this.pivot.add(this.frame);
  }

  createTint(radius) {
    const geometry = new THREE.CircleGeometry(radius, 32);
    const material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      side: THREE.FrontSide,
      transparent: true,
      uniforms: {
        uRadius: { value: radius },
      }
    });
    this.tint = new THREE.Mesh(geometry, material);
    this.tint.rotation.x -= utils.toRadians(90);
    this.pivot.add(this.tint);
  }

  get min() {
    return this.bbox.min;
  }
}
