uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

void main () {
  gl_Position = projectionMatrix * modelViewMatrix;
}
