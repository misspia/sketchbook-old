precision highp float;

attribute vec3 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 vNormal;

uniform float u_time;
uniform float u_amp;

#pragma glslify: noise = require('glsl-noise/simplex/3d')

void main () {
  vNormal = normal;
  float displacement = u_amp * noise(vec3(position * 0.06) + u_time );
  vec3 newPosition = position + normal * displacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}