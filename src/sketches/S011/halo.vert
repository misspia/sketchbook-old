precision highp float;

attribute vec3 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

void main () {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
