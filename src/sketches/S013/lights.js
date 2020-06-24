import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

/**
 * https://threejs.org/examples/?q=light#webgl_lights_rectarealight
 */
export default class Lights {
  constructor() {
    this.ambient = new THREE.AmbientLight(0xffffff, 0.1);

    this.rectLight = {};
    this.setupRectLight();
  }

  setupRectLight() {
    RectAreaLightUniformsLib.init();
    this.rectLight = new THREE.RectAreaLight(0xffffff, 1, 10, 10);
    this.rectLight.intensity = 1;
    this.rectLight.position.set(5, 5, 0);
    this.rectLight.rotation.x -= Math.PI / 4;

    const rectLightMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(),
      new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })
    );
    rectLightMesh.scale.x = this.rectLight.width;
    rectLightMesh.scale.y = this.rectLight.height;
    this.rectLight.add(rectLightMesh);

    const rectLightMeshBack = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(),
      new THREE.MeshBasicMaterial({ color: 0x080808 })
    );
    rectLightMesh.add(rectLightMeshBack);
  }

  update() {

  }
}
