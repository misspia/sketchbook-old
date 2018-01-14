precision mediump float;

uniform vec2 u_dimmensions;

void main() {
  vec2 color = vec2(
    gl_FragCoord.x / u_dimmensions.x,
    gl_FragCoord.y / u_dimmensions.y
  );
  gl_FragColor = vec4(color.g, 0.0, color.r, 1.0);
}
