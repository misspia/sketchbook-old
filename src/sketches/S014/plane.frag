precision highp float;

uniform vec3 u_color;
uniform vec2 u_mouse;
uniform vec3 u_noise;
uniform float u_amp;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

#pragma glslify: noise = require('glsl-noise/simplex/3d')

void main() {
    float dist = distance(vUv, u_mouse);
    float displacement = noise(vec3(vec3(vUv, 1.0) * u_noise * u_amp));
    if(dist < displacement) {
    // if(dist < 0.1) {
        gl_FragColor = vec4(0.5, 0.5, 0.3, 0.0);
    } else {
        gl_FragColor = vec4(u_color, 1.0);
    }
}