precision highp float;

uniform float uTime;
uniform float uFreq;

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

void main () {
  // gl_FragColor = vec4(1.0, 0.4, 0.3, 0.9);
  // gl_FragColor = vec4(1, 0.6, 0.8, 0.9);
  vec4 color;
  color.rgba = vec4(1, 0.5, 0.4, 0.9);
  color.r = map(uFreq, 0.0, 255.0, 0.2, 1.0);
  color.b = map(uFreq, 0.0, 255.0, 0.5, 0.8);
  color.g = map(uFreq, 0.0, 255.0, 0.2, 0.7);
  gl_FragColor = color;
}
