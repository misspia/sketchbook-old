attribute vec4 position;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

void main () {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * position;
}