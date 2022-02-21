precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float pointMultiplier;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute float freq;

varying float vFreq;
varying float vPointSize;
varying vec3 vPosition;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, freq);
}

void main () {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  
  // float size = remapFreq(1.0, 2.0);
  float size = 100.5;
  float pointSize = size * pointMultiplier / gl_Position.w;
  
  gl_PointSize = pointSize;

  vPointSize = pointSize;
  vFreq = freq;
  vPosition = position;
}
