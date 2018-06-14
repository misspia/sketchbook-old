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
    this.geometry = {};
    this.material = {};
    this.tunnelSpeed = 1;
  }
  init() {
    this.setClearColor(0xf1ebeb);
    this.createLight();
    this.createCurve();
    this.createSpline();
    this.createTunnel();
  }
  createLight() {
    const hemi = new THREE.HemisphereLight(0xffffbb, 0x887979, 0.9);
    this.scene.add(hemi);

    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    this.scene.add(directional);
  }
  createTunnel() {
    this.geometry = this.createTunnelGeometry();
    this.material = this.createTunnelMaterial();

    this.material.map.wrapS = THREE.RepeatWrapping;
    this.material.map.wrapT = THREE.RepeatWrapping;
    this.material.map.repeat.set(30, 6);

    const tube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(tube);
  }
  createCurve() {
    let points = [];
    for (let i = 0; i < 5; i += 1) {
      points.push(new THREE.Vector3(0, 0, 2.5 * (i / 4)));
    }
    points[4].y = -0.06;
    this.curve = new THREE.CatmullRomCurve3(points);
  }
  createSplineMesh() {
    const material = new THREE.LineBasicMaterial();
    const geometry = new THREE.Geometry();
    geometry.vertices = curve.getPoints(70);
    this.spline = new THREE.Line(geometry, material);
  }
  createTunnelGeometry() {



    // const spline = new THREE.SplineCurve3(points);
    return new THREE.TubeGeometry(curve, 70, 0.02, 50, false);
  }
  createTunnelMaterial() {
    const texture = new THREE.TextureLoader().load(Images.T007);
    return new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      map: texture,
    });
  }
  updateMaterialOffset() {
    // this.material.map.offset.x += this.tunnelSpeed;
    this.material.map.offset.y += 100;
    this.material.map.offset.x += 100;
    // console.log(this.material.map.offset);
  }
  draw() {
    this.updateMaterialOffset();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
