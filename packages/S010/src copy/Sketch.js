import * as THREE from 'three';
import { SketchManager } from './SketchManager';
import { Images } from './assets';

const palette = [
  0x44FFAA, // #44FFAA
  0x9ABC9F, // #9ABC9F
  0xDD8000, // #DD8000
];

export class Sketch extends SketchManager {
  constructor(canvas) {
    super(canvas);
    this.curve = {};
    this.line = {};
    this.tube = {};
    this.dirLightPositive = {};
    this.dirLightNegative = {};
    this.lightRight = {};
    this.lightLeft = {};

    /**
     * Position on curve the camera should reference
     */
    this.cameraPosOnCurve = 0;
    this.cameraIncrement = 0.001;

  }
  unmount() {
    this.tube.geometry.dispose();
    this.tube.material.dispose();
    this.clearScene();
  }

  init() {
    this.setClearColor(0xCCCFCC)
    this.setCameraPos(0, 50, -100);

    this.createLights();

    this.scene.fog = new THREE.FogExp2( 0xCFEFEF, 0.05 );

    this.curve = new THREE.CatmullRomCurve3(this.getInitialCurvePoints());
    // this.createLine();
    this.createTunnel();
  }
  createLights() {
    this.dirLightPositive = new THREE.DirectionalLight(palette[0], 0.5);
    this.scene.add(this.dirLightPositive);

    this.dirLightNegative = new THREE.DirectionalLight(palette[0], 0.5);
    this.scene.add(this.dirLightNegative);

    this.lightRight = new THREE.PointLight(palette[1], 2, 15);
    this.scene.add(this.lightRight);

    this.lightLeft = new THREE.PointLight(palette[2], 3, 15);
    this.scene.add(this.lightLeft);
  }
  getInitialCurvePoints() {
    return [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-60, 0, -22),
      new THREE.Vector3(-80, 0, 10),
      new THREE.Vector3(-30, 30, 60),
      new THREE.Vector3(15, 0, 70),
      new THREE.Vector3(35, 0, 60),
      new THREE.Vector3(50, 0, 22),
      new THREE.Vector3(0, 0, 0),
    ];
  }
  createLine() {
    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
    this.line = new THREE.Line(geometry, material);
    this.scene.add(this.line);
  }
  createTunnel() {
    const geometry = new THREE.TubeGeometry(this.curve, 70, 5, 10, true);

    const texture = new THREE.TextureLoader().load(Images.Texture);
    texture.wrapT = THREE.RepeatWrapping;
    texture.wrapS = THREE.RepeatWrapping;

    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      opacity: 1,
      map: texture,
      side: THREE.BackSide,
    });

    this.tube = new THREE.Mesh(geometry, material);
    this.scene.add(this.tube);
  }
  // move camera along the line
  moveCamera() {
    this.cameraPosOnCurve += this.cameraIncrement;

    const { x, y, z } = this.getPoint(this.cameraPosOnCurve);
    this.setCameraPos(x, y, z);

    const lookAtVector = this.getPoint(this.cameraPosOnCurve + this.cameraIncrement)
    this.camera.lookAt(lookAtVector);

    /**
     * Move lights
     */
    const { x: tx, y: ty, z:tz } = lookAtVector;
    this.dirLightNegative.position.set(tx, ty - 1, tz - 1);
    this.dirLightPositive.position.set(tx, ty + 1, tz + 1);

    this.lightLeft.position.set(tx + 2, ty - 3, tz + 2);
    this.lightRight.position.set(tx - 2, ty - 3, tz - 2);
  }
  // get value from points array
  getPoint(pos) {
    return this.curve.getPointAt((pos % 1).toFixed(5));
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    this.moveCamera();

    requestAnimationFrame(() => this.draw());
  }
}
