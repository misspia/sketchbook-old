precision highp float;

uniform float u_freq;

varying vec2 vUv;

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
    vec3 colorA = vec3(1.0, 1.0, 1.0);
    vec3 colorB = vec3(0.3, 0.8, 1.0);
    float mixFactor = vUv.x * 0.5 + vUv.y * 0.5;

    gl_FragColor = vec4(mix(colorA, colorB, mixFactor), 1.0);

}
