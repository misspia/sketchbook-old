import * as THREE from 'three';

const utils = {
  clamp: (min, max, value) => (
    Math.min(Math.max(value, min), max)
  ),
  toRadians: (degrees) => (
    degrees * Math.PI / 180
  ),
  calcCircumference: (radius) => (
    2 * Math.PI * radius
  ),
  getCenter: (obj3d) => (
    new THREE.Box3().setFromObject(obj3d).getCenter()
  ),
  randomFloatBetween: (min, max) => (
    Math.random() * (max - min) + min
  ),
  randomIntBetween: (min, max) => (
    Math.round(utils.randomFloatBetween(min, max))
  ),
  lerp: (a, b, t) => (
    a * (1 - t) + b * t
  ),
}

export default utils;
