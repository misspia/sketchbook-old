precision highp float;

uniform float u_time;
uniform float u_freq;
uniform vec3 u_amp;

#pragma glslify: noise = require('glsl-noise/simplex/3d')

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, u_freq);
}

float reverseRemapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, 255.0 - u_freq);
}

void main() {
    vec3 color = vec3(0.0, 0.0, 0.0);
    // float alpha = sin(u_time * 0.6);
    float alpha = noise(u_amp);

    gl_FragColor = vec4(color, alpha);
}
