import * as THREE from 'three';
import vert from './vertex.glsl';
import frag from './fragment.glsl';
import SketchManagerThree from '../sketchManagerThree.js';

import { Images } from '../../themes/themes.js';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.curve = {};
    this.spline = {};
    this.tunnel = {};
    this.tubeGeometry = {};
    this.tubeGeometryOriginal = {};
    this.tubeMaterial = {};
    this.tubeSpeed = 0.01;

    this.mouse = {};
  }
  init() {
    this.setCameraPos(0, 0, 0.35);
    this.setClearColor(0xf1ebeb);
    this.createLight();
    this.createFog();
    this.createCurve();
    this.createSpline();
    this.createTube();
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }
  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    console.log(this.mouse)
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
    this.tubeGeometry = this.createTubeGeometry();
    this.tubeMaterial = this.createTubeMaterial();
    this.wrapTubeMaterialMap();

    const tube = new THREE.Mesh(this.tubeGeometry, this.tubeMaterial);
    this.scene.add(tube);

    this.tubeGeometryOriginal = this.tubeGeometry.clone();
  }
  createCurve() {
    let points = [];
    for (let i = 0; i < 5; i += 1) {
      points.push(new THREE.Vector3(0, 0, 2.5 * (i / 4)));
    }
    // points[0].z = -3;
    points[4].y = -0.06;
    this.curve = new THREE.CatmullRomCurve3(points);
  }
  createSpline() {
    const material = new THREE.LineBasicMaterial();
    const geometry = new THREE.Geometry();
    geometry.vertices = this.curve.getPoints(70);
    this.spline = new THREE.Line(geometry, material);
  }
  createTubeGeometry() {
    return new THREE.TubeGeometry(this.curve, 70, 0.02, 50, false);
  }
  createTubeMaterial() {
    const texture = new THREE.TextureLoader().load(Images.T007);
    return new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      map: texture,
    });
  }
  wrapTubeMaterialMap() {
    this.tubeMaterial.map.wrapS = THREE.RepeatWrapping;
    this.tubeMaterial.map.wrapT = THREE.RepeatWrapping;
    this.tubeMaterial.map.repeat.set(30, 6);
  }
  updateMaterialOffset() {
    this.tubeMaterial.map.offset.x += this.tubeSpeed;
  }
  updateCameraPosition() {
    this.camera.rotation.z = this.mouse.position
  }
  draw() {
    this.updateMaterialOffset();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
