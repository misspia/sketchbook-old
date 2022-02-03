precision highp float;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vAlpha;
varying vec3 vPosition;
varying vec2 vUv;

uniform vec3 spotPosition;
uniform float freq;
uniform float attenuation;
uniform float anglePower;


float remap(float min1, float max1, float min2, float max2, float value) {
  return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
  return remap(0.0, 255.0, min, max, freq);
}

float reverseRemapFreq(float min, float max) {
  return remap(0.0, 255.0, min, max, 255.0 - freq);
}

void main() {
  float intensity;

  intensity	= distance(vWorldPosition, spotPosition)/attenuation;
  intensity	= 1.0 - clamp(intensity, 0.0, 1.0);

  vec3 normal	= vec3(vNormal.x, vNormal.y, abs(vNormal.z));
  float angleIntensity	= pow( dot(normal, vec3(0.0, 0.0, 1.0)), anglePower );
  intensity	= intensity * angleIntensity;

  vec3 lightColor = vec3(
    1.0,
    reverseRemapFreq(0.7, 1.0),
    reverseRemapFreq(0.7, 1.0)
    );

  gl_FragColor	= vec4( lightColor, intensity * remapFreq(0.0, 1.0));
}
