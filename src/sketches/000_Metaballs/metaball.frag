precision mediump float;

const int len = 10;
const vec3 pink = vec3(0.98, 0.81, 0.85);
const vec3 blue = vec3(0.79, 0.91, 0.93);

uniform vec3 u_metaballs[len];
uniform vec2 u_resolution;

void main() {
  vec2 coord = gl_FragCoord.xy;
  float velocity = 0.0;
  vec3 color = blue;


  for(int i = 0; i < len; i++) {
    vec3 ball = u_metaballs[i];
    float dx = ball.x - coord.x;
    float dy = ball.y - coord.y;
    float r = ball.z;
    velocity += r * r / (dx * dx + dy * dy);

    if(velocity > 1.0) {
      float distanceFromRadius = abs(distance(coord.xy, ball.xy));
      float scaledDistance = distanceFromRadius / r;

      color.r = 2.9 - scaledDistance;
      color.gb = pink.gb;
      break;
    }
  }
  gl_FragColor = vec4(color, 1.0);
}
