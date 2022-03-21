precision highp float;

varying float vFreq;

float remap(float min1, float max1, float min2, float max2, float value) {
  return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
  return remap(0.0, 255.0, min, max, vFreq);
}

float reverseRemapFreq(float min, float max) {
  return remap(0.0, 255.0, min, max, 255.0 - vFreq);
}

void main() {
  float alpha = remapFreq(0.0, 1.0);

  gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
}
