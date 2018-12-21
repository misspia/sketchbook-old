// attribute vec4 position;

// uniform mat4 projectionMatrix;
// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;

// void main () {
//   gl_Position = projectionMatrix * viewMatrix * modelMatrix * position;
// }

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

attribute vec4 position;

uniform float uTime;

// chunk(shadowmap_pars_vertex);

void main() {

  // vec3 offset = vec3(
  //     sin(position.x * 10.0 + time) * 15.0,
  //     sin(position.y * 10.0 + time + 31.512) * 15.0,
  //     sin(position.z * 10.0 + time + 112.512) * 15.0
  // );

  // chunk(shadowmap_vertex);

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * position;
}