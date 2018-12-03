precision highp float;

uniform float uTime;
uniform float uFreq;
varying vec3 v_normal;

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

void main () {
  // gl_FragColor = vec4(1.0, 0.4, 0.3, 0.9);
  // gl_FragColor = vec4(1, 0.6, 0.8, 0.9);
  vec4 color;
  color.rga = vec3(1, 0.5, 0.9);
  // color.r = map(uFreq, 0.0, 255.0, 1.0, 1.0);
  color.b = map(uFreq, 0.0, 255.0, 0.5, 0.8);
  color.g = map(uFreq, 0.0, 255.0, 0.4, 0.6);
  gl_FragColor = color;
}
