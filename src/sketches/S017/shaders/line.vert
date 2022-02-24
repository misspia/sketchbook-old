precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 position;
attribute float freq;

varying float vFreq;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, freq);
}

void main () {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  
  vFreq = freq;
}