import * as THREE from 'three';

const utils = {
  clamp: (min, max, value) => (
    Math.min(Math.max(value, min), max)
  ),
  remap: (min1, max1, min2, max2, value) => (
    min2 + (max2 - min2) * (value - min1) / (max1 - min1)
  ),
  reverseRemap: (min1, max1, min2, max2, value) => (
    remap(min1, max1, min2, max2, max1 - value)
  ),
  remapFreq: (min, max, value) => (
    utils.remap(0, 255, min, max, value)
  ),
  reverseRemapFreq: (min, max, value) => (
    utils.remap(0, 255, min, max, 255 - value)
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
  randomBool: () => (
    Math.random() >= 0.5
  ),
  weightedRandomBool: (trueWeight) => (
    Math.random() <= trueWeight
  ),
  randomSign: () => (
    Math.random() >= 0.5 ? 1 : -1
  ),
  weightedRandomSign: (positiveWeight) => (
    utils.weightedRandomBool(positiveWeight) >= 0.5 ? 1 : -1
  ),
  lerp: (a, b, t) => (
    a * (1 - t) + b * t
  ),


  shaderParse(glsl) {
    return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, (a, b) => (
      THREE.ShaderChunk[b] + '\n'
    ));
  },
}

export default utils;
