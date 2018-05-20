precision highp float;

varying vec3 v_normal;

void main () {
  gl_FragColor = vec4(v_normal.rrr, 0.9);
}
