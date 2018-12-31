import * as THREE from 'three';

const utils = {
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
  )
}

export default utils;
