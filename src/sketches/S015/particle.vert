precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform float u_time;
uniform float u_freq;


void main () {
  vec3 pos = position;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 50.0 * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
