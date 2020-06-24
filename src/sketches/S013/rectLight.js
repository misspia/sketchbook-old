import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

/**
 * https://threejs.org/examples/?q=light#webgl_lights_rectarealight
 */
export default class RectLight {
  constructor({ width = 10, height = 10 }) {
    this.intensityIncrement = 0.01;
    this.maxIntensity = 6;
    this.minIntensity = 0;

    RectAreaLightUniformsLib.init();
    this.pivot = new THREE.RectAreaLight(0xffffff, 1, width, height);
    this.pivot.intensity = 1;
    this.pivot.position.set(5, 5, 0);
    this.pivot.rotation.y -= Math.PI;
    this.createFaces();

    this.bbox = new THREE.Box3();
  }

  get position() {
    return this.pivot.position;
  }

  get height() {
    const { min, max } = this.bbox.setFromObject(this.pivot);
    return max.y - min.y;
  }

  dispose() {
    this.pivot.traverse((obj) => {
      if (obj.geometry) {
        obj.geometry.dispose();
      }

      if (obj.material) {
        obj.material.dispose();
      }
    });
  }

  createFaces() {
    const rectLightMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(),
      new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })
    );
    rectLightMesh.scale.x = this.pivot.width;
    rectLightMesh.scale.y = this.pivot.height;
    this.pivot.add(rectLightMesh);

    const rectLightMeshBack = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(),
      new THREE.MeshBasicMaterial({ color: 0x080808 })
    );
    rectLightMesh.add(rectLightMeshBack);
  }

  update() {
    if (
      this.pivot.intensity >= this.maxIntensity ||
      this.pivot.intensity <= this.minIntensity
    ) {
      this.intensityIncrement = -this.intensityIncrement;
    }
    this.pivot.intensity += this.intensityIncrement
  }
}
