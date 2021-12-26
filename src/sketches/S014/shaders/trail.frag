precision highp float;

uniform float uFreq;
uniform vec2 uResolution;

varying vec4 vColor;
varying float vAlpha;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, uFreq);
}

float reverseRemapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, 255.0 - uFreq);
}


void main() {
  // gl_FragColor = vec4(vColor.xyz, vAlpha);

  vec2 st = gl_FragCoord.xy/uResolution;
  float pct = distance(st,vec2(0.5));
  vec3 color = vec3(pct); 
  gl_FragColor = vec4(color, vAlpha);
}
