precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

#define MAX_ITER	40
#define MIN_DIST	0.0
#define MAX_DIST	10.0
#define EPSILON		0.001

float udRoundBox( vec3 p, vec3 b, float r ) {
  return length(max(abs(p) - b, 0.0)) - r;
}

float smin( float a, float b, float k ) {
    float h = clamp( 0.5 + 0.5 * (b - a) / k, 0.0, 1.0 );
    return mix( b, a, h ) - k * h * (1.0 - h);
}

mat2 rotate(float angle) {
    return mat2(
      vec3(cos(angle), -sin(angle), 0.0),
      vec3(sin(angle), cos(angle), 0.0)
    );
}

float repeat(float axis, float n) {
  return mod(axis, n) - n * 0.5;
}


float sceneSDF(vec3 p) {
    vec3 qLeft = p;
    vec3 qRight = p;

    float rotationDeg = 15.0;

    qLeft.xy = p.xy * rotate(rotationDeg);
    qRight.xy = p.xy * rotate(-rotationDeg);

    vec3 dimmensions = vec3(0.4, 1.5, 1.0);
    float rounding = 0.1;
    float boxLeft = udRoundBox(qLeft, dimmensions, rounding);
    float boxRight = udRoundBox(qRight, dimmensions, rounding);
    return smin(boxLeft, boxRight, 0.1);
}


vec3 estimateNormal(vec3 p) {
  vec2 eps = vec2(0.0, EPSILON);
  return normalize(vec3(
        sceneSDF(p + eps.yxx) - sceneSDF(p - eps.yxx),
        sceneSDF(p + eps.xyx) - sceneSDF(p - eps.xyx),
        sceneSDF(p + eps.xxy) - sceneSDF(p - eps.xxy)));
}

vec3 toonIllunination(float intensity) {
  vec3 toonMap;
  if (intensity < 0.256) {
      toonMap = vec3(0.195);
  } else if (intensity < 0.781) {
      toonMap = vec3(0.781);
  } else {
      toonMap = vec3(0.900);
  }
  return toonMap;
}

vec4 colorObject(vec3 p, vec3 rayDir) {
  vec3 normal = estimateNormal(p);

	float diffuse = max(0.0, dot(-rayDir, normal));
	float specular = pow(diffuse, 128.0);
  vec3 lighting = toonIllunination(diffuse + specular);

  return vec4(lighting, 1.0);
}

vec4 colorBG() {
  return vec4(0.5, 0.7, 0.7, 1.0);
}

vec4 rayMarch(vec3 camera, vec3 rayDir) {
  float totalDist = 0.0;
  vec3 p = camera;
  float dist = EPSILON;

  for (int i = 0; i < MAX_ITER; i++) {
      if (dist < EPSILON) break;
      dist = sceneSDF(p);
      p += dist * rayDir;
  }

  if(dist < EPSILON) {
    return colorObject(p, rayDir);
  } else {
    return colorBG();
  }
}

void main() {
  vec3 camera	= vec3(1.0 + cos(u_time) * 2.0, 3.5 + sin( u_time), 3.5);
  vec3 target	= vec3(0.0, 0.0, 0.0);

  vec3 upDir		= vec3(0.0, 1.0, 0.0);

  vec3 camDir		= normalize(target - camera);
  vec3 camRight	= normalize(cross(upDir, camera));
  vec3 camUp		= cross(camDir, camRight);

  vec2 uv =  gl_FragCoord.xy / u_resolution.xy * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;

  vec3 rayDir = normalize(camRight * uv.x + camUp * uv.y + camDir);

  vec4 color = rayMarch(camera, rayDir);
  gl_FragColor = color;
}
