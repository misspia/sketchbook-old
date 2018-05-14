attribute vec4 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float u_time;

varying vec3  v_normal;

void main () {
   v_normal = normal;

   float dist = sin(u_time) * 0.7 + 0.7;

   vec4 offset = position;
   offset.xyz += normal * dist;

  gl_Position = projectionMatrix * modelViewMatrix * offset;
}
