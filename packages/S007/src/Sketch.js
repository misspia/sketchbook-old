import * as THREE from 'three';
import { SketchManager } from './SketchManager';

import { Images } from './assets';

const opts = {
  cameraNear: 0.01,
  cameraFar: 200,
};

export class Sketch extends SketchManager {
  constructor(canvas) {
    super(canvas, null, opts);
    this.curve = {};
    this.spline = {};
    this.tunnel = {};
    this.tube = {};
    this.texture = {};
    this.tubeGeometry = {};
    this.tubeMaterial = {};
    this.tubeSpeed = 0.02;
  }

  unmount() {
    this.texture.dispose();
    this.tube.geometry.dispose();
    this.tube.material.dispose();
    this.clearScene();
  }

  init() {
    this.setClearColor(0x222222);
    this.createLight();
    this.createFog();
    this.createCurve();
    this.createSpline();
    this.createTube();
    this.disableOrbitControls();

    const cameraPos = this.curve.getPointAt(0)
    this.setCameraPos(cameraPos.x, cameraPos.y, cameraPos.z)

    const lookAt = this.curve.getPointAt(0.1)
    this.lookAt(lookAt.x, lookAt.y, lookAt.z)
  }
  createLight() {
    const hemi = new THREE.HemisphereLight(0xffffbb, 0x887979, 0.9);
    this.scene.add(hemi);

    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    this.scene.add(directional);
  }
  createFog() {
    this.scene.fog = new THREE.Fog(0x222222, 0.6, 2.8);
  }
  createTube() {
    this.tubeGeometry = new THREE.TubeGeometry(this.curve, 70, 0.2, 50, false);
    this.texture = new THREE.TextureLoader().load(Images.Texture);
    this.tubeMaterial = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      map: this.texture,
    });
    this.wrapTubeMaterialMap();

    this.tube = new THREE.Mesh(this.tubeGeometry, this.tubeMaterial);
    this.scene.add(this.tube);
  }
  createCurve() {
    let points = [];
    for (let i = 0; i < 10; i += 1) {
      points.push(new THREE.Vector3(0, 0, 2.5 * (i / 4)));
    }
    points[4].y = -0.06;
    this.curve = new THREE.CatmullRomCurve3(points);
  }
  createSpline() {
    const material = new THREE.LineBasicMaterial();
    const geometry = new THREE.Geometry();
    geometry.vertices = this.curve.getPoints(70);
    this.spline = new THREE.Line(geometry, material);
  }
  wrapTubeMaterialMap() {
    this.tubeMaterial.map.wrapS = THREE.RepeatWrapping;
    this.tubeMaterial.map.wrapT = THREE.RepeatWrapping;
    this.tubeMaterial.map.repeat.set(20, 1);
  }
  updateMaterialOffset() {
    this.tubeMaterial.map.offset.x += this.tubeSpeed;
  }
  draw() {
    this.updateMaterialOffset();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}
