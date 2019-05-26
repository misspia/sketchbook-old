precision highp float;

varying vec3 v_normal;

uniform bool u_should_explode;

void main () {
  if(u_should_explode) {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 0.9);
  } else {
    gl_FragColor = vec4(0.0, 0.0, 1.0, 0.9);
  }
  // gl_FragColor = vec4(v_normal.rrr, 0.9);
}
