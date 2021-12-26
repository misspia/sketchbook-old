precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float uPointMultiplier;

attribute vec3 position;
attribute float size;
attribute float alpha;
attribute vec4 color;

varying float vAlpha;
varying vec4 vColor;

void main() {

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * uPointMultiplier / gl_Position.w;
  vColor = color;
  vAlpha = alpha;

}
