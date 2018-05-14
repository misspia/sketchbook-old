precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec3 v_normal;

void main () {
  gl_FragColor = vec4(v_normal, 1.0);
}
