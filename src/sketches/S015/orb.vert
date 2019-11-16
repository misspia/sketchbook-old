precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vColor;

uniform float u_amp;
uniform float u_time;


vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

 vec3 hsv2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

#pragma glslify: snoise = require('glsl-noise/simplex/3d')

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapAmp(float min, float max) {
    return remap(0.0, 255.0, min, max, u_amp);
}

void main () {
    float update_time = u_time / 1000.0;
    float noise = snoise(vec3(position + update_time * 2.0));
    float amp = remapAmp(0.0, 10.0);

    float displacement = amp * snoise(vec3(position * 0.06) + u_time);
    vec3 pos = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    vColor = hsv2rgb(vec3(noise * 0.6 + update_time, 0.5, 1.0));
}
