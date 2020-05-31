precision highp float;

attribute vec3 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 vNormal;

uniform float u_time;


void main () {
  vNormal = normal;
  gl_PointSize = 10.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}