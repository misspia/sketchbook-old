attribute vec4 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 v_normal;

uniform float u_time;

#pragma glslify: noise = require('glsl-noise/simplex/3d')

void main() {
  v_normal = normal;
  float dist = 1.05;
  float offsetFactor = 1.2;

  vec4 offset = position;
  offset.xyz += noise(normal * dist * offsetFactor) * sin(u_time);

  gl_Position = projectionMatrix * modelViewMatrix * offset;
}
