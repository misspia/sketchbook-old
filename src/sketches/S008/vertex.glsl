uniform float uTime;
attribute vec4 position;
attribute vec3 normal;

// uniform mat4 projectionMatrix;
// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;

// varying vec3 v_normal;

// void main () {
//   v_normal = normal;
//   gl_PointSize = 0.5;
//   gl_Position = projectionMatrix * viewMatrix * modelMatrix * position;
// }

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 vNormal;

void main () {
  vec4 offset = position;
  float dist = sin(uTime) * 0.5 + 0.5;
  offset.xyz += normal * dist;
  gl_Position = projectionMatrix * modelViewMatrix * offset;
}
