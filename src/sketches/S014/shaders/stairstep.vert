attribute vec4 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 v_normal;

void main() {
  v_normal = normal;

  gl_Position = projectionMatrix * modelViewMatrix * position;
}
