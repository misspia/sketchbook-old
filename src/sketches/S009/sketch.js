import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import Node from './node';
import utils from '../utils';

const palette = [
  [0.22, 0.27, 0.26], // #1E2C29 + 0.1
  [0.2,0.41,0.47], // #3E697C
  [0.34, 0.60, 0.65],//  #569AA5
  [0.6, 0.73, 0.62], // #9ABC9F
  [0.79, 0.79, 0.77], // #C9C9C5

];
class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.curve = {};
    this.line = {};
    this.tube = {};
    this.fog = {};
    /**
     * Position on curve the camera should reference
     */
    this.cameraPosOnCurve = 0;
    this.cameraIncrement = 0.0006;
    // this.cameraIncrement = 0.01;

  }
  unmount() {

  }
  init() {
    this.setClearColor(0xCCCFFF)
    this.setCameraPos(0, 50, -100);
    
    this.fog = new THREE.Fog(0xeeaaee, 0.01, 10);
    this.scene.fog = new THREE.FogExp2( 0xCCCFFF, 0.007 );
    
    this.curve = new THREE.CatmullRomCurve3(this.getInitialCurvePoints());
    this.createLine();
    this.createTunnelWalls()

  }
  getInitialCurvePoints() {
    return [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-20, -15, 0),
      new THREE.Vector3(-40, 0, 0),
      new THREE.Vector3(-20, 40, 0),
      new THREE.Vector3(10, 50, 0),
      new THREE.Vector3(40, 15, 0),
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
  createTunnelWalls() {
    const { vertices } = new THREE.TubeGeometry(this.curve, 70, 5, 8, false);
    vertices.forEach(vertex => {
      const colorIndex = Math.round(utils.randomFloatBetween(0, palette.length - 1));
      const node = new Node(vertex, palette[colorIndex]);
      
      this.scene.add(node.mesh);
    })
  }
  // move camera along the line
  moveCamera() {
    // console.log((this.cameraPosOnCurve % 1).toFixed(5))
    const { x, y, z } = this.getPoint(this.cameraPosOnCurve);
    this.setCameraPos(x, y, z);

    this.camera.lookAt(this.getPoint(this.cameraPosOnCurve + this.cameraIncrement))
    this.cameraPosOnCurve += this.cameraIncrement;
  }
  // get value from points array
  getPoint(pos) {
    return this.curve.getPoint((pos % 1).toFixed(5));
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    // this.moveCamera();
    
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;

// https://medium.com/@Samsy/the-legend-of-icecoon-case-study-advanced-webgl-first-part-185742e82429

// fog
// https://codepen.io/Im0-3/pen/vKGYeM?editors=0010

//lighting? 
// https://medium.com/@pailhead011/extending-three-js-materials-with-glsl-78ea7bbb9270
// https://stackoverflow.com/questions/30151086/threejs-how-do-i-make-a-custom-shader-be-lit-by-the-scenes-lights
// https://stackoverflow.com/questions/37342114/three-js-shadermaterial-lighting-not-working