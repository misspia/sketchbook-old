precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float pointMultiplier;

attribute vec3 position;
attribute float size;
attribute float angle;
attribute vec4 color;

varying vec4 vColour;
varying vec2 vAngle;

void main() {

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * pointMultiplier / gl_Position.w;
  vAngle = vec2(cos(angle), sin(angle));
  vColour = color;

}
