import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import Node from './node';

class Sketch extends SketchManagerThree {
  constructor(canvas) {
    super(canvas);
    this.curve = {};
    this.line = {};
    this.tube = {};
    this.points = [];
    this.camPosIndex = 0;

  }
  unmount() {

  }
  init() {
    this.setCameraPos(0, 50, -100);
    
    this.curve = new THREE.CatmullRomCurve3(this.getInitialCurvePoints());
    this.createLine();
    this.createTube();
    this.createTunnelWalls()
    // console.log(this.tube.geometry.vertices)
    

  }
  getInitialCurvePoints() {
    return [
      new THREE.Vector3( -30, -30, -10),
			new THREE.Vector3( 30, -40, 30),
			new THREE.Vector3( 10, -50, 10),
			new THREE.Vector3( 50, -30, 10),
			new THREE.Vector3( 10, 20, 0),
			new THREE.Vector3( -30, -30, -10 )
    ];
  }
  createLine() {
    this.points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
    this.line = new THREE.Line(geometry, material);
    this.scene.add(this.line);
  }
  createTube() {
    // const tubeGeometry = new THREE.TubeGeometry(this.curve, 20, 2, 8, false);
    // const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0xbbaaee });
    // this.tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    // this.scene.add(this.tube)
  }
  createTunnelWalls() {
    const { vertices } = new THREE.TubeGeometry(this.curve, 20, 2, 8, false);
    console.log(vertices);

    vertices.forEach(vertex => {
      console.log(vertex);
      const node = new Node(vertex);
      
      this.scene.add(node.mesh);
    })
  }
  // move camera along the line
  moveCamera() {
    const { x, y, z } = this.getPoint(this.camPosIndex);
    this.setCameraPos(x, y, z);

    this.camera.lookAt(this.getPoint(this.camPosIndex + 1));
    this.camPosIndex++;
  }
  // get value from points array
  getPoint(index) {
    return this.points[index % this.points.length] ;
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    // this.moveCamera();
    
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;

// https://medium.com/@Samsy/the-legend-of-icecoon-case-study-advanced-webgl-first-part-185742e82429
// slinky