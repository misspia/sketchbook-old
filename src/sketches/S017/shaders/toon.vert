precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute float size;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float pointMultiplier;

void main () {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); 
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * pointMultiplier / gl_Position.w;
}
