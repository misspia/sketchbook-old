precision mediump float;

varying vec2 v_position;
attribute vec2 a_position;
uniform float u_time;

void main(void) {
  gl_PointSize = 2.0;
  v_position = a_position;

  vec2 pos;
  pos.x = a_position.x * mod(cos(u_time + length(a_position)), 1.0);
  pos.y = a_position.y * mod(sin(u_time + length(a_position)), 1.0);

  float posVel = 25.0;
  float ct = 5.0 + cos(pos.x * posVel) + cos(pos.y * posVel);
  mat2 transform = mat2(cos(pos.x * ct), sin(pos.x * ct), sin(pos.y * ct), cos(pos.y * ct));
  pos = transform * pos;

  gl_Position = vec4(pos, 0.0, 1.0);
}
