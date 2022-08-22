precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float u_time;
uniform float u_amp;
uniform vec3 u_noise;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

#pragma glslify: noise = require('glsl-noise/simplex/3d')

void main () {
  float displacement = u_amp * noise(vec3(position * u_noise * 0.06) + u_time );
  vec3 newPosition = position + normal * displacement;

  vNormal = normal;
  vPosition = newPosition;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
