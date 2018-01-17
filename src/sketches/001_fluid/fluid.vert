precision mediump float;

attribute vec2 a_vertex;
varying vec2 v_vertex;
uniform float u_time;

void main(void) {
  gl_PointSize = 2.0;
  v_vertex = a_vertex;

  vec2 v = a_vertex * mod(u_time + length(a_vertex), 1.0);
  float ct = cos(v.x * 30.0 + u_time * 20.0) + cos(v.y * 30.0 + u_time * 20.0);
  v = mat2(sin(v.x * (10.0 + ct)), cos(v.x * (10.0 + ct)), cos(v.y * (10.0 + ct)), sin(v.y * (10.0 + ct))) * v;
  gl_Position = vec4(v, 0.0, 1.0);
}
