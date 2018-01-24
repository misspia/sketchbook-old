precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define MAX_MARCHING_STEPS  255
#define MIN_DIST            0.0
#define MAX_DIST            100.0
#define EPSILON             0.0001


float torus(vec3 p, float ri, float ro) {
  return length(vec2(length(p.xz) - ri, p.y)) - ro;
}

vec2 rotate(vec2 p, float angle) {
    float c = cos(angle), s = sin(angle);
    return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

float sceneSDF(vec3 p) {
  p.xz = rotate(p.xz, sin(u_time) * 0.7);
  float torus1 = torus(p.yzx, 0.7, 0.1);
  float torus2 = torus(p, 0.5, 0.1);

  return torus1;
}

float rayMarch(vec3 camera, vec3 dir, float start, float end) {
    float depth = start;
    for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
        float dist = sceneSDF(camera + depth * dir);
        if (dist < EPSILON) return depth;
        depth += dist;
        if (depth >= end) return end;
    }
    return end;
}

vec3 rayDirection(float fov, vec2 uv) {
  vec3 dir;
  dir.xy = uv - u_resolution / 2.0;
  dir.z = -(u_resolution.y / tan(radians(fov) / 2.0));

  return normalize(dir);
}

vec3 estimateNormal(vec3 p) {
    return normalize(vec3(
        sceneSDF(vec3(p.x + EPSILON, p.y, p.z)) - sceneSDF(vec3(p.x - EPSILON, p.y, p.z)),
        sceneSDF(vec3(p.x, p.y + EPSILON, p.z)) - sceneSDF(vec3(p.x, p.y - EPSILON, p.z)),
        sceneSDF(vec3(p.x, p.y, p.z  + EPSILON)) - sceneSDF(vec3(p.x, p.y, p.z - EPSILON))
    ));
}

vec3 phongContribForLight(vec3 kd, vec3 ks, float alpha, vec3 p, vec3 camera,
                          vec3 lightPos, vec3 lightIntensity) {
    vec3 N = estimateNormal(p);
    vec3 L = normalize(lightPos - p);
    vec3 V = normalize(camera - p);
    vec3 R = normalize(reflect(-L, N));

    float dotLN = dot(L, N);
    float dotRV = dot(R, V);

    if (dotLN < 0.0) return vec3(0.0, 0.0, 0.0);
    if (dotRV < 0.0) return lightIntensity * (kd * dotLN);

    return lightIntensity * (kd * dotLN + ks * pow(dotRV, alpha));
}

vec3 phongIllumination(vec3 ka, vec3 kd, vec3 ks, float alpha, vec3 p, vec3 camera) {
    const vec3 ambientLight = 0.5 * vec3(1.0, 1.0, 1.0);
    vec3 color = ambientLight * ka;

    vec3 light1Intensity = vec3(0.4, 0.4, 0.4);
    vec3 light1Pos = vec3(4.0, 2.0, 4.0);

    vec3 light2Intensity = vec3(0.4, 0.4, 0.4);
    vec3 light2Pos = vec3(2.0, 2.0, 2.0);

    color += phongContribForLight(kd, ks, alpha, p, camera,
                                  light1Pos,
                                  light1Intensity);
    color += phongContribForLight(kd, ks, alpha, p, camera,
                                  light2Pos,
                                  light2Intensity);
    return color;
}

void main() {
  vec3 bgColor = vec3(1.0, 0.6, 0.8);
  vec3 dir = rayDirection(45.0, gl_FragCoord.xy);
  vec3 camera = vec3(0.0, 0.0, 5.0);
  float dist = rayMarch(camera, dir, MIN_DIST, MAX_DIST);

  // Didn't hit anything
  if (dist > MAX_DIST - EPSILON) {
      gl_FragColor = vec4(bgColor, 1.0);
      return;
  }

  vec3 p = camera + dist * dir;
  vec3 ka = vec3(1.0, 1.0, 0.1);
  vec3 kd = ka / 2.0;
  vec3 ks = vec3(1.0, 1.0, 1.0);
  float shininess = 9.0;
  vec3 color = phongIllumination(ka, kd, ks, shininess, p, camera);

  gl_FragColor = vec4(color, 1.0);
}
