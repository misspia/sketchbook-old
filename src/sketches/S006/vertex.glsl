attribute vec4 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float u_displacement;
uniform bool u_should_explode;

varying vec3  v_normal;

const float PI = 3.14159;


float sineInOut(const float t) {
  float t_normal = cos(PI * t);
  if(t_normal > 0.94) {
    return 0.0;
  } else {
    return -0.5 * (t_normal - 1.0);
  }
}

void main () {
   v_normal = normal;
   float dist = u_displacement;
   float offsetFactor = 1.2;

   vec4 offset = position;
   offset.xyz += normal * dist * offsetFactor;

  if(u_should_explode) {
    offset.xyz += normal * dist * offsetFactor;
  }
  gl_Position = projectionMatrix * modelViewMatrix * offset;
}
