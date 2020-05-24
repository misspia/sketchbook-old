precision highp float;

uniform vec3 uColor;
uniform float uFreq;

float remap(float value, float oldMin, float oldMax, float newMin, float newMax) {
    return newMin + (value - oldMin) * (newMax - newMin) / (oldMax - oldMin);
}

float remapFreq(float freq, float min, float max) {
  return remap(freq, 0.0, 255.0, min, max);
}

void main() {
  vec3 color = uColor;
  color.r = remapFreq(uFreq, 0.0, uColor.r);
  color.g = remapFreq(uFreq, 0.0, uColor.g);
  color.b = remapFreq(uFreq, 0.0, uColor.b);

  gl_FragColor = vec4(color, 1.0);
}
