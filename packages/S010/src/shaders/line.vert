precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform vec3 uNoise;
uniform float uTime;
uniform float uAmp;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

#pragma glslify: noise = require('glsl-noise/simplex/3d')

float remap(float value, float oldMin, float oldMax, float newMin, float newMax) {
    return newMin + (value - oldMin) * (newMax - newMin) / (oldMax - oldMin);
}

void main () {
  float dist = distance(uv.x, 0.5);
  float noiseFactor = 1.0 - remap(dist, 0.0, 0.5, 0.0, 1.0);
  float displacement = uAmp * noise(vec3(position * uNoise * 0.06) + uTime * 0.5 );
  vec3 newPosition = position + normal * (displacement * noiseFactor);

  vNormal = normal;
  vPosition = newPosition;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
