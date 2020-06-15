uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float uTime;
uniform float uFreq;

attribute vec4 position;
attribute vec3 normal;

void main () {
  vec4 offset = position;
  float dist = sin(uTime) * 0.5 + 0.5;
  offset.xyz += normal * dist;
  gl_Position = projectionMatrix * modelViewMatrix * offset;
}
