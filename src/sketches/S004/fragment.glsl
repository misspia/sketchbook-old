precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define MAX_ITER	100
#define MIN_DIST	0.0
#define MAX_DIST	10.0
#define EPSILON		0.001

float udRoundBox( vec3 p, vec3 b, float r ) {
  return length(max(abs(p) - b, 0.0)) - r;
}

float sceneSDF(vec3 p) {
    vec3 dim = vec3(0.4, 0.9, 0.6);
    float rounding = 0.1;
    float box = udRoundBox(p, dim, rounding);
    return box;
}

vec3 estimateNormal(vec3 pos) {
  vec2 eps = vec2(0.0, EPSILON);
  return normalize(vec3(
        sceneSDF(pos + eps.yxx) - sceneSDF(pos - eps.yxx),
        sceneSDF(pos + eps.xyx) - sceneSDF(pos - eps.xyx),
        sceneSDF(pos + eps.xxy) - sceneSDF(pos - eps.xxy)));
}

float toonIllunination(float intensity) {
  float toonMap;
  if (intensity < 0.256) {
      toonMap = 0.195;
  } else if (intensity < 0.781) {
      toonMap = 0.781;
  } else {
      toonMap = 0.900;
  }
  return toonMap;
}

void main() {
  const vec4 blue = vec4(0.5, 0.7, 0.7, 1.0);

  vec3 camera	= vec3(2.0);
  vec3 target	= vec3(0.0);
  vec3 upDir		= vec3(0.0, 1.0, 0.0);

  vec3 camDir		= normalize(target - camera);
  vec3 camRight	= normalize(cross(upDir, camera));
  vec3 camUp		= cross(camDir, camRight);

  vec2 uv =  gl_FragCoord.xy / u_resolution.xy * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;

  vec3 rayDir = normalize(camRight * uv.x + camUp * uv.y + camDir);

  float totalDist = 0.0;
  vec3 pos = camera;
  float dist = EPSILON;

  for (int i = 0; i < MAX_ITER; i++) {
      if (dist < EPSILON) break;
      dist = sceneSDF(pos);
      pos += dist * rayDir;
  }

  if(dist > EPSILON) {
    gl_FragColor = blue;
    return;
  }

  vec3 normal = estimateNormal(pos);

	float diffuse = max(0.0, dot(-rayDir, normal));
	float specular = pow(diffuse, 128.0);
  float lighting = toonIllunination(diffuse + specular);

  vec3 color = vec3(lighting);
  gl_FragColor = vec4(color, 1.0);

}
