precision highp float;

uniform float uFreq;

float remap(float value, float oldMin, float oldMax, float newMin, float newMax) {
    return newMin + (value - oldMin) * (newMax - newMin) / (oldMax - oldMin);
}

float remapFreq(float freq, float min, float max) {
  return remap(freq, 0.0, 255.0, min, max);
}

void main() {
  vec3 baseColor = vec3(0.6, 0.6, 0.6);
  vec3 color = baseColor;
  color.r = remapFreq(uFreq, 0.0, baseColor.r);
  color.g = remapFreq(uFreq, 0.0, baseColor.g);
  color.b = remapFreq(uFreq, 0.0, baseColor.b);

  gl_FragColor = vec4(color, 1.0);
}
