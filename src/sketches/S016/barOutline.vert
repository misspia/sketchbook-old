precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform float u_freq;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, u_freq);
}

mat4 scaleY(float scale) {
  return mat4(
    vec4(1.0, 0.0, 0.0, 0.0),
    vec4(0.0, scale, 0.0, 0.0),
    vec4(0.0, 0.0, 1.0, 0.0),
    vec4(0.0, 0.0, 0.0, 1.0)
  );
}

mat4 translateY(float translate) {
  return mat4(
    vec4(1.0, 0.0, 0.0, 0.0),
    vec4(0.0, 1.0, 0.0, 0.0),
    vec4(0.0, 0.0, 1.0, 0.0),
    vec4(0.0, translate, 0.0, 1.0)
  );
}

vec3 translate() {
    return vec3(
        0.0,
        remapFreq(0.0, 1.0),
        0.0
    );
}

void main () {
  float freq = remapFreq(0.5, 5.0);
  vec3 pos = position;
  pos.y *= freq;
  pos.y += freq ;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
