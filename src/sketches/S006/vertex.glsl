attribute vec4 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float u_time;

varying vec3  v_normal;

const float PI = 3.14159;

float sineInOut(const float t) {
  return -0.5 * (cos(PI * t) - 1.0);
}

void main () {
   v_normal = normal;
   float dist = sineInOut(u_time);
   float offsetFactor = 1.5;

   vec4 offset = position;
   offset.xyz += normal * dist * offsetFactor;

  gl_Position = projectionMatrix * modelViewMatrix * offset;
}
