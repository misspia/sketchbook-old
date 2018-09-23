precision highp float;

uniform float uTime;
uniform float uFreq;
varying vec3 v_normal;

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

void main () {
  // gl_FragColor = vec4(1, 0.6, 0.5, 0.9);
  // gl_FragColor = vec4(1, 0.6, 0.8, 0.9);
  vec4 color;
  color.rga = vec3(1, 0.5, 0.9);
  color.b = map(uFreq, 0.0, 255.0, 0.5, 0.8);
  gl_FragColor = color;
}
