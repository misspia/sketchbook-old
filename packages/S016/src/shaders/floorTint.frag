precision highp float;

uniform float uRadius;

varying float dist;

float remap(float value, float oldMin, float oldMax, float newMin, float newMax) {
    return newMin + (value - oldMin) * (newMax - newMin) / (oldMax - oldMin);
}

void main() {
  const vec3 color = vec3(0.0, 0.0, 0.0);
  float opacity = 1.0;

  float threshold = uRadius * 0.8;
  if(dist >= threshold) {
    float offsetDist = remap(dist, threshold, uRadius, 0.0, 1.0);
    opacity = 1.0 - offsetDist;
  }

  gl_FragColor = vec4(0.0, 0.0, 0.0, opacity);
}
