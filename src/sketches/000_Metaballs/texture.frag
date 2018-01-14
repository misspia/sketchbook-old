precision highp float;

uniform vec3 u_metaballs[10];
uniform vec2 u_dimmensions;

void main() {
  float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;
  float v = 0.0;

  vec2 color = vec2(0.0, 0.0);

  const int len = 10;
  for(int i = 0; i < len; i++) {
    vec3 ball = u_metaballs[i];
    float dx = ball.x - x;
    float dy = ball.y - y;
    float r = ball.z;
    v += r * r / (dx * dx + dy * dy);
    if(v > 1.0) {
      color.r = x / u_dimmensions.x;
      color.g =  y / u_dimmensions.y;
      break;
    }
  }

  gl_FragColor = vec4(color.g, 0.0, color.r, 1.0);
}
