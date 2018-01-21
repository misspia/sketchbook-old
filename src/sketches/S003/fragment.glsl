precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float distanceField(vec3 point, float radius) {
   // point = fract(point) * 2.0 - 0.2;
   point = fract(point) * 2.0 - 1.0;
  return length(point) - radius;
}

float trace(vec3 origin, float radius, vec3 ray) {
  float t = 0.0;

  for(int i = 0; i < 32; i ++) {
    vec3 p = origin + ray * t;
    float dist = distanceField(p, radius);
    t += dist * 0.5;
  }
  return t;
}

mat2 rotation(float angle) {
  return mat2(cos(angle), -sin(angle),
          sin(angle), cos(angle) );
}

void main() {
  vec2 uv = 2.0 * gl_FragCoord.xy / u_resolution - 1.0;
  // correct aspect ratio
  uv.xy *= u_resolution.x / u_resolution.y;

  float radius = 0.2;
  vec3 ray = normalize(vec3(uv, 1.0));

  //rotate
  float angle = u_time;
  ray.xz *= rotation(angle);

  vec3 origin = vec3(0.0, sin(u_time), cos(u_time));
  float t = trace(origin, radius, ray);

  float fog = 1.0 / ( 1.0 + t * t * 0.1);
  vec3 fc = vec3(fog);

  gl_FragColor = vec4(fc, 1.0);

}
