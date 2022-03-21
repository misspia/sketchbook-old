precision highp float;

uniform sampler2D u_texture_a;
uniform sampler2D u_texture_b;
uniform float u_time;
uniform float u_mix_value;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

float remap(float value, float oldMin, float oldMax, float newMin, float newMax) {
    return newMin + (value - oldMin) * (newMax - newMin) / (oldMax - oldMin);
}

float rand(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

#pragma glslify: noise = require('glsl-noise/classic/2d')

void main() {
    float zDistance = 1.0 - vPosition.z;
    vec3 white = vec3(
        remap(zDistance, -1.0, 1.0, 0.7, 0.9),
        remap(zDistance, -1.0, 1.0, 0.7, 0.9),
        remap(zDistance, -1.0, 1.0, 0.7, 0.9)
    );
    vec4 color = vec4(white, 1.0);

    vec4 tA = texture2D(u_texture_a, vUv);
    vec4 tB = texture2D(u_texture_b, vUv);
    vec4 texture = mix(tA, tB, u_mix_value);

    bool isWhite = texture.r > 0.95 && texture.g > 0.9 && texture.b > 0.9;

    // to account for white spots in the character
    bool isInCharacterZone = vUv.x < 0.41 || vUv.x > 0.6 || vUv.y > 0.7;
    if(isInCharacterZone && isWhite) {
        color.a = 0.0;
        texture.a = 0.0;
    }

    gl_FragColor = texture * color;
}
