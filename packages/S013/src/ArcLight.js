import * as THREE from 'three';
import utils from 'toolkit/utils';

export class ArcLight {
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
    this.backMaterial = new THREE.MeshBasicMaterial({ color: 0xffefef });
    this.createGeometry();

    this.backing = new THREE.Mesh(this.geometry, this.backMaterial);
    this.backing.intensity = 1;

    this.pivot = new THREE.Group();
    this.pivot.add(this.backing);

    this.light = {};
    this.setupLight();
    this.pivot.add(this.light);

    this.bbox = new THREE.Box3();

    this.helper = new THREE.SpotLightHelper(this.light, 0xff0000);
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
      new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
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
    this.light = new THREE.SpotLight(0xffaaf0, 1.5);
    this.light.angle = utils.toRadians(40);
    this.light.distance = 150;
    this.light.decay = 2;
    // make 2nd light??

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
