precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec3 color;

varying vec3 vColor;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

void main() {
  vColor = color;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
