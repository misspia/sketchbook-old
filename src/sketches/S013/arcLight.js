import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import utils from '../utils';

/**
 * https://threejs.org/examples/?q=light#webgl_lights_rectarealight
 */
export default class ArcLight {
  constructor({
    width = 10,
    height = 10,
  }) {
    this.intensityIncrement = 0.01;
    this.maxIntensity = 6;
    this.minIntensity = 0;

    this.width = width;
    this.height = height;
    this.radius = this.width / 2;
    this.geometry = new THREE.Geometry();
    // this.backMaterial = new THREE.MeshBasicMaterial({ color: 0x080808 });
    this.backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.createGeometry();

    // RectAreaLightUniformsLib.init();
    // this.backing = new THREE.RectAreaLight(0xddaaff, 1, width, height);
    this.backing = new THREE.Mesh(this.geometry, this.backMaterial);
    this.backing.intensity = 1;

    this.pivot = new THREE.Group();
    this.pivot.add(this.backing);

    this.light = new THREE.SpotLight(0xffaaff, 1.8);
    this.setupLight();
    this.pivot.add(this.light);

    this.bbox = new THREE.Box3();
  }

  get position() {
    return this.pivot.position;
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
      this.geometry,
      new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })
    );
    this.backing.add(rectLightMesh);

    const rectLightMeshBack = new THREE.Mesh(
      this.geometry,
      this.backMaterial,
    );
    rectLightMesh.add(rectLightMeshBack);
  }

  createGeometry() {
    const planeHeight = this.height - this.radius;

    const cGeometry = new THREE.CircleGeometry(
      this.radius,
      this.radius * 8,
      0,
      Math.PI,
    );
    const circle = new THREE.Mesh(cGeometry, this.backMaterial);
    circle.position.y += planeHeight;
    circle.updateMatrix();

    this.geometry.merge(circle.geometry, circle.matrix);

    const pGeometry = new THREE.PlaneGeometry(this.width, planeHeight);
    const plane = new THREE.Mesh(pGeometry, this.backMaterial);
    plane.position.y += planeHeight / 2;
    plane.updateMatrix();

    this.geometry.merge(plane.geometry, plane.matrix);
  }

  setupLight() {
    this.light.angle = utils.toRadians(10);
    this.light.rotation.x = -utils.toRadians(25);
    this.light.distance = 150;
    this.light.decay = 2;
    this.light.position.z = -40;
    this.light.position.y = 15;
    this.light.castShadow = true;
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
