precision highp float;

varying vec3 v_normal;

uniform bool u_should_explode;

void main () {
  gl_FragColor = vec4(v_normal.rrr, 0.9);
}
