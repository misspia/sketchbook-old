import * as THREE from 'three';
import utils from '../utils';

export default class Shape {
  constructor(customConfig) {
    const { centerCoord, angle, radius, ... meshConfig } = customConfig;
    const config = {
      radius: 1,
      widthSegments: 5,
      heightSegments: 5,
      ...meshConfig
    }
    const createShape = [
      this.createTriangle,
      this.createSquare,
      this.createCircle,
      this.createHeart,
    ];
    const shapeIndex = utils.randomIntBetween(0, createShape.length - 1);
    const shape = createShape[shapeIndex]();
    const points = shape.getPoints();
    const geometryPoints = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: config.color,
      });
    this.mesh = new THREE.Line(geometryPoints, material);
    this.mesh.geometry.center();
    const { x, y, z } = this.getRandomRotation();
    this.mesh.rotation.set(x, y, z);

    const scale = 0.01;
    this.mesh.scale.set(scale, scale, scale);

    this.centerCoord = centerCoord;
    this.velocityX = utils.randomFloatBetween(-1, 1);
    this.velocityY = utils.randomFloatBetween(0, 1);
    this.velocityZ = utils.randomFloatBetween(-1, 1);
  }
  /**
   * https://threejs.org/examples/#webgl_geometry_shapes
   * https://github.com/mrdoob/three.js/blob/eaa4f9dc511d3091443069db0f9c74093e29f943/examples/webgl_geometry_shapes.html#L193
   */
  createTriangle() {
    const triangle = new THREE.Shape();
    triangle.moveTo(80, 20);
    triangle.lineTo(40, 80);
    triangle.lineTo(120, 80);
    triangle.lineTo(80, 20);

    return triangle;
  }
  createSquare() {
    const length = 80;
    const square = new THREE.Shape();
    square.lineTo(0, 0);
    square.lineTo(0, length);
    square.lineTo(length, length);
    square.lineTo(length, 0);
    square.lineTo(0, 0);

    return square;
  }
  createCircle() {
    const radius = 40;
    const circle = new THREE.Shape();
    circle.moveTo(0, radius);
    circle.quadraticCurveTo(radius, radius, radius, 0);
    circle.quadraticCurveTo(radius, -radius, 0, -radius);
    circle.quadraticCurveTo(-radius, -radius, -radius, 0);
    circle.quadraticCurveTo(-radius, radius, 0, radius);

    return circle;
  }
  createHeart() {
    const x = 0;
    const y = 0;
    const heart = new THREE.Shape();
    heart.moveTo( x + 25, y + 25 );
    heart.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
    heart.bezierCurveTo( x - 30, y, x - 30, y + 35, x - 30, y + 35 );
    heart.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
    heart.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
    heart.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
    heart.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );

    return heart;
  }
  createRectangle
  getRandomRotation() {
    return {
      x: utils.randomFloatBetween(0, Math.PI * 2),
      y: utils.randomFloatBetween(0, Math.PI * 2),
      z: utils.randomFloatBetween(0, Math.PI * 2),
    }
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
  rotateX(x) {
    this.mesh.rotation.x = x;
  }
  remap(min, max, frequency) {
    return utils.remap(0, 255, min, max, frequency);
  }
  update(frequency) {
    const mappedFrequency = this.remap(5, 25, frequency);
    const x = mappedFrequency * this.velocityX;
    const y = mappedFrequency * this.velocityY;
    const z = mappedFrequency * this.velocityZ;

    const scale = this.remap(0.01, 0.05, frequency);
    this.mesh.scale.set(scale, scale, scale);
    
    const rotation = this.remap(0.001, 0.03, frequency);
    this.mesh.rotation.x += rotation;
    this.mesh.rotation.y += rotation;
    this.mesh.rotation.z += rotation;

    this.setPosition(x, y, z);
  }
}