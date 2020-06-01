precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying float vDist;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main () {
  vUv = uv;
  vNormal = normal;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
