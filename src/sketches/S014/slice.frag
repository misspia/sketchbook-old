precision highp float;

uniform vec3 u_color;
uniform float u_time;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

#pragma glslify: noise = require('glsl-noise/classic/3d')

void main() {
    gl_FragColor = vec4(u_color, 1.0);
}