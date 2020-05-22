precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying float dist;
varying vec2 vUv;


void main () {
  vUv = uv;
  dist = length(position.xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
