precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float distanceField(vec3 point, float radius) {
   point = fract(point) * 2.0 - 1.0;
  return length(point) - radius;
}

float trace(vec3 origin, float radius, vec3 ray) {
  vec3 pos;
  float t = 0.0;

  for(int i = 0; i < 32; i ++) {
    pos = origin + ray * t;
    float dist = distanceField(pos, radius); //shortest dist to scene
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

// float distanceField(vec3 point, float radius) {
//   return length(point) - radius;
// }
//
// float raytrace(vec3 camera, vec3 dir, float radius) {
//   vec3 ip;
//
//   float t = 0.0;
//   for( int i = 0; i < 32; i++) {
//     ip = camera + dir * t;
//     float dist = distanceField(ip, radius);
//     if(dist < 0.01) break;
//
//     t += dist;
//   }
//   return t;
// }
//
// void main() {
//   vec2 uv = gl_FragCoord.xy / u_resolution * 2.0 - 1.0;
//   uv.x *= u_resolution.x / u_resolution.y;
//
//   vec3 camera = vec3(0.0, 0.0, -3.0);
//   vec3 dir = normalize(vec3(uv, 1.0));
//   float radius = 1.0;
//
//   float t = raytrace(camera, dir, radius);
//   float fog = 1.0 / ( 1.0 + t * t * 0.1);
//     vec3 fc = vec3(fog);
//
//   gl_FragColor = vec4(fc, 1.0);
// }
