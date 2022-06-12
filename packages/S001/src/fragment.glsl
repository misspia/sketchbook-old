precision mediump float;

varying vec2 v_position;
uniform float u_time;

void main() {
  float gChannel = v_position.y * abs(sin(u_time));
  gl_FragColor = vec4(v_position.x, gChannel, 1.0, 0.1);
}
